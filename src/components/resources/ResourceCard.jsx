import React from 'react';
import { resourceTypeConfig } from '../../data/resources';

const ResourceCard = ({ resource, isSelected, onClick }) => {
  const typeConfig = resourceTypeConfig[resource.type];
  
  return (
    <div 
      className={`resource-card ${isSelected ? 'selected' : ''}`}
      onClick={onClick}
    >
      <div className="resource-card-header" style={{ backgroundColor: typeConfig.color }}>
        <div className="resource-icon">{typeConfig.icon}</div>
        <div className="resource-type">{typeConfig.label}</div>
      </div>
      
      <div className="resource-card-content">
        <h4 className="resource-name">{resource.name}</h4>
        <p className="resource-description">{resource.description}</p>
        
        <div className="resource-details">
          <div className="resource-detail">
            <span className="detail-label">Capacity:</span>
            <span className="detail-value">{resource.capacity} people</span>
          </div>
          
          <div className="resource-detail">
            <span className="detail-label">Location:</span>
            <span className="detail-value">{resource.location}</span>
          </div>
          
          <div className="resource-detail">
            <span className="detail-label">Hours:</span>
            <span className="detail-value">
              {resource.operatingHours.start} - {resource.operatingHours.end}
            </span>
          </div>
        </div>
        
        <div className="resource-equipment">
          <h5>Equipment:</h5>
          <div className="equipment-list">
            {resource.equipment.map((item, index) => (
              <span key={index} className="equipment-tag">
                {item}
              </span>
            ))}
          </div>
        </div>
        
        <div className="resource-status">
          <span className={`status-indicator ${resource.available ? 'available' : 'unavailable'}`}>
            {resource.available ? 'Available' : 'Unavailable'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;
