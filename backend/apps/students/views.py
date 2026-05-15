from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from utils.permissions import IsAdmin, IsAdminOrTeacher
from .models import Student
from .serializers import StudentSerializer, StudentListSerializer


class StudentViewSet(viewsets.ModelViewSet):
    queryset = Student.objects.all()
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['class_name', 'gender', 'status']
    search_fields = ['full_name', 'email', 'student_id', 'class_name']
    ordering_fields = ['full_name', 'class_name', 'admission_date', 'created_at']
    ordering = ['-created_at']

    def get_serializer_class(self):
        if self.action == 'list':
            return StudentListSerializer
        return StudentSerializer

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [IsAdminOrTeacher()]
        return [IsAdmin()]
