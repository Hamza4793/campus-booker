import React, { useState } from 'react';
import Button from '../ui/Button';
import { BOOKING_STATUS } from '../../constants';
import { formatDate, formatTime, formatDuration, calculateDuration } from '../../utils/dateUtils';

const BookingCard = ({ 
  booking, 
  userRole, 
  currentUserId, 
  onCancel, 
  onUpdateStatus 
}) => {
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [loading, setLoading] = useState(false);

  const isOwner = booking.userId === currentUserId;
  const canCancel = isOwner && booking.status === BOOKING_STATUS.PENDING;
  const canApproveReject = userRole === 'admin' && booking.status === BOOKING_STATUS.PENDING;

  const duration = calculateDuration(booking.startTime, booking.endTime);

  const handleStatusUpdate = async (status, reason = null) => {
    setLoading(true);
    try {
      await onUpdateStatus(status, reason);
      setShowRejectForm(false);
      setRejectionReason('');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    const statusClasses = {
      [BOOKING_STATUS.PENDING]: 'status-pending',
      [BOOKING_STATUS.APPROVED]: 'status-approved',
      [BOOKING_STATUS.REJECTED]: 'status-rejected'
    };

    return (
      <span className={`status-badge ${statusClasses[status]}`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </span>
    );
  };

  return (
    <div className="booking-card">
      <div className="booking-card-header">
        <div className="booking-resource-info">
          <h4>{booking.resourceName}</h4>
          {getStatusBadge(booking.status)}
        </div>
        
        <div className="booking-actions">
          {canCancel && (
            <Button
              variant="danger"
              size="small"
              onClick={onCancel}
              loading={loading}
            >
              Cancel
            </Button>
          )}
          
          {canApproveReject && (
            <div className="admin-actions">
              <Button
                variant="success"
                size="small"
                onClick={() => handleStatusUpdate(BOOKING_STATUS.APPROVED)}
                loading={loading}
              >
                Approve
              </Button>
              
              <Button
                variant="danger"
                size="small"
                onClick={() => setShowRejectForm(true)}
                loading={loading}
              >
                Reject
              </Button>
            </div>
          )}
        </div>
      </div>

      <div className="booking-card-content">
        <div className="booking-details">
          <div className="booking-detail">
            <span className="detail-label">Date:</span>
            <span className="detail-value">{formatDate(booking.date)}</span>
          </div>
          
          <div className="booking-detail">
            <span className="detail-label">Time:</span>
            <span className="detail-value">
              {formatTime(booking.startTime)} - {formatTime(booking.endTime)}
            </span>
          </div>
          
          <div className="booking-detail">
            <span className="detail-label">Duration:</span>
            <span className="detail-value">{formatDuration(duration)}</span>
          </div>
          
          <div className="booking-detail">
            <span className="detail-label">Booked by:</span>
            <span className="detail-value">{booking.userName}</span>
          </div>
        </div>

        <div className="booking-purpose">
          <h5>Purpose:</h5>
          <p>{booking.purpose}</p>
        </div>

        {booking.rejectionReason && (
          <div className="rejection-reason">
            <h5>Rejection Reason:</h5>
            <p>{booking.rejectionReason}</p>
          </div>
        )}

        {showRejectForm && (
          <div className="reject-form">
            <h5>Rejection Reason:</h5>
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Please provide a reason for rejection..."
              rows="3"
              className="form-input"
            />
            <div className="reject-form-actions">
              <Button
                variant="secondary"
                size="small"
                onClick={() => {
                  setShowRejectForm(false);
                  setRejectionReason('');
                }}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                size="small"
                onClick={() => handleStatusUpdate(BOOKING_STATUS.REJECTED, rejectionReason)}
                disabled={!rejectionReason.trim()}
                loading={loading}
              >
                Confirm Reject
              </Button>
            </div>
          </div>
        )}

        <div className="booking-meta">
          <small>
            Created: {new Date(booking.createdAt).toLocaleString()}
          </small>
          {booking.approvedAt && (
            <small>
              Approved: {new Date(booking.approvedAt).toLocaleString()}
            </small>
          )}
          {booking.rejectedAt && (
            <small>
              Rejected: {new Date(booking.rejectedAt).toLocaleString()}
            </small>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
