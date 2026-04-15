import { BOOKING_STATUS } from '../constants';

/**
 * Check if two time ranges overlap
 * @param {string} start1 - Start time of first booking (HH:MM)
 * @param {string} end1 - End time of first booking (HH:MM)
 * @param {string} start2 - Start time of second booking (HH:MM)
 * @param {string} end2 - End time of second booking (HH:MM)
 * @returns {boolean} - True if time ranges overlap
 */
export const doTimeRangesOverlap = (start1, end1, start2, end2) => {
  // Convert time strings to minutes since midnight
  const timeToMinutes = (time) => {
    const [hours, minutes] = time.split(':').map(Number);
    return hours * 60 + minutes;
  };

  const start1Minutes = timeToMinutes(start1);
  const end1Minutes = timeToMinutes(end1);
  const start2Minutes = timeToMinutes(start2);
  const end2Minutes = timeToMinutes(end2);

  // Check if ranges overlap
  return (start1Minutes < end2Minutes) && (start2Minutes < end1Minutes);
};

/**
 * Check if a new booking clashes with existing bookings
 * @param {Object} newBooking - New booking to check
 * @param {Array} existingBookings - Existing bookings array
 * @returns {Object} - Clash detection result
 */
export const checkBookingClash = (newBooking, existingBookings) => {
  const { resourceId, date, startTime, endTime } = newBooking;
  
  // Filter bookings for the same resource and date
  const sameResourceBookings = existingBookings.filter(booking => 
    booking.resourceId === resourceId && 
    booking.date === date &&
    booking.status !== BOOKING_STATUS.REJECTED
  );

  // Check for time clashes
  const clashes = sameResourceBookings.filter(existingBooking => 
    doTimeRangesOverlap(startTime, endTime, existingBooking.startTime, existingBooking.endTime)
  );

  return {
    hasClash: clashes.length > 0,
    clashingBookings: clashes,
    message: clashes.length > 0 
      ? `Time slot conflicts with existing booking(s): ${clashes.map(b => `${b.startTime}-${b.endTime}`).join(', ')}`
      : null
  };
};

/**
 * Get available time slots for a resource on a specific date
 * @param {number} resourceId - Resource ID
 * @param {string} date - Date string (YYYY-MM-DD)
 * @param {Array} existingBookings - Existing bookings array
 * @param {Array} timeSlots - Available time slots array
 * @returns {Array} - Array of available time slots
 */
export const getAvailableTimeSlots = (resourceId, date, existingBookings, timeSlots) => {
  // Get approved bookings for the resource and date
  const approvedBookings = existingBookings.filter(booking => 
    booking.resourceId === resourceId && 
    booking.date === date &&
    booking.status === BOOKING_STATUS.APPROVED
  );

  // Find occupied time slots
  const occupiedSlots = new Set();
  approvedBookings.forEach(booking => {
    const startIndex = timeSlots.indexOf(booking.startTime);
    const endIndex = timeSlots.indexOf(booking.endTime);
    
    if (startIndex !== -1 && endIndex !== -1) {
      for (let i = startIndex; i < endIndex; i++) {
        occupiedSlots.add(timeSlots[i]);
      }
    }
  });

  // Return available time slots
  return timeSlots.filter(slot => !occupiedSlots.has(slot));
};

/**
 * Check if a booking time is valid (not in the past, within operating hours)
 * @param {string} date - Date string (YYYY-MM-DD)
 * @param {string} startTime - Start time (HH:MM)
 * @param {string} endTime - End time (HH:MM)
 * @param {Object} operatingHours - Resource operating hours
 * @returns {Object} - Validation result
 */
export const validateBookingTime = (date, startTime, endTime, operatingHours) => {
  const errors = [];
  
  // Check if date is in the future
  const bookingDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  if (bookingDate < today) {
    errors.push('Cannot book past dates');
  }
  
  // Check if end time is after start time
  if (startTime >= endTime) {
    errors.push('End time must be after start time');
  }
  
  // Check if booking is within operating hours
  if (operatingHours) {
    if (startTime < operatingHours.start || endTime > operatingHours.end) {
      errors.push(`Booking must be within operating hours: ${operatingHours.start} - ${operatingHours.end}`);
    }
  }
  
  // Check if booking time is in the past for today
  if (bookingDate.toDateString() === today.toDateString()) {
    const now = new Date();
    const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    
    if (startTime <= currentTime) {
      errors.push('Cannot book past time slots');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};
