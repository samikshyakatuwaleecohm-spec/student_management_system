# 🎓 School Management System — Full Stack Project

## ✅ COMPLETED

### Frontend (React + Tailwind CSS)
- ✅ Role-based dashboards (Admin, Teacher, Student)
- ✅ Authentication pages (Login, Register, Forgot Password)
- ✅ Student management
- ✅ Teacher management
- ✅ Attendance tracking (week-wise view)
- ✅ Assignment management
- ✅ Exam & Results with grades
- ✅ Fee management
- ✅ Notice board
- ✅ Dark/Light theme toggle
- ✅ Responsive design
- ✅ API service layer with Axios

### Backend (Django REST Framework)
- ✅ Custom User model with roles (admin, teacher, student)
- ✅ JWT Authentication (login, register, logout, refresh)
- ✅ PostgreSQL database
- ✅ Role-based permissions
- ✅ Complete REST APIs for:
  - Students CRUD
  - Teachers CRUD
  - Attendance (bulk mark, weekly view, student history)
  - Assignments CRUD
  - Exams & Results (with auto-grade calculation)
  - Fees (payment tracking, analytics)
  - Notices CRUD
  - Dashboard stats (admin, teacher, student)
- ✅ Filtering, search, pagination
- ✅ CORS configuration
- ✅ File upload support
- ✅ Admin panel

---

## 📁 Project Structure

```
sms/
├── frontend/                    # React + Vite + Tailwind
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── context/            # AppContext for state
│   │   ├── data/               # Initial mock data
│   │   ├── pages/              # All pages (auth, admin, teacher, student)
│   │   ├── services/           # API integration (axios)
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── .env                    # VITE_API_URL
│
└── backend/                     # Django REST Framework
    ├── apps/
    │   ├── accounts/           # User model, auth APIs
    │   ├── students/           # Student CRUD
    │   ├── teachers/           # Teacher CRUD
    │   ├── attendance/         # Attendance tracking
    │   ├── assignments/        # Assignment management
    │   ├── exams/              # Exams & Results
    │   ├── fees/               # Fee management
    │   ├── notices/            # Notice board
    │   └── dashboard/          # Dashboard stats APIs
    ├── config/
    │   ├── settings.py         # Django settings
    │   └── urls.py             # API routes
    ├── utils/
    │   └── permissions.py      # Role-based permissions
    ├── manage.py
    ├── requirements.txt
    ├── .env                    # DB credentials, SECRET_KEY
    └── README.md
```

---

## 🚀 Quick Start

### 1. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # Mac/Linux

# Install dependencies
pip install -r requirements.txt

# Setup PostgreSQL database
# Create database: student_management_db

# Run migrations
python manage.py makemigrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Run server
python manage.py runserver
```

Backend runs on: `http://localhost:8000`

### 2. Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Run dev server
npm run dev
```

Frontend runs on: `http://localhost:5173`

---

## 🔐 Demo Credentials

### Admin
- Email: `admin@sms.com`
- Password: `password`

### Teacher
- Email: `teacher@sms.com`
- Password: `password`

### Student
- Email: `student@sms.com`
- Password: `password`

---

## 🎯 Key Features

### Authentication
- JWT-based authentication
- Role-based access control
- Token refresh mechanism
- Protected routes

### Student Management
- Add/Edit/Delete students
- Search & filter
- Student profiles
- Attendance tracking
- Fee records
- Exam results

### Teacher Management
- Add/Edit/Delete teachers
- Assign subjects & classes
- Teacher profiles

### Attendance
- Week-wise view (Sun-Fri)
- Bulk mark attendance
- Student attendance history
- Present/Absent/Late status

### Assignments
- Create assignments
- Set due dates
- Track submission status
- Class-wise filtering

### Exams & Results
- Schedule exams
- Add results with marks
- Auto-grade calculation (A+, A, B+, B, C+, C, D, F)
- Publish results
- Percentage calculation

### Fee Management
- Fee collection tracking
- Payment status (Paid, Pending, Overdue)
- Revenue analytics
- Mark as paid

### Notices
- Create/Edit/Delete notices
- Category-wise (General, Fees, Event, Exam, Holiday)
- Public/Private notices

### Dashboard
- **Admin**: Total students, teachers, revenue, attendance stats
- **Teacher**: Assigned classes, student count, assignment stats
- **Student**: Attendance %, upcoming exams, pending assignments

---

## 🔌 API Integration

Frontend uses Axios with JWT interceptors:

```javascript
// services/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

// Auto-attach JWT token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Auto-refresh on 401
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Refresh token logic
    }
    return Promise.reject(error);
  }
);
```

---

## 📊 Database Schema

### Users
- id, full_name, email, password, role, phone, profile_image

### Students
- student_id, full_name, email, class_name, roll_number, gender, dob, address, guardian_name, guardian_phone, status

### Teachers
- teacher_id, full_name, email, subject, qualification, phone, classes, status

### Attendance
- student, date, status (present/absent/late), remarks

### Assignments
- title, description, class_name, subject, due_date, status

### Exams
- title, class_name, subject, date, status, result_published

### ExamResults
- exam, student, subject, marks_obtained, total_marks, grade, percentage

### Fees
- student, amount, due_date, payment_date, status

### Notices
- title, message, category, created_by, is_public

---

## 🛡️ Security Features

- Password hashing (Django's built-in)
- JWT token authentication
- Token blacklisting on logout
- Role-based permissions
- CORS configuration
- Environment variables for secrets
- SQL injection protection (Django ORM)

---

## 📦 Technologies Used

### Frontend
- React 18
- Vite
- Tailwind CSS
- React Router DOM
- Axios
- Framer Motion
- React Icons

### Backend
- Python 3.11+
- Django 4.2
- Django REST Framework
- PostgreSQL
- SimpleJWT
- django-cors-headers
- Pillow (image uploads)

---

## 🎨 UI Features

- Modern glassmorphism design
- Dark/Light theme toggle
- Responsive layout
- Smooth animations
- Toast notifications
- Modal dialogs
- Loading states
- Form validation

---

## 📝 Next Steps

1. Run backend migrations
2. Create superuser
3. Start backend server
4. Install frontend dependencies
5. Start frontend dev server
6. Login with demo credentials
7. Explore all features!

---

## 🤝 Support

For issues or questions:
- Check README.md in backend folder
- Review API documentation
- Test endpoints with Postman
- Check browser console for errors

---

**Built with ❤️ using Django REST Framework + React + Tailwind CSS**
