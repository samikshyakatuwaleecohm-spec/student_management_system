from django.contrib import admin
from .models import Fee

@admin.register(Fee)
class FeeAdmin(admin.ModelAdmin):
    list_display = ['student', 'amount', 'due_date', 'status']
    list_filter = ['status']
    search_fields = ['student__full_name']
