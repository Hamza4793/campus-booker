import React from 'react';
import Button from '../ui/Button';

const Header = ({ userRole, onToggleRole, onNavigation }) => {
  const isAdmin = userRole === 'admin';
  
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          🏫 CampusBooker
        </div>
        
        <nav className="nav-buttons">
          <Button 
            variant="secondary" 
            onClick={() => onNavigation('resources')}
          >
            Resources
          </Button>
          <Button 
            variant="secondary" 
            onClick={() => onNavigation('bookings')}
          >
            My Bookings
          </Button>
          {isAdmin && (
            <Button 
              variant="secondary" 
              onClick={() => onNavigation('admin')}
            >
              Admin Panel
            </Button>
          )}
          <Button 
            variant="primary" 
            onClick={onToggleRole}
          >
            Switch to {isAdmin ? 'Student' : 'Admin'}
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
