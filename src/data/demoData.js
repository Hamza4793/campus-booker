import { BOOKING_STATUS, USER_ROLES } from '../constants';

// Demo bookings for testing
export const demoBookings = [
  {
    id: 1,
    resourceId: 1,
    resourceName: 'Computer Lab 101',
    userId: 'student001',
    userName: 'John Doe',
    date: '2024-01-15',
    startTime: '10:00',
    endTime: '12:00',
    purpose: 'Programming practice session',
    status: BOOKING_STATUS.APPROVED,
    createdAt: '2024-01-10T09:00:00Z',
    approvedAt: '2024-01-10T10:30:00Z',
    approvedBy: 'admin001'
  },
  {
    id: 2,
    resourceId: 3,
    resourceName: 'Central Library',
    userId: 'student002',
    userName: 'Jane Smith',
    date: '2024-01-16',
    startTime: '14:00',
    endTime: '16:00',
    purpose: 'Study session for exams',
    status: BOOKING_STATUS.PENDING,
    createdAt: '2024-01-11T11:00:00Z'
  },
  {
    id: 3,
    resourceId: 5,
    resourceName: 'Main Auditorium',
    userId: 'student003',
    userName: 'Mike Johnson',
    date: '2024-01-17',
    startTime: '09:00',
    endTime: '11:00',
    purpose: 'Club presentation',
    status: BOOKING_STATUS.REJECTED,
    createdAt: '2024-01-12T13:00:00Z',
    rejectedAt: '2024-01-12T15:00:00Z',
    rejectedBy: 'admin001',
    rejectionReason: 'Auditorium already booked for official event'
  },
  {
    id: 4,
    resourceId: 7,
    resourceName: 'Indoor Sports Hall',
    userId: 'student004',
    userName: 'Sarah Wilson',
    date: '2024-01-18',
    startTime: '16:00',
    endTime: '18:00',
    purpose: 'Basketball practice',
    status: BOOKING_STATUS.APPROVED,
    createdAt: '2024-01-13T10:00:00Z',
    approvedAt: '2024-01-13T11:30:00Z',
    approvedBy: 'admin001'
  }
];

// Demo users
export const demoUsers = [
  {
    id: 'student001',
    name: 'John Doe',
    email: 'john.doe@campus.edu',
    role: USER_ROLES.STUDENT
  },
  {
    id: 'student002',
    name: 'Jane Smith',
    email: 'jane.smith@campus.edu',
    role: USER_ROLES.STUDENT
  },
  {
    id: 'admin001',
    name: 'Admin User',
    email: 'admin@campus.edu',
    role: USER_ROLES.ADMIN
  }
];

// Function to initialize demo data in localStorage
export const initializeDemoData = () => {
  if (typeof window !== 'undefined') {
    const existingBookings = localStorage.getItem('campus_booker_bookings');
    const existingUserRole = localStorage.getItem('campus_booker_user_role');
    
    if (!existingBookings) {
      localStorage.setItem('campus_booker_bookings', JSON.stringify(demoBookings));
    }
    
    if (!existingUserRole) {
      localStorage.setItem('campus_booker_user_role', USER_ROLES.STUDENT);
    }
  }
};
