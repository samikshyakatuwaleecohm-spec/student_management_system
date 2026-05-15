from django.db import models
from apps.students.models import Student


class Exam(models.Model):
    STATUS_CHOICES = [('upcoming', 'Upcoming'), ('ongoing', 'Ongoing'), ('completed', 'Completed')]

    title = models.CharField(max_length=200)
    class_name = models.CharField(max_length=20)
    subject = models.CharField(max_length=100, blank=True)
    exam_type = models.CharField(max_length=50, blank=True)
    date = models.DateField()
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='upcoming')
    result_published = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'exams'
        ordering = ['-date']

    def __str__(self):
        return f'{self.title} - {self.class_name}'


class ExamResult(models.Model):
    GRADE_CHOICES = [
        ('A+', 'A+'), ('A', 'A'), ('B+', 'B+'), ('B', 'B'),
        ('C+', 'C+'), ('C', 'C'), ('D', 'D'), ('F', 'F'),
    ]

    exam = models.ForeignKey(Exam, on_delete=models.CASCADE, related_name='results')
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='exam_results')
    subject = models.CharField(max_length=100)
    marks_obtained = models.DecimalField(max_digits=5, decimal_places=2)
    total_marks = models.DecimalField(max_digits=5, decimal_places=2, default=100)
    grade = models.CharField(max_length=3, choices=GRADE_CHOICES, blank=True)
    remarks = models.CharField(max_length=255, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'exam_results'
        ordering = ['-created_at']

    @property
    def percentage(self):
        if self.total_marks:
            return round((float(self.marks_obtained) / float(self.total_marks)) * 100, 2)
        return 0

    def save(self, *args, **kwargs):
        pct = self.percentage
        if pct >= 90:   self.grade = 'A+'
        elif pct >= 80: self.grade = 'A'
        elif pct >= 70: self.grade = 'B+'
        elif pct >= 60: self.grade = 'B'
        elif pct >= 50: self.grade = 'C+'
        elif pct >= 40: self.grade = 'C'
        elif pct >= 33: self.grade = 'D'
        else:           self.grade = 'F'
        super().save(*args, **kwargs)

    def __str__(self):
        return f'{self.student.full_name} - {self.exam.title} - {self.grade}'
