export interface UserProfile {
  id: string;
  role: 'student' | 'teacher' | 'admin';
  name: string;
  email: string;
  password: string;
  avatar: string;
  class?: string;
  section?: string;
  subjects?: string[];
  attendance?: number;
  gpa?: number;
  subject?: string;
  phone?: string;
}

export interface StudentRecord {
  id: string;
  name: string;
  email: string;
  class: string;
  status: string;
  attendance: number;
  pendingAssignments: number;
  upcomingExams: number;
  feesDue: number;
  gender: string;
  dob: string;
}

export interface TeacherRecord {
  id: string;
  name: string;
  email: string;
  subject: string;
  classes: string[];
  phone: string;
  status: string;
}

export interface SchoolClass {
  id: string;
  name: string;
  teacherId: string;
  subjects: string[];
}

export interface Assignment {
  id: string;
  title: string;
  className: string;
  dueDate: string;
  status: string;
  description: string;
}

export interface ExamRecord {
  id: string;
  title: string;
  className: string;
  date: string;
  status: string;
  resultPublished: boolean;
}

export interface Notice {
  id: string;
  title: string;
  message: string;
  category: string;
  date: string;
}

export interface FeeRecord {
  id: string;
  studentName: string;
  amount: number;
  dueDate: string;
  status: string;
}

export interface AttendanceEntry {
  id: string;
  date: string;
  present: number;
  absent: number;
}

export interface DailyStudentAttendance {
  studentId: string;
  studentName: string;
  class: string;
  records: { date: string; status: 'present' | 'absent' | 'late' }[];
}

export interface SubjectResult {
  subject: string;
  marks: number;
  total: number;
}

export interface StudentResult {
  id: string;
  studentId: string;
  studentName: string;
  class: string;
  examId: string;
  examTitle: string;
  subjects: SubjectResult[];
}

export const initialUsers: UserProfile[] = [
  {
    id: 'u1',
    role: 'student',
    name: 'Alex Johnson',
    email: 'student@sms.com',
    password: 'password',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=student1',
    class: '10-A',
    section: 'A',
    subjects: ['Math', 'English'],
    attendance: 92,
    gpa: 3.7,
  },
  {
    id: 'u2',
    role: 'teacher',
    name: 'Sarah Williams',
    email: 'teacher@sms.com',
    password: 'password',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=teacher1',
    subject: 'Mathematics',
    phone: '555-0102',
  },
  {
    id: 'u3',
    role: 'admin',
    name: 'Admin User',
    email: 'admin@sms.com',
    password: 'password',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin1',
    phone: '555-0103',
  },
];

export const initialStudents: StudentRecord[] = [
  {
    id: 's1',
    name: 'Alex Johnson',
    email: 'alex@sms.com',
    class: '10-A',
    status: 'active',
    attendance: 92,
    pendingAssignments: 2,
    upcomingExams: 1,
    feesDue: 0,
    gender: 'Male',
    dob: '2008-03-15',
  },
  {
    id: 's2',
    name: 'Maria Garcia',
    email: 'maria@sms.com',
    class: '10-B',
    status: 'active',
    attendance: 88,
    pendingAssignments: 1,
    upcomingExams: 2,
    feesDue: 500,
    gender: 'Female',
    dob: '2008-07-22',
  },
  {
    id: 's3',
    name: 'James Lee',
    email: 'james@sms.com',
    class: '9-A',
    status: 'inactive',
    attendance: 75,
    pendingAssignments: 4,
    upcomingExams: 1,
    feesDue: 1000,
    gender: 'Male',
    dob: '2009-01-10',
  },
];

export const initialTeachers: TeacherRecord[] = [
  {
    id: 't1',
    name: 'Sarah Williams',
    email: 'sarah@sms.com',
    subject: 'Mathematics',
    classes: ['10-A', '10-B'],
    phone: '555-0102',
    status: 'active',
  },
  {
    id: 't2',
    name: 'David Brown',
    email: 'david@sms.com',
    subject: 'Science',
    classes: ['9-A', '9-C'],
    phone: '555-0104',
    status: 'active',
  },
];

export const initialClasses: SchoolClass[] = [
  {
    id: 'c1',
    name: '10-A',
    teacherId: 't1',
    subjects: ['Math', 'English', 'Physics'],
  },
  {
    id: 'c2',
    name: '10-B',
    teacherId: 't1',
    subjects: ['Math', 'History', 'Chemistry'],
  },
  {
    id: 'c3',
    name: '9-A',
    teacherId: 't2',
    subjects: ['Science', 'Geography', 'English'],
  },
];

export const initialAssignments: Assignment[] = [
  {
    id: 'a1',
    title: 'Algebra Homework',
    className: '10-A',
    dueDate: '2024-08-10',
    status: 'pending',
    description: 'Complete exercises 1-20 from chapter 5.',
  },
  {
    id: 'a2',
    title: 'Essay on Climate Change',
    className: '10-B',
    dueDate: '2024-08-12',
    status: 'submitted',
    description: 'Write a 500-word essay on climate change impacts.',
  },
  {
    id: 'a3',
    title: 'Physics Lab Report',
    className: '9-A',
    dueDate: '2024-08-15',
    status: 'pending',
    description: 'Submit lab report for the pendulum experiment.',
  },
];

