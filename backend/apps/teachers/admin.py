from django.contrib import admin
from .models import Teacher

@admin.register(Teacher)
class TeacherAdmin(admin.ModelAdmin):
    list_display = ['teacher_id', 'full_name', 'email', 'subject', 'status']
    search_fields = ['full_name', 'email', 'teacher_id']
