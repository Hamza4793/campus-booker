import React from 'react';
import ResourceCard from './ResourceCard';
import { resources, resourceTypeConfig } from '../../data/resources';

const ResourceList = ({ onResourceSelect, selectedResource }) => {
  // Group resources by type
  const groupedResources = resources.reduce((groups, resource) => {
    const type = resource.type;
    if (!groups[type]) {
      groups[type] = [];
    }
    groups[type].push(resource);
    return groups;
  }, {});

  return (
    <div className="resource-list">
      <h2>Available Resources</h2>
      
      {Object.entries(groupedResources).map(([type, typeResources]) => (
        <div key={type} className="resource-type-section">
          <div className="resource-type-header">
            <span className="resource-type-icon">
              {resourceTypeConfig[type]?.icon}
            </span>
            <h3>{resourceTypeConfig[type]?.label}</h3>
            <span className="resource-count">
              {typeResources.length} available
            </span>
          </div>
          
          <div className="grid grid-3">
            {typeResources.map(resource => (
              <ResourceCard
                key={resource.id}
                resource={resource}
                isSelected={selectedResource?.id === resource.id}
                onClick={() => onResourceSelect(resource)}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ResourceList;
