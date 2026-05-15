from django.db import models


class Assignment(models.Model):
    STATUS_CHOICES = [('pending', 'Pending'), ('submitted', 'Submitted'), ('graded', 'Graded')]

    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    class_name = models.CharField(max_length=20)
    subject = models.CharField(max_length=100, blank=True)
    due_date = models.DateField()
    attachment = models.FileField(upload_to='assignments/', blank=True, null=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    created_by = models.CharField(max_length=150, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'assignments'
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.title} - {self.class_name}'
