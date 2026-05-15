from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.db.models import Sum, Count, Q
from apps.students.models import Student
from apps.teachers.models import Teacher
from apps.attendance.models import Attendance
from apps.assignments.models import Assignment
from apps.exams.models import Exam
from apps.fees.models import Fee
from apps.notices.models import Notice
from utils.permissions import IsAdmin, IsTeacher, IsStudent


class AdminDashboardView(APIView):
    permission_classes = [IsAdmin]

    def get(self, request):
        total_students = Student.objects.count()
        active_students = Student.objects.filter(status='active').count()
        total_teachers = Teacher.objects.count()
        total_fees = Fee.objects.aggregate(t=Sum('amount'))['t'] or 0
        paid_fees = Fee.objects.filter(status='paid').aggregate(p=Sum('amount'))['p'] or 0
        total_exams = Exam.objects.count()
        upcoming_exams = Exam.objects.filter(status='upcoming').count()
        total_notices = Notice.objects.count()

        recent_students = list(
            Student.objects.order_by('-created_at')[:5].values('id', 'full_name', 'class_name', 'status')
        )
        fee_summary = list(
            Fee.objects.values('status').annotate(total=Sum('amount'), count=Count('id'))
        )

        return Response({
            'total_students': total_students,
            'active_students': active_students,
            'total_teachers': total_teachers,
            'total_fees': float(total_fees),
            'paid_fees': float(paid_fees),
            'collection_rate': round(float(paid_fees) / float(total_fees) * 100, 2) if total_fees else 0,
            'total_exams': total_exams,
            'upcoming_exams': upcoming_exams,
            'total_notices': total_notices,
            'recent_students': recent_students,
            'fee_summary': fee_summary,
        })


class TeacherDashboardView(APIView):
    permission_classes = [IsTeacher]

    def get(self, request):
        total_students = Student.objects.count()
        total_assignments = Assignment.objects.count()
        pending_assignments = Assignment.objects.filter(status='pending').count()
        total_exams = Exam.objects.count()
        upcoming_exams = Exam.objects.filter(status='upcoming').count()
        total_notices = Notice.objects.count()

        recent_students = list(
            Student.objects.order_by('-created_at')[:5].values('id', 'full_name', 'class_name', 'status')
        )
        upcoming_exam_list = list(
            Exam.objects.filter(status='upcoming').order_by('date')[:5].values('id', 'title', 'class_name', 'date')
        )

        return Response({
            'total_students': total_students,
            'total_assignments': total_assignments,
            'pending_assignments': pending_assignments,
            'total_exams': total_exams,
            'upcoming_exams': upcoming_exams,
            'total_notices': total_notices,
            'recent_students': recent_students,
            'upcoming_exam_list': upcoming_exam_list,
        })


class StudentDashboardView(APIView):
    permission_classes = [IsStudent]

    def get(self, request):
        try:
            student = request.user.student_profile
        except Exception:
            return Response({'detail': 'Student profile not found.'}, status=404)

        total_att = Attendance.objects.filter(student=student).count()
        present_att = Attendance.objects.filter(student=student, status='present').count()
        att_rate = round(present_att / total_att * 100, 2) if total_att else 0

        pending_assignments = Assignment.objects.filter(
            class_name=student.class_name, status='pending'
        ).count()
        upcoming_exams = Exam.objects.filter(
            class_name=student.class_name, status='upcoming'
        ).count()
        unpaid_fees = Fee.objects.filter(student=student).exclude(status='paid').count()

        recent_assignments = list(
            Assignment.objects.filter(class_name=student.class_name)
            .order_by('-created_at')[:4].values('id', 'title', 'due_date', 'status')
        )
        upcoming_exam_list = list(
            Exam.objects.filter(class_name=student.class_name, status='upcoming')
            .order_by('date')[:4].values('id', 'title', 'date')
        )

        return Response({
            'attendance_rate': att_rate,
            'present_days': present_att,
            'total_days': total_att,
            'pending_assignments': pending_assignments,
            'upcoming_exams': upcoming_exams,
            'unpaid_fees': unpaid_fees,
            'recent_assignments': recent_assignments,
            'upcoming_exam_list': upcoming_exam_list,
        })
