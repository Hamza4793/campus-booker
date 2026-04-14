import { useState, useEffect } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { checkBookingClash, getAvailableTimeSlots } from '../utils/clashDetection';
import { validateBookingForm } from '../utils/validation';

/**
 * Custom hook for managing bookings
 * @returns {Object} - Bookings state and management functions
 */
export const useBookings = () => {
  const [bookings, setBookings] = useLocalStorage('campus_booker_bookings', []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Add a new booking
   * @param {Object} bookingData - New booking data
   * @returns {Object} - Result with success status and message
   */
  const addBooking = (bookingData) => {
    setLoading(true);
    setError(null);
    
    try {
      // Validate form data
      const validation = validateBookingForm(bookingData);
      if (!validation.isValid) {
        setLoading(false);
        return {
          success: false,
          message: 'Please fix the validation errors',
          errors: validation.errors
        };
      }

      // Check for clashes
      const clashCheck = checkBookingClash(bookingData, bookings);
      if (clashCheck.hasClash) {
        setLoading(false);
        return {
          success: false,
          message: clashCheck.message,
          clashingBookings: clashCheck.clashingBookings
        };
      }

      // Create new booking
      const newBooking = {
        id: Date.now(), // Simple ID generation
        ...bookingData,
        status: 'pending',
        createdAt: new Date().toISOString()
      };

      // Add to bookings array
      const updatedBookings = [...bookings, newBooking];
      setBookings(updatedBookings);

      setLoading(false);
      return {
        success: true,
        message: 'Booking submitted successfully! Waiting for admin approval.',
        booking: newBooking
      };
    } catch (err) {
      setLoading(false);
      setError(err.message);
      return {
        success: false,
        message: 'Failed to create booking. Please try again.',
        error: err.message
      };
    }
  };

  /**
   * Update booking status (approve/reject)
   * @param {number} bookingId - Booking ID to update
   * @param {string} status - New status ('approved' or 'rejected')
   * @param {string} reason - Rejection reason (if rejected)
   * @param {string} adminId - Admin user ID
   * @returns {Object} - Result with success status
   */
  const updateBookingStatus = (bookingId, status, reason = null, adminId = 'admin001') => {
    setLoading(true);
    setError(null);

    try {
      const updatedBookings = bookings.map(booking => {
        if (booking.id === bookingId) {
          const updatedBooking = {
            ...booking,
            status,
            approvedAt: status === 'approved' ? new Date().toISOString() : null,
            rejectedAt: status === 'rejected' ? new Date().toISOString() : null,
            approvedBy: status === 'approved' ? adminId : null,
            rejectedBy: status === 'rejected' ? adminId : null,
            rejectionReason: status === 'rejected' ? reason : null
          };
          return updatedBooking;
        }
        return booking;
      });

      setBookings(updatedBookings);
      setLoading(false);

      return {
        success: true,
        message: `Booking ${status} successfully`,
        booking: updatedBookings.find(b => b.id === bookingId)
      };
    } catch (err) {
      setLoading(false);
      setError(err.message);
      return {
        success: false,
        message: 'Failed to update booking status',
        error: err.message
      };
    }
  };

  /**
   * Cancel a booking
   * @param {number} bookingId - Booking ID to cancel
   * @returns {Object} - Result with success status
   */
  const cancelBooking = (bookingId) => {
    setLoading(true);
    setError(null);

    try {
      const updatedBookings = bookings.filter(booking => booking.id !== bookingId);
      setBookings(updatedBookings);
      setLoading(false);

      return {
        success: true,
        message: 'Booking cancelled successfully'
      };
    } catch (err) {
      setLoading(false);
      setError(err.message);
      return {
        success: false,
        message: 'Failed to cancel booking',
        error: err.message
      };
    }
  };

  /**
   * Get bookings filtered by various criteria
   * @param {Object} filters - Filter criteria
   * @returns {Array} - Filtered bookings
   */
  const getFilteredBookings = (filters = {}) => {
    let filtered = [...bookings];

    if (filters.resourceId) {
      filtered = filtered.filter(booking => booking.resourceId === filters.resourceId);
    }

    if (filters.status) {
      filtered = filtered.filter(booking => booking.status === filters.status);
    }

    if (filters.userId) {
      filtered = filtered.filter(booking => booking.userId === filters.userId);
    }

    if (filters.date) {
      filtered = filtered.filter(booking => booking.date === filters.date);
    }

    if (filters.dateRange) {
      const { start, end } = filters.dateRange;
      if (start) {
        filtered = filtered.filter(booking => booking.date >= start);
      }
      if (end) {
        filtered = filtered.filter(booking => booking.date <= end);
      }
    }

    // Sort by date and time
    filtered.sort((a, b) => {
      const dateCompare = new Date(a.date) - new Date(b.date);
      if (dateCompare !== 0) return dateCompare;
      return a.startTime.localeCompare(b.startTime);
    });

    return filtered;
  };

  /**
   * Get available time slots for a resource on a specific date
   * @param {number} resourceId - Resource ID
   * @param {string} date - Date string
   * @param {Array} timeSlots - Available time slots
   * @returns {Array} - Available time slots
   */
  const getAvailableSlots = (resourceId, date, timeSlots) => {
    return getAvailableTimeSlots(resourceId, date, bookings, timeSlots);
  };

  /**
   * Get booking statistics
   * @returns {Object} - Booking statistics
   */
  const getBookingStats = () => {
    const total = bookings.length;
    const pending = bookings.filter(b => b.status === 'pending').length;
    const approved = bookings.filter(b => b.status === 'approved').length;
    const rejected = bookings.filter(b => b.status === 'rejected').length;

    return {
      total,
      pending,
      approved,
      rejected,
      approvalRate: total > 0 ? ((approved / total) * 100).toFixed(1) : 0
    };
  };

  return {
    bookings,
    loading,
    error,
    addBooking,
    updateBookingStatus,
    cancelBooking,
    getFilteredBookings,
    getAvailableSlots,
    getBookingStats
  };
};
