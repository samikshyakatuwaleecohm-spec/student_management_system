from django.db import models
from apps.accounts.models import User


class Notice(models.Model):
    CATEGORY_CHOICES = [
        ('general', 'General'), ('fees', 'Fees'),
        ('event', 'Event'), ('exam', 'Exam'), ('holiday', 'Holiday'),
    ]

    title = models.CharField(max_length=200)
    message = models.TextField()
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='general')
    created_by = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='notices')
    is_public = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'notices'
        ordering = ['-created_at']

    def __str__(self):
        return self.title
