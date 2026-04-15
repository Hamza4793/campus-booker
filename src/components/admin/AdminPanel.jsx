import React, { useState } from 'react';
import PendingBookings from './PendingBookings';
import BookingList from '../bookings/BookingList';
import Button from '../ui/Button';

const AdminPanel = ({ bookings, onUpdateStatus, onCancelBooking }) => {
  const [activeTab, setActiveTab] = useState('pending');
  
  // Calculate stats from bookings prop
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
  
  const stats = getBookingStats();

  const tabs = [
    { id: 'pending', label: 'Pending Bookings', count: stats.pending },
    { id: 'all', label: 'All Bookings', count: stats.total },
    { id: 'stats', label: 'Statistics', count: null }
  ];

  return (
    <div className="admin-panel">
      <div className="admin-panel-header">
        <h2>Admin Panel</h2>
        <p>Manage campus facility bookings</p>
      </div>

      <div className="admin-tabs">
        {tabs.map(tab => (
          <Button
            key={tab.id}
            variant={activeTab === tab.id ? 'primary' : 'secondary'}
            onClick={() => setActiveTab(tab.id)}
            className="tab-button"
          >
            {tab.label}
            {tab.count !== null && (
              <span className="tab-count">({tab.count})</span>
            )}
          </Button>
        ))}
      </div>

      <div className="admin-content">
        {activeTab === 'pending' && (
          <PendingBookings 
            bookings={bookings}
            onUpdateStatus={onUpdateStatus}
            onCancelBooking={onCancelBooking}
          />
        )}
        
        {activeTab === 'all' && (
          <BookingList
            bookings={bookings}
            userRole="admin"
            loading={false}
            onUpdateStatus={onUpdateStatus}
            onCancelBooking={onCancelBooking}
          />
        )}
        
        {activeTab === 'stats' && (
          <div className="admin-stats">
            <h3>Booking Statistics</h3>
            
            <div className="stats-grid">
              <div className="stat-card">
                <h4>Total Bookings</h4>
                <div className="stat-value">{stats.total}</div>
              </div>
              
              <div className="stat-card">
                <h4>Pending</h4>
                <div className="stat-value pending">{stats.pending}</div>
              </div>
              
              <div className="stat-card">
                <h4>Approved</h4>
                <div className="stat-value approved">{stats.approved}</div>
              </div>
              
              <div className="stat-card">
                <h4>Rejected</h4>
                <div className="stat-value rejected">{stats.rejected}</div>
              </div>
              
              <div className="stat-card">
                <h4>Approval Rate</h4>
                <div className="stat-value">{stats.approvalRate}%</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
