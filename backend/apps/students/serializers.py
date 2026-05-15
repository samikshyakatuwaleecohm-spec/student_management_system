from rest_framework import serializers
from .models import Student


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = '__all__'
        read_only_fields = ['id', 'student_id', 'admission_date', 'created_at', 'updated_at']

    def create(self, validated_data):
        import uuid
        validated_data['student_id'] = f'STU-{uuid.uuid4().hex[:6].upper()}'
        return super().create(validated_data)


class StudentListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['id', 'student_id', 'full_name', 'email', 'class_name', 'gender', 'status', 'admission_date']
