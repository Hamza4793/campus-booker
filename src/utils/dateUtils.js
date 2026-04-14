/**
 * Format date to readable string
 * @param {string} dateString - Date string (YYYY-MM-DD)
 * @returns {string} - Formatted date (e.g., "January 15, 2024")
 */
export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

/**
 * Format date to short string
 * @param {string} dateString - Date string (YYYY-MM-DD)
 * @returns {string} - Short formatted date (e.g., "Jan 15, 2024")
 */
export const formatShortDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

/**
 * Format time to readable string
 * @param {string} timeString - Time string (HH:MM)
 * @returns {string} - Formatted time (e.g., "10:00 AM")
 */
export const formatTime = (timeString) => {
  const [hours, minutes] = timeString.split(':');
  const hour = parseInt(hours);
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour % 12 || 12;
  return `${displayHour}:${minutes} ${ampm}`;
};

/**
 * Get today's date in YYYY-MM-DD format
 * @returns {string} - Today's date
 */
export const getTodayDate = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Get maximum booking date (e.g., 30 days from now)
 * @param {number} daysAhead - Number of days ahead to allow booking
 * @returns {string} - Maximum date in YYYY-MM-DD format
 */
export const getMaxBookingDate = (daysAhead = 30) => {
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + daysAhead);
  const year = maxDate.getFullYear();
  const month = String(maxDate.getMonth() + 1).padStart(2, '0');
  const day = String(maxDate.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

/**
 * Check if a date is today
 * @param {string} dateString - Date string (YYYY-MM-DD)
 * @returns {boolean} - True if date is today
 */
export const isToday = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  return date.toDateString() === today.toDateString();
};

/**
 * Check if a date is in the past
 * @param {string} dateString - Date string (YYYY-MM-DD)
 * @returns {boolean} - True if date is in the past
 */
export const isPastDate = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
};

/**
 * Get date range for filtering (e.g., this week, this month)
 * @param {string} range - Date range ('week', 'month', 'all')
 * @returns {Object} - Start and end dates
 */
export const getDateRange = (range) => {
  const today = new Date();
  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - today.getDay());
  startOfWeek.setHours(0, 0, 0, 0);
  
  const endOfWeek = new Date(startOfWeek);
  endOfWeek.setDate(startOfWeek.getDate() + 6);
  endOfWeek.setHours(23, 59, 59, 999);
  
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  endOfMonth.setHours(23, 59, 59, 999);
  
  switch (range) {
    case 'week':
      return {
        start: startOfWeek.toISOString().split('T')[0],
        end: endOfWeek.toISOString().split('T')[0]
      };
    case 'month':
      return {
        start: startOfMonth.toISOString().split('T')[0],
        end: endOfMonth.toISOString().split('T')[0]
      };
    case 'all':
    default:
      return { start: null, end: null };
  }
};

/**
 * Calculate duration between two times
 * @param {string} startTime - Start time (HH:MM)
 * @param {string} endTime - End time (HH:MM)
 * @returns {number} - Duration in hours
 */
export const calculateDuration = (startTime, endTime) => {
  const [startHours, startMinutes] = startTime.split(':').map(Number);
  const [endHours, endMinutes] = endTime.split(':').map(Number);
  
  const startTotalMinutes = startHours * 60 + startMinutes;
  const endTotalMinutes = endHours * 60 + endMinutes;
  
  return (endTotalMinutes - startTotalMinutes) / 60;
};

/**
 * Format duration in hours to readable string
 * @param {number} hours - Duration in hours
 * @returns {string} - Formatted duration (e.g., "2 hours", "1.5 hours")
 */
export const formatDuration = (hours) => {
  if (hours === 1) {
    return '1 hour';
  } else if (hours < 1) {
    return `${Math.round(hours * 60)} minutes`;
  } else if (hours % 1 === 0) {
    return `${hours} hours`;
  } else {
    return `${hours} hours`;
  }
};
