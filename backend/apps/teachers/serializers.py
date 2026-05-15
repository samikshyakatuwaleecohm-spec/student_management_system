from rest_framework import serializers
from .models import Teacher


class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = '__all__'
        read_only_fields = ['id', 'teacher_id', 'created_at', 'updated_at']

    def create(self, validated_data):
        import uuid
        validated_data['teacher_id'] = f'TCH-{uuid.uuid4().hex[:6].upper()}'
        return super().create(validated_data)
