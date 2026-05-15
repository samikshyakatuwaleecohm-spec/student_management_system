from rest_framework import viewsets, filters
from django_filters.rest_framework import DjangoFilterBackend
from utils.permissions import IsAdmin, IsAdminOrTeacher
from .models import Teacher
from .serializers import TeacherSerializer


class TeacherViewSet(viewsets.ModelViewSet):
    queryset = Teacher.objects.all()
    serializer_class = TeacherSerializer
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['subject', 'status']
    search_fields = ['full_name', 'email', 'teacher_id', 'subject']
    ordering_fields = ['full_name', 'subject', 'created_at']
    ordering = ['-created_at']

    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [IsAdminOrTeacher()]
        return [IsAdmin()]
