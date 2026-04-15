import { BOOKING_STATUS, USER_ROLES } from '../constants';

const getFutureDate = (daysAhead) => {
  const date = new Date();
  date.setDate(date.getDate() + daysAhead);
  return date.toISOString().split('T')[0];
};

// Demo bookings for testing
export const demoBookings = [
  {
    id: 1,
    resourceId: 1,
    resourceName: 'Computer Lab 101',
    userId: 'student001',
    userName: 'John Doe',
    date: getFutureDate(1),
    startTime: '10:00',
    endTime: '12:00',
    purpose: 'Programming practice session',
    status: BOOKING_STATUS.APPROVED,
    createdAt: new Date().toISOString(),
    approvedAt: new Date().toISOString(),
    approvedBy: 'admin001'
  },
  {
    id: 2,
    resourceId: 3,
    resourceName: 'Central Library',
    userId: 'student002',
    userName: 'Jane Smith',
    date: getFutureDate(2),
    startTime: '14:00',
    endTime: '16:00',
    purpose: 'Study session for exams',
    status: BOOKING_STATUS.PENDING,
    createdAt: new Date().toISOString()
  },
  {
    id: 3,
    resourceId: 5,
    resourceName: 'Main Auditorium',
    userId: 'student003',
    userName: 'Mike Johnson',
    date: getFutureDate(3),
    startTime: '09:00',
    endTime: '11:00',
    purpose: 'Club presentation',
    status: BOOKING_STATUS.REJECTED,
    createdAt: new Date().toISOString(),
    rejectedAt: new Date().toISOString(),
    rejectedBy: 'admin001',
    rejectionReason: 'Auditorium already booked for official event'
  },
  {
    id: 4,
    resourceId: 7,
    resourceName: 'Indoor Sports Hall',
    userId: 'student004',
    userName: 'Sarah Wilson',
    date: getFutureDate(4),
    startTime: '16:00',
    endTime: '18:00',
    purpose: 'Basketball practice',
    status: BOOKING_STATUS.APPROVED,
    createdAt: new Date().toISOString(),
    approvedAt: new Date().toISOString(),
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
