from rest_framework import serializers
from .models import Fee


class FeeSerializer(serializers.ModelSerializer):
    student_name = serializers.CharField(source='student.full_name', read_only=True)
    class_name = serializers.CharField(source='student.class_name', read_only=True)

    class Meta:
        model = Fee
        fields = ['id', 'student', 'student_name', 'class_name', 'amount',
                  'due_date', 'payment_date', 'status', 'description', 'created_at']
        read_only_fields = ['id', 'created_at']
