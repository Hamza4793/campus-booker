import { RESOURCE_TYPES } from '../constants';

// Campus facilities data
export const resources = [
  {
    id: 1,
    name: 'Computer Lab 101',
    type: RESOURCE_TYPES.LAB,
    capacity: 30,
    description: 'Modern computer lab with high-speed internet and latest software',
    equipment: ['Computers', 'Projector', 'Whiteboard', 'WiFi'],
    location: 'Engineering Building, Floor 1',
    available: true,
    operatingHours: {
      start: '08:00',
      end: '18:00'
    }
  },
  {
    id: 2,
    name: 'Physics Lab 201',
    type: RESOURCE_TYPES.LAB,
    capacity: 25,
    description: 'Physics laboratory with experimental equipment',
    equipment: ['Lab Benches', 'Microscopes', 'Safety Equipment', 'Projector'],
    location: 'Science Building, Floor 2',
    available: true,
    operatingHours: {
      start: '09:00',
      end: '17:00'
    }
  },
  {
    id: 3,
    name: 'Central Library',
    type: RESOURCE_TYPES.LIBRARY,
    capacity: 100,
    description: 'Main library with study areas and research facilities',
    equipment: ['Study Carrels', 'Computers', 'Printers', 'WiFi', 'Discussion Rooms'],
    location: 'Academic Block, Ground Floor',
    available: true,
    operatingHours: {
      start: '08:00',
      end: '22:00'
    }
  },
  {
    id: 4,
    name: 'Digital Library',
    type: RESOURCE_TYPES.LIBRARY,
    capacity: 50,
    description: 'Digital resource center with e-books and online databases',
    equipment: ['Computers', 'Scanners', 'Printers', 'WiFi'],
    location: 'Library Building, Floor 2',
    available: true,
    operatingHours: {
      start: '09:00',
      end: '20:00'
    }
  },
  {
    id: 5,
    name: 'Main Auditorium',
    type: RESOURCE_TYPES.AUDITORIUM,
    capacity: 500,
    description: 'Large auditorium for events and presentations',
    equipment: ['Stage', 'Sound System', 'Projector', 'Lighting', 'Microphones'],
    location: 'Administrative Block',
    available: true,
    operatingHours: {
      start: '08:00',
      end: '22:00'
    }
  },
  {
    id: 6,
    name: 'Conference Hall',
    type: RESOURCE_TYPES.AUDITORIUM,
    capacity: 100,
    description: 'Conference hall for meetings and seminars',
    equipment: ['Projector', 'Sound System', 'WiFi', 'Video Conferencing'],
    location: 'Administrative Block, Floor 3',
    available: true,
    operatingHours: {
      start: '08:00',
      end: '18:00'
    }
  },
  {
    id: 7,
    name: 'Indoor Sports Hall',
    type: RESOURCE_TYPES.SPORTS_HALL,
    capacity: 200,
    description: 'Indoor sports facility for basketball, badminton, and volleyball',
    equipment: ['Basketball Court', 'Badminton Courts', 'Volleyball Court', 'Changing Rooms'],
    location: 'Sports Complex',
    available: true,
    operatingHours: {
      start: '06:00',
      end: '22:00'
    }
  },
  {
    id: 8,
    name: 'Gymnasium',
    type: RESOURCE_TYPES.SPORTS_HALL,
    capacity: 50,
    description: 'Fitness center with modern exercise equipment',
    equipment: ['Treadmills', 'Weights', 'Exercise Machines', 'Showers'],
    location: 'Sports Complex, Floor 2',
    available: true,
    operatingHours: {
      start: '06:00',
      end: '21:00'
    }
  }
];

// Resource type configurations for UI
export const resourceTypeConfig = {
  [RESOURCE_TYPES.LAB]: {
    label: 'Laboratory',
    color: '#3182ce',
    icon: '🔬'
  },
  [RESOURCE_TYPES.LIBRARY]: {
    label: 'Library',
    color: '#805ad5',
    icon: '📚'
  },
  [RESOURCE_TYPES.AUDITORIUM]: {
    label: 'Auditorium',
    color: '#d69e2e',
    icon: '🎭'
  },
  [RESOURCE_TYPES.SPORTS_HALL]: {
    label: 'Sports Hall',
    color: '#38a169',
    icon: '🏃'
  }
};
