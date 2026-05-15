# SMS Backend — Django REST Framework

## Tech Stack
- Python 3.11+
- Django 4.2
- Django REST Framework
- PostgreSQL
- JWT Authentication (SimpleJWT)
- django-cors-headers

---

## 1. PostgreSQL Setup

```sql
CREATE DATABASE student_management_db;
CREATE USER postgres WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE student_management_db TO postgres;
```

---

## 2. Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv

# Activate (Windows)
venv\Scripts\activate

# Activate (Mac/Linux)
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

---

## 3. Environment Variables

Edit `.env` file:

```env
SECRET_KEY=your-strong-secret-key
DEBUG=True
DB_NAME=student_management_db
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://localhost:4173
```

---

## 4. Migrations & Run

```bash
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

---

## 5. API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register/` | Register new user |
| POST | `/api/auth/login/` | Login → returns JWT tokens |
| POST | `/api/auth/logout/` | Logout (blacklist token) |
| POST | `/api/auth/token/refresh/` | Refresh access token |
| GET/PATCH | `/api/auth/profile/` | Get / update profile |
| POST | `/api/auth/change-password/` | Change password |
| POST | `/api/auth/forgot-password/` | Forgot password |

### Students
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/students/` | List all students |
| POST | `/api/students/` | Add student (Admin) |
| GET | `/api/students/{id}/` | Get student detail |
| PATCH | `/api/students/{id}/` | Update student (Admin) |
| DELETE | `/api/students/{id}/` | Delete student (Admin) |

### Teachers
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/teachers/` | List all teachers |
| POST | `/api/teachers/` | Add teacher (Admin) |
| PATCH | `/api/teachers/{id}/` | Update teacher (Admin) |
| DELETE | `/api/teachers/{id}/` | Delete teacher (Admin) |

### Attendance
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/attendance/` | List attendance records |
| POST | `/api/attendance/bulk/` | Bulk mark attendance |
| GET | `/api/attendance/weekly/` | This week's attendance |
| GET | `/api/attendance/student/{id}/` | Student history |

### Assignments
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/assignments/` | List assignments |
| POST | `/api/assignments/` | Create assignment |
| PATCH | `/api/assignments/{id}/` | Update assignment |
| DELETE | `/api/assignments/{id}/` | Delete assignment |

### Exams
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/exams/` | List exams |
| POST | `/api/exams/` | Create exam |
| POST | `/api/exams/{id}/publish/` | Publish result |
| GET | `/api/exams/results/` | List results |
| POST | `/api/exams/results/` | Add result |

### Fees
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/fees/` | List fees |
| POST | `/api/fees/` | Create fee record |
| POST | `/api/fees/{id}/pay/` | Mark as paid |
| GET | `/api/fees/analytics/` | Revenue analytics |

### Notices
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/notices/` | List notices |
| POST | `/api/notices/` | Create notice |
| PATCH | `/api/notices/{id}/` | Update notice |
| DELETE | `/api/notices/{id}/` | Delete notice |

### Dashboard
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/dashboard/admin/` | Admin dashboard stats |
| GET | `/api/dashboard/teacher/` | Teacher dashboard stats |
| GET | `/api/dashboard/student/` | Student dashboard stats |

---

## 6. Query Parameters (Filtering, Search, Pagination)

```
GET /api/students/?search=alex&class_name=10-A&status=active&page=1&page_size=20
GET /api/attendance/?date=2024-08-01&status=present
GET /api/exams/?class_name=10-A&result_published=true
GET /api/fees/?status=pending&ordering=-due_date
```

---

## 7. Frontend Connection

Frontend `.env`:
```env
VITE_API_URL=http://localhost:8000/api
```

Install axios in frontend:
```bash
cd frontend
npm install
npm run dev
```

---

## 8. Role-Based Access

| Role | Access |
|------|--------|
| admin | Full access to all endpoints |
| teacher | Read students, mark attendance, manage assignments/exams/notices |
| student | Read own data, view assignments/exams/notices |

---

## 9. JWT Token Usage

```
Authorization: Bearer <access_token>
```

Tokens expire in 60 minutes. Use `/api/auth/token/refresh/` with the refresh token to get a new access token.
