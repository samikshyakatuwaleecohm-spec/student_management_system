from rest_framework import serializers
from .models import Attendance
from apps.students.serializers import StudentListSerializer


class AttendanceSerializer(serializers.ModelSerializer):
    student_name = serializers.CharField(source='student.full_name', read_only=True)
    class_name = serializers.CharField(source='student.class_name', read_only=True)

    class Meta:
        model = Attendance
        fields = ['id', 'student', 'student_name', 'class_name', 'date', 'status', 'remarks', 'marked_by', 'created_at']
        read_only_fields = ['id', 'created_at']


class BulkAttendanceSerializer(serializers.Serializer):
    date = serializers.DateField()
    records = serializers.ListField(
        child=serializers.DictField()
    )
