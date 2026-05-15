from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from utils.permissions import IsAdminOrTeacher
from .models import Attendance
from .serializers import AttendanceSerializer, BulkAttendanceSerializer


class AttendanceViewSet(viewsets.ModelViewSet):
    queryset = Attendance.objects.select_related('student').all()
    serializer_class = AttendanceSerializer
    permission_classes = [IsAdminOrTeacher]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['date', 'status', 'student__class_name']
    search_fields = ['student__full_name', 'student__class_name']
    ordering_fields = ['date', 'created_at']
    ordering = ['-date']

    @action(detail=False, methods=['post'], url_path='bulk')
    def bulk_mark(self, request):
        serializer = BulkAttendanceSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        date = serializer.validated_data['date']
        records = serializer.validated_data['records']
        created, updated = 0, 0
        for record in records:
            obj, is_new = Attendance.objects.update_or_create(
                student_id=record['student_id'],
                date=date,
                defaults={
                    'status': record['status'],
                    'remarks': record.get('remarks', ''),
                    'marked_by': request.user.full_name,
                }
            )
            if is_new:
                created += 1
            else:
                updated += 1
        return Response({'created': created, 'updated': updated})

    @action(detail=False, methods=['get'], url_path='weekly')
    def weekly(self, request):
        from datetime import date, timedelta
        today = date.today()
        week_start = today - timedelta(days=today.weekday())
        week_dates = [week_start + timedelta(days=i) for i in range(6)]  # Sun-Fri
        records = Attendance.objects.filter(date__in=week_dates).select_related('student')
        serializer = AttendanceSerializer(records, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'], url_path='student/(?P<student_id>[^/.]+)')
    def student_history(self, request, student_id=None):
        records = Attendance.objects.filter(student_id=student_id).order_by('-date')
        serializer = AttendanceSerializer(records, many=True)
        return Response(serializer.data)