export const initialExams: ExamRecord[] = [
  {
    id: 'e1',
    title: 'Mid-Term Math',
    className: '10-A',
    date: '2024-08-20',
    status: 'upcoming',
    resultPublished: false,
  },
  {
    id: 'e2',
    title: 'Science Quiz',
    className: '9-A',
    date: '2024-08-18',
    status: 'upcoming',
    resultPublished: false,
  },
  {
    id: 'e3',
    title: 'English Final',
    className: '10-B',
    date: '2024-07-30',
    status: 'completed',
    resultPublished: true,
  },
];

export const initialNotices: Notice[] = [
  {
    id: 'n1',
    title: 'School Closed on Monday',
    message: 'School will remain closed on Monday due to a public holiday.',
    category: 'general',
    date: '2024-08-05',
  },
  {
    id: 'n2',
    title: 'Fee Submission Deadline',
    message: 'Last date for fee submission is August 15th.',
    category: 'fees',
    date: '2024-08-01',
  },
  {
    id: 'n3',
    title: 'Annual Sports Day',
    message: 'Annual sports day will be held on August 25th.',
    category: 'event',
    date: '2024-07-28',
  },
];

export const initialFees: FeeRecord[] = [
  {
    id: 'f1',
    studentName: 'Alex Johnson',
    amount: 1500,
    dueDate: '2024-08-15',
    status: 'paid',
  },
  {
    id: 'f2',
    studentName: 'Maria Garcia',
    amount: 1500,
    dueDate: '2024-08-15',
    status: 'pending',
  },
  {
    id: 'f3',
    studentName: 'James Lee',
    amount: 1500,
    dueDate: '2024-08-15',
    status: 'overdue',
  },
];

export const attendanceRecords: AttendanceEntry[] = [
  { id: 'att1', date: '2024-08-01', present: 45, absent: 5 },
  { id: 'att2', date: '2024-08-02', present: 48, absent: 2 },
  { id: 'att3', date: '2024-08-05', present: 42, absent: 8 },
  { id: 'att4', date: '2024-08-06', present: 46, absent: 4 },
  { id: 'att5', date: '2024-08-07', present: 44, absent: 6 },
  { id: 'att6', date: '2024-08-08', present: 47, absent: 3 },
  { id: 'att7', date: '2024-08-09', present: 43, absent: 7 },
  { id: 'att8', date: '2024-08-12', present: 49, absent: 1 },
  { id: 'att9', date: '2024-08-13', present: 41, absent: 9 },
  { id: 'att10', date: '2024-08-14', present: 45, absent: 5 },
];

export const studentResults: StudentResult[] = [
  {
    id: 'r1',
    studentId: 's1',
    studentName: 'Alex Johnson',
    class: '10-A',
    examId: 'e3',
    examTitle: 'English Final',
    subjects: [
      { subject: 'English', marks: 88, total: 100 },
      { subject: 'Math', marks: 92, total: 100 },
      { subject: 'Physics', marks: 78, total: 100 },
    ],
  },
  {
    id: 'r2',
    studentId: 's2',
    studentName: 'Maria Garcia',
    class: '10-B',
    examId: 'e3',
    examTitle: 'English Final',
    subjects: [
      { subject: 'English', marks: 74, total: 100 },
      { subject: 'Math', marks: 65, total: 100 },
      { subject: 'History', marks: 81, total: 100 },
    ],
  },
  {
    id: 'r3',
    studentId: 's3',
    studentName: 'James Lee',
    class: '9-A',
    examId: 'e3',
    examTitle: 'English Final',
    subjects: [
      { subject: 'Science', marks: 55, total: 100 },
      { subject: 'Geography', marks: 60, total: 100 },
      { subject: 'English', marks: 48, total: 100 },
    ],
  },
];

export const dailyStudentAttendance: DailyStudentAttendance[] = [
  {
    studentId: 's1',
    studentName: 'Alex Johnson',
    class: '10-A',
    records: [
      { date: '2024-08-01', status: 'present' },
      { date: '2024-08-02', status: 'present' },
      { date: '2024-08-05', status: 'absent' },
      { date: '2024-08-06', status: 'present' },
      { date: '2024-08-07', status: 'late' },
      { date: '2024-08-08', status: 'present' },
      { date: '2024-08-09', status: 'present' },
      { date: '2024-08-12', status: 'present' },
      { date: '2024-08-13', status: 'absent' },
      { date: '2024-08-14', status: 'present' },
    ],
  },
  {
    studentId: 's2',
    studentName: 'Maria Garcia',
    class: '10-B',
    records: [
      { date: '2024-08-01', status: 'present' },
      { date: '2024-08-02', status: 'absent' },
      { date: '2024-08-05', status: 'present' },
      { date: '2024-08-06', status: 'present' },
      { date: '2024-08-07', status: 'present' },
      { date: '2024-08-08', status: 'late' },
      { date: '2024-08-09', status: 'absent' },
      { date: '2024-08-12', status: 'present' },
      { date: '2024-08-13', status: 'present' },
      { date: '2024-08-14', status: 'present' },
    ],
  },
  {
    studentId: 's3',
    studentName: 'James Lee',
    class: '9-A',
    records: [
      { date: '2024-08-01', status: 'absent' },
      { date: '2024-08-02', status: 'absent' },
      { date: '2024-08-05', status: 'present' },
      { date: '2024-08-06', status: 'late' },
      { date: '2024-08-07', status: 'absent' },
      { date: '2024-08-08', status: 'present' },
      { date: '2024-08-09', status: 'absent' },
      { date: '2024-08-12', status: 'present' },
      { date: '2024-08-13', status: 'absent' },
      { date: '2024-08-14', status: 'late' },
    ],
  },
];
