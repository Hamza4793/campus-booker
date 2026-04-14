import { useState, useEffect } from 'react';

/**
 * Custom hook for managing localStorage data
 * @param {string} key - localStorage key
 * @param {any} initialValue - Initial value if no data exists
 * @returns {Array} - [value, setValue, removeValue]
 */
export const useLocalStorage = (key, initialValue) => {
  // Get value from localStorage or use initial value
  const [storedValue, setStoredValue] = useState(() => {
    if (typeof window === 'undefined') {
      return initialValue;
    }
    
    try {
      const item = window.localStorage.getItem(key);
      if (!item) return initialValue;
      const parsed = JSON.parse(item);
      // Ensure we return an array for bookings
      return Array.isArray(parsed) ? parsed : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Function to update localStorage value
  const setValue = (value) => {
    try {
      // Allow value to be a function so we have the same API as useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      setStoredValue(valueToStore);
      
      if (typeof window !== 'undefined') {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  // Function to remove value from localStorage
  const removeValue = () => {
    try {
      setStoredValue(initialValue);
      
      if (typeof window !== 'undefined') {
        window.localStorage.removeItem(key);
      }
    } catch (error) {
      console.error(`Error removing localStorage key "${key}":`, error);
    }
  };

  // Sync with localStorage changes from other tabs
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.error(`Error parsing localStorage change for key "${key}":`, error);
        }
      }
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('storage', handleStorageChange);
      
      return () => {
        window.removeEventListener('storage', handleStorageChange);
      };
    }
  }, [key]);

  return [storedValue, setValue, removeValue];
};

/**
 * Hook for managing user role in localStorage
 * @returns {Array} - [userRole, setUserRole, isAdmin, isStudent]
 */
export const useUserRole = () => {
  const [userRole, setUserRole] = useLocalStorage('campus_booker_user_role', 'student');
  
  const isAdmin = userRole === 'admin';
  const isStudent = userRole === 'student';
  
  const toggleRole = () => {
    setUserRole(isAdmin ? 'student' : 'admin');
  };
  
  return [userRole, setUserRole, isAdmin, isStudent, toggleRole];
};
