from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.utils import timezone
from utils.permissions import IsAdmin, IsAdminOrTeacher
from .models import Fee
from .serializers import FeeSerializer


class FeeViewSet(viewsets.ModelViewSet):
    queryset = Fee.objects.select_related('student').all()
    serializer_class = FeeSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['status', 'student__class_name']
    search_fields = ['student__full_name', 'student__student_id']
    ordering_fields = ['due_date', 'amount', 'created_at']
    ordering = ['-created_at']
    permission_classes = [IsAdminOrTeacher]

    @action(detail=True, methods=['post'], url_path='pay')
    def mark_paid(self, request, pk=None):
        fee = self.get_object()
        fee.status = 'paid'
        fee.payment_date = timezone.now().date()
        fee.save()
        return Response(FeeSerializer(fee).data)

    @action(detail=False, methods=['get'], url_path='analytics')
    def analytics(self, request):
        from django.db.models import Sum, Count
        total = Fee.objects.aggregate(total=Sum('amount'))['total'] or 0
        paid = Fee.objects.filter(status='paid').aggregate(paid=Sum('amount'))['paid'] or 0
        pending = Fee.objects.filter(status='pending').aggregate(p=Sum('amount'))['p'] or 0
        overdue = Fee.objects.filter(status='overdue').aggregate(o=Sum('amount'))['o'] or 0
        return Response({
            'total': total, 'paid': paid,
            'pending': pending, 'overdue': overdue,
            'collection_rate': round((float(paid) / float(total) * 100), 2) if total else 0,
        })
