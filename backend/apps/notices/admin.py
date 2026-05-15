from django.contrib import admin
from .models import Notice

@admin.register(Notice)
class NoticeAdmin(admin.ModelAdmin):
    list_display = ['title', 'category', 'created_by', 'is_public', 'created_at']
    list_filter = ['category', 'is_public']
    search_fields = ['title']
