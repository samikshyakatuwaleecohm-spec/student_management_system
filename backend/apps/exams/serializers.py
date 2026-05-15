from rest_framework import serializers
from .models import Exam, ExamResult


class ExamResultSerializer(serializers.ModelSerializer):
    percentage = serializers.ReadOnlyField()
    student_name = serializers.CharField(source='student.full_name', read_only=True)
    class_name = serializers.CharField(source='student.class_name', read_only=True)

    class Meta:
        model = ExamResult
        fields = ['id', 'exam', 'student', 'student_name', 'class_name', 'subject',
                  'marks_obtained', 'total_marks', 'percentage', 'grade', 'remarks', 'created_at']
        read_only_fields = ['id', 'grade', 'created_at']


class ExamSerializer(serializers.ModelSerializer):
    results = ExamResultSerializer(many=True, read_only=True)

    class Meta:
        model = Exam
        fields = '__all__'
        read_only_fields = ['id', 'created_at', 'updated_at']


class ExamListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exam
        fields = ['id', 'title', 'class_name', 'subject', 'date', 'status', 'result_published']
