import React, { useState, useEffect } from 'react';
import Input from '../ui/Input';
import Select from '../ui/Select';
import Button from '../ui/Button';
import { TIME_SLOTS } from '../../constants';
import { getTodayDate, getMaxBookingDate } from '../../utils/dateUtils';
import { validateBookingForm } from '../../utils/validation';

const BookingForm = ({ selectedResource, availableSlots, onSubmit, onCancel, loading }) => {
  const [formData, setFormData] = useState({
    resourceId: '',
    resourceName: '',
    date: '',
    startTime: '',
    endTime: '',
    purpose: '',
    userId: 'student001', // Demo user ID
    userName: 'John Doe'  // Demo user name
  });
  
  const [errors, setErrors] = useState({});
  const [filteredTimeSlots, setFilteredTimeSlots] = useState(TIME_SLOTS);

  // Update form when resource is selected
  useEffect(() => {
    if (selectedResource) {
      setFormData(prev => ({
        ...prev,
        resourceId: selectedResource.id,
        resourceName: selectedResource.name
      }));
    }
  }, [selectedResource]);

  // Update available time slots when date changes
  useEffect(() => {
    if (formData.date && availableSlots) {
      const slots = availableSlots(formData.resourceId, formData.date);
      setFilteredTimeSlots(slots);
    } else {
      setFilteredTimeSlots(TIME_SLOTS);
    }
  }, [formData.date, formData.resourceId, availableSlots]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    const validation = validateBookingForm(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }
    
    onSubmit(formData);
  };

  const handleReset = () => {
    setFormData({
      resourceId: selectedResource?.id || '',
      resourceName: selectedResource?.name || '',
      date: '',
      startTime: '',
      endTime: '',
      purpose: '',
      userId: 'student001',
      userName: 'John Doe'
    });
    setErrors({});
  };

  if (!selectedResource) {
    return (
      <div className="booking-form-placeholder">
        <h3>Book a Resource</h3>
        <p>Please select a resource from the list to make a booking.</p>
      </div>
    );
  }

  return (
    <div className="booking-form">
      <h3>Book {selectedResource.name}</h3>
      
      <form onSubmit={handleSubmit}>
        <Input
          label="Resource"
          name="resourceName"
          value={formData.resourceName}
          disabled
          helperText="Selected resource"
        />
        
        <Input
          label="Date"
          type="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
          error={errors.date}
          min={getTodayDate()}
          max={getMaxBookingDate()}
          required
        />
        
        <Select
          label="Start Time"
          name="startTime"
          value={formData.startTime}
          onChange={handleInputChange}
          error={errors.startTime}
          options={filteredTimeSlots.map(slot => ({
            value: slot,
            label: slot
          }))}
          required
        />
        
        <Select
          label="End Time"
          name="endTime"
          value={formData.endTime}
          onChange={handleInputChange}
          error={errors.endTime}
          options={filteredTimeSlots.map(slot => ({
            value: slot,
            label: slot
          }))}
          required
        />
        
        <div className="form-group">
          <label className="form-label">Purpose of Booking</label>
          <textarea
            name="purpose"
            value={formData.purpose}
            onChange={handleInputChange}
            className={`form-input ${errors.purpose ? 'error' : ''}`}
            placeholder="Please describe the purpose of your booking..."
            rows="4"
            required
          />
          {errors.purpose && (
            <span className="error">{errors.purpose}</span>
          )}
        </div>
        
        <div className="form-actions">
          <Button
            type="button"
            variant="secondary"
            onClick={handleReset}
            disabled={loading}
          >
            Reset
          </Button>
          
          <div className="form-actions-right">
            <Button
              type="button"
              variant="secondary"
              onClick={onCancel}
              disabled={loading}
            >
              Cancel
            </Button>
            
            <Button
              type="submit"
              variant="primary"
              loading={loading}
              disabled={!formData.date || !formData.startTime || !formData.endTime || !formData.purpose}
            >
              Submit Booking
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
