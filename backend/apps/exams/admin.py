from django.contrib import admin
from .models import Exam, ExamResult

@admin.register(Exam)
class ExamAdmin(admin.ModelAdmin):
    list_display = ['title', 'class_name', 'date', 'status', 'result_published']
    list_filter = ['status', 'result_published', 'class_name']

@admin.register(ExamResult)
class ExamResultAdmin(admin.ModelAdmin):
    list_display = ['student', 'exam', 'subject', 'marks_obtained', 'grade']
    list_filter = ['grade', 'exam']
    search_fields = ['student__full_name']
