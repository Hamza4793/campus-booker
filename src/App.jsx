import React, { useState, useEffect } from 'react';
import { useUserRole } from './hooks/useLocalStorage';
import { useBookings } from './hooks/useBookings';
import { initializeDemoData } from './data/demoData';
import Header from './components/common/Header';
import Layout from './components/common/Layout';
import ResourceList from './components/resources/ResourceList';
import BookingForm from './components/bookings/BookingForm';
import BookingList from './components/bookings/BookingList';
import AdminPanel from './components/admin/AdminPanel';
import './styles/components.css';

const App = () => {
  const [userRole, setUserRole, isAdmin, isStudent, toggleRole] = useUserRole();
  const [activeView, setActiveView] = useState('resources');
  const [selectedResource, setSelectedResource] = useState(null);
  const [notification, setNotification] = useState(null);

  const { 
    bookings, 
    loading, 
    error, 
    addBooking, 
    updateBookingStatus, 
    cancelBooking, 
    getAvailableSlots 
  } = useBookings();

  // Initialize demo data on mount
  useEffect(() => {
    initializeDemoData();
  }, []);

  // Show notification
  const showNotification = (message, type = 'success') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 5000);
  };

  // Handle booking submission
  const handleBookingSubmit = async (bookingData) => {
    const result = await addBooking(bookingData);
    
    if (result.success) {
      showNotification(result.message, 'success');
      setSelectedResource(null);
      setActiveView('bookings');
    } else {
      showNotification(result.message, 'error');
    }
  };

  // Handle booking status update
  const handleStatusUpdate = async (bookingId, status, reason) => {
    const result = await updateBookingStatus(bookingId, status, reason);
    
    if (result.success) {
      showNotification(result.message, 'success');
    } else {
      showNotification(result.message, 'error');
    }
  };

  // Handle booking cancellation
  const handleCancelBooking = async (bookingId) => {
    const result = await cancelBooking(bookingId);
    
    if (result.success) {
      showNotification(result.message, 'success');
    } else {
      showNotification(result.message, 'error');
    }
  };

  // Handle navigation
  const handleNavigation = (view) => {
    setActiveView(view);
    if (view !== 'resources') {
      setSelectedResource(null);
    }
  };

  // Render main content based on active view
  const renderMainContent = () => {
    switch (activeView) {
      case 'resources':
        return (
          <div className="resources-view">
            <div className="resources-section">
              <ResourceList 
                onResourceSelect={setSelectedResource}
                selectedResource={selectedResource}
              />
            </div>
            
            {selectedResource && (
              <div className="booking-form-section">
                <BookingForm
                  selectedResource={selectedResource}
                  availableSlots={getAvailableSlots}
                  bookings={bookings}
                  onSubmit={handleBookingSubmit}
                  onCancel={() => setSelectedResource(null)}
                  loading={loading}
                />
              </div>
            )}
          </div>
        );
        
      case 'bookings':
        return (
          <BookingList
            bookings={bookings}
            userRole={userRole}
            loading={loading}
            onCancelBooking={handleCancelBooking}
            onUpdateStatus={handleStatusUpdate}
          />
        );
        
      case 'admin':
        if (!isAdmin) {
          return (
            <div className="access-denied">
              <h3>Access Denied</h3>
              <p>You need admin privileges to access this panel.</p>
            </div>
          );
        }
        return (
          <AdminPanel
            bookings={bookings}
            onUpdateStatus={handleStatusUpdate}
            onCancelBooking={handleCancelBooking}
          />
        );
        
      default:
        return (
          <div className="welcome-view">
            <h2>Welcome to CampusBooker! 🏫</h2>
            <p>Book campus facilities easily and efficiently.</p>
            <div className="welcome-actions">
              <button 
                className="btn btn-primary"
                onClick={() => handleNavigation('resources')}
              >
                Browse Resources
              </button>
              <button 
                className="btn btn-secondary"
                onClick={() => handleNavigation('bookings')}
              >
                My Bookings
              </button>
            </div>
          </div>
        );
    }
  };

  return (
    <div className="app">
      <Header 
        userRole={userRole}
        onToggleRole={toggleRole}
        onNavigation={handleNavigation}
      />
      
      <Layout>
        <main className="main-content">
          {renderMainContent()}
        </main>
      </Layout>

      {/* Notification */}
      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}

      {/* Error boundary */}
      {error && (
        <div className="error-boundary">
          <h3>Something went wrong</h3>
          <p>{error}</p>
          <button 
            className="btn btn-primary"
            onClick={() => window.location.reload()}
          >
            Reload Page
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
