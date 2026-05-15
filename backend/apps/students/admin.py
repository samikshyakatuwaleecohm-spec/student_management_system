from django.contrib import admin
from .models import Student

@admin.register(Student)
class StudentAdmin(admin.ModelAdmin):
    list_display = ['student_id', 'full_name', 'email', 'class_name', 'gender', 'status']
    list_filter = ['class_name', 'gender', 'status']
    search_fields = ['full_name', 'email', 'student_id']
