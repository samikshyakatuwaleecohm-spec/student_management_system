from rest_framework import viewsets, filters, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from utils.permissions import IsAdminOrTeacher
from .models import Exam, ExamResult
from .serializers import ExamSerializer, ExamListSerializer, ExamResultSerializer


class ExamViewSet(viewsets.ModelViewSet):
    queryset = Exam.objects.all()
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['class_name', 'status', 'result_published']
    search_fields = ['title', 'class_name', 'subject']
    ordering_fields = ['date', 'created_at']
    ordering = ['-date']

    def get_serializer_class(self):
        if self.action == 'list':
            return ExamListSerializer
        return ExamSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [IsAuthenticated()]
        return [IsAdminOrTeacher()]

    @action(detail=True, methods=['post'], url_path='publish')
    def publish_result(self, request, pk=None):
        exam = self.get_object()
        exam.result_published = True
        exam.status = 'completed'
        exam.save()
        return Response({'detail': 'Result published successfully.'})


class ExamResultViewSet(viewsets.ModelViewSet):
    queryset = ExamResult.objects.select_related('exam', 'student').all()
    serializer_class = ExamResultSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['exam', 'student', 'grade']
    search_fields = ['student__full_name', 'subject']
    ordering_fields = ['marks_obtained', 'created_at']

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [IsAuthenticated()]
        return [IsAdminOrTeacher()]
