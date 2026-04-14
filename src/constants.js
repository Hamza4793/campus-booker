// Constants for CampusBooker Application

export const BOOKING_STATUS = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected'
};

export const USER_ROLES = {
  STUDENT: 'student',
  ADMIN: 'admin'
};

export const RESOURCE_TYPES = {
  LAB: 'lab',
  LIBRARY: 'library',
  AUDITORIUM: 'auditorium',
  SPORTS_HALL: 'sports_hall'
};

export const TIME_SLOTS = [
  '08:00', '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00', '17:00', '18:00'
];

export const STORAGE_KEYS = {
  BOOKINGS: 'campus_booker_bookings',
  USER_ROLE: 'campus_booker_user_role',
  RESOURCES: 'campus_booker_resources'
};

export const VALIDATION_MESSAGES = {
  REQUIRED: 'This field is required',
  INVALID_DATE: 'Please select a valid future date',
  INVALID_TIME: 'End time must be after start time',
  PAST_TIME: 'Cannot book past time slots',
  CLASH_DETECTED: 'Time slot conflicts with existing booking'
};
