from django.contrib import admin
from .models import Assignment

@admin.register(Assignment)
class AssignmentAdmin(admin.ModelAdmin):
    list_display = ['title', 'class_name', 'due_date', 'status']
    list_filter = ['class_name', 'status']
    search_fields = ['title']
