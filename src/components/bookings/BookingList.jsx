import React, { useState } from 'react';
import BookingCard from './BookingCard';
import Input from '../ui/Input';
import Select from '../ui/Select';
import { BOOKING_STATUS } from '../../constants';

const BookingList = ({ 
  bookings, 
  userRole, 
  loading, 
  onCancelBooking, 
  onUpdateStatus,
  currentUserId = 'student001' 
}) => {
  const [filters, setFilters] = useState({
    status: '',
    resourceId: '',
    date: ''
  });

  const [searchTerm, setSearchTerm] = useState('');

  // Filter bookings based on current user role
  const getFilteredBookings = () => {
    let filtered = bookings || [];

    // If student, only show their bookings
    if (userRole === 'student') {
      filtered = filtered.filter(booking => booking.userId === currentUserId);
    }

    // Apply filters
    if (filters.status) {
      filtered = filtered.filter(booking => booking.status === filters.status);
    }

    if (filters.resourceId) {
      filtered = filtered.filter(booking => booking.resourceId === parseInt(filters.resourceId));
    }

    if (filters.date) {
      filtered = filtered.filter(booking => booking.date === filters.date);
    }

    // Apply search
    if (searchTerm) {
      filtered = filtered.filter(booking => 
        (booking.resourceName && booking.resourceName.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (booking.purpose && booking.purpose.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (booking.userName && booking.userName.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Sort by date and time (newest first)
    filtered.sort((a, b) => {
      if (!a.date || !b.date) return 0;
      const dateCompare = new Date(b.date) - new Date(a.date);
      if (dateCompare !== 0) return dateCompare;
      return (b.startTime || '').localeCompare(a.startTime || '');
    });

    return filtered;
  };

  const handleFilterChange = (name, value) => {
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const filteredBookings = getFilteredBookings();

  return (
    <div className="booking-list">
      <div className="booking-list-header">
        <h2>
          {userRole === 'student' ? 'My Bookings' : 'All Bookings'}
          <span className="booking-count">({filteredBookings.length})</span>
        </h2>
        
        <div className="booking-filters">
          <Input
            type="text"
            placeholder="Search bookings..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          
          <Select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            options={[
              { value: '', label: 'All Status' },
              { value: BOOKING_STATUS.PENDING, label: 'Pending' },
              { value: BOOKING_STATUS.APPROVED, label: 'Approved' },
              { value: BOOKING_STATUS.REJECTED, label: 'Rejected' }
            ]}
            className="filter-select"
          />
          
          <Input
            type="date"
            value={filters.date}
            onChange={(e) => handleFilterChange('date', e.target.value)}
            className="filter-input"
          />
        </div>
      </div>

      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
        </div>
      ) : filteredBookings.length === 0 ? (
        <div className="empty-state">
          <h3>No bookings found</h3>
          <p>
            {userRole === 'student' 
              ? "You haven't made any bookings yet. Select a resource to get started!"
              : "No bookings match the current filters."
            }
          </p>
        </div>
      ) : (
        <div className="bookings-grid">
          {filteredBookings.map(booking => (
            <BookingCard
              key={booking.id}
              booking={booking}
              userRole={userRole}
              currentUserId={currentUserId}
              onCancel={() => onCancelBooking(booking.id)}
              onUpdateStatus={(status, reason) => onUpdateStatus(booking.id, status, reason)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookingList;
