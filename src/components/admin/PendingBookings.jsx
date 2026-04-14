import React from 'react';
import BookingCard from '../bookings/BookingCard';
import { useBookings } from '../../hooks/useBookings';
import { BOOKING_STATUS } from '../../constants';

const PendingBookings = ({ onUpdateStatus, onCancelBooking }) => {
  const { bookings, loading } = useBookings();
  
  // Get only pending bookings
  const pendingBookings = bookings.filter(booking => 
    booking.status === BOOKING_STATUS.PENDING
  );

  // Sort by creation date (oldest first)
  pendingBookings.sort((a, b) => 
    new Date(a.createdAt) - new Date(b.createdAt)
  );

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  if (pendingBookings.length === 0) {
    return (
      <div className="empty-state">
        <h3>No Pending Bookings</h3>
        <p>All bookings have been processed. Great work! 🎉</p>
      </div>
    );
  }

  return (
    <div className="pending-bookings">
      <div className="pending-bookings-header">
        <h3>Pending Bookings</h3>
        <p>Review and approve or reject booking requests</p>
        <div className="pending-count">
          {pendingBookings.length} booking{pendingBookings.length !== 1 ? 's' : ''} awaiting approval
        </div>
      </div>

      <div className="pending-bookings-grid">
        {pendingBookings.map(booking => (
          <div key={booking.id} className="pending-booking-item">
            <BookingCard
              booking={booking}
              userRole="admin"
              onUpdateStatus={onUpdateStatus}
              onCancelBooking={onCancelBooking}
            />
          </div>
        ))}
      </div>

      <div className="bulk-actions">
        <h4>Bulk Actions</h4>
        <div className="bulk-action-buttons">
          <button 
            className="btn btn-success"
            onClick={() => {
              // Approve all pending bookings
              pendingBookings.forEach(booking => {
                onUpdateStatus(booking.id, BOOKING_STATUS.APPROVED);
              });
            }}
          >
            Approve All ({pendingBookings.length})
          </button>
          
          <button 
            className="btn btn-danger"
            onClick={() => {
              // Reject all pending bookings with a reason
              const reason = prompt('Please provide a reason for rejecting all pending bookings:');
              if (reason) {
                pendingBookings.forEach(booking => {
                  onUpdateStatus(booking.id, BOOKING_STATUS.REJECTED, reason);
                });
              }
            }}
          >
            Reject All
          </button>
        </div>
      </div>
    </div>
  );
};

export default PendingBookings;
