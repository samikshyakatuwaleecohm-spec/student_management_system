import api from './api';

// ── Students ────────────────────────────────────────────────────────────────
export const studentService = {
  getAll: (params) => api.get('/students/', { params }).then((r) => r.data),
  getById: (id) => api.get(`/students/${id}/`).then((r) => r.data),
  create: (data) => api.post('/students/', data).then((r) => r.data),
  update: (id, data) => api.patch(`/students/${id}/`, data).then((r) => r.data),
  delete: (id) => api.delete(`/students/${id}/`),
};

// ── Teachers ────────────────────────────────────────────────────────────────
export const teacherService = {
  getAll: (params) => api.get('/teachers/', { params }).then((r) => r.data),
  getById: (id) => api.get(`/teachers/${id}/`).then((r) => r.data),
  create: (data) => api.post('/teachers/', data).then((r) => r.data),
  update: (id, data) => api.patch(`/teachers/${id}/`, data).then((r) => r.data),
  delete: (id) => api.delete(`/teachers/${id}/`),
};

// ── Attendance ───────────────────────────────────────────────────────────────
export const attendanceService = {
  getAll: (params) => api.get('/attendance/', { params }).then((r) => r.data),
  getWeekly: () => api.get('/attendance/weekly/').then((r) => r.data),
  getStudentHistory: (studentId) => api.get(`/attendance/student/${studentId}/`).then((r) => r.data),
  bulkMark: (data) => api.post('/attendance/bulk/', data).then((r) => r.data),
  update: (id, data) => api.patch(`/attendance/${id}/`, data).then((r) => r.data),
};

// ── Assignments ──────────────────────────────────────────────────────────────
export const assignmentService = {
  getAll: (params) => api.get('/assignments/', { params }).then((r) => r.data),
  getById: (id) => api.get(`/assignments/${id}/`).then((r) => r.data),
  create: (data) => api.post('/assignments/', data).then((r) => r.data),
  update: (id, data) => api.patch(`/assignments/${id}/`, data).then((r) => r.data),
  delete: (id) => api.delete(`/assignments/${id}/`),
};

// ── Exams ────────────────────────────────────────────────────────────────────
export const examService = {
  getAll: (params) => api.get('/exams/', { params }).then((r) => r.data),
  getById: (id) => api.get(`/exams/${id}/`).then((r) => r.data),
  create: (data) => api.post('/exams/', data).then((r) => r.data),
  update: (id, data) => api.patch(`/exams/${id}/`, data).then((r) => r.data),
  delete: (id) => api.delete(`/exams/${id}/`),
  publishResult: (id) => api.post(`/exams/${id}/publish/`).then((r) => r.data),
  // Results
  getResults: (params) => api.get('/exams/results/', { params }).then((r) => r.data),
  addResult: (data) => api.post('/exams/results/', data).then((r) => r.data),
};

// ── Fees ─────────────────────────────────────────────────────────────────────
export const feeService = {
  getAll: (params) => api.get('/fees/', { params }).then((r) => r.data),
  getById: (id) => api.get(`/fees/${id}/`).then((r) => r.data),
  create: (data) => api.post('/fees/', data).then((r) => r.data),
  update: (id, data) => api.patch(`/fees/${id}/`, data).then((r) => r.data),
  markPaid: (id) => api.post(`/fees/${id}/pay/`).then((r) => r.data),
  getAnalytics: () => api.get('/fees/analytics/').then((r) => r.data),
};

// ── Notices ──────────────────────────────────────────────────────────────────
export const noticeService = {
  getAll: (params) => api.get('/notices/', { params }).then((r) => r.data),
  getById: (id) => api.get(`/notices/${id}/`).then((r) => r.data),
  create: (data) => api.post('/notices/', data).then((r) => r.data),
  update: (id, data) => api.patch(`/notices/${id}/`, data).then((r) => r.data),
  delete: (id) => api.delete(`/notices/${id}/`),
};

// ── Dashboard ────────────────────────────────────────────────────────────────
export const dashboardService = {
  getAdmin: () => api.get('/dashboard/admin/').then((r) => r.data),
  getTeacher: () => api.get('/dashboard/teacher/').then((r) => r.data),
  getStudent: () => api.get('/dashboard/student/').then((r) => r.data),
};
