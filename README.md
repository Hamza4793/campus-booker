# CampusBooker - Campus Facility Booking System

A React-based web application that allows students to book campus facilities with clash detection and admin approval system.

## Features

### Student Features
- 🏫 Browse available campus facilities (labs, libraries, auditoriums, sports halls)
- 📅 Book time slots for resources
- 🚫 Automatic clash detection to prevent double bookings
- 📋 View personal booking history
- ✏️ Cancel pending bookings

### Admin Features
- 👑 Admin role toggle functionality
- ✅ Approve or reject booking requests
- 📊 View booking statistics
- 🔍 Filter and search all bookings
- 📈 Track approval rates

### Technical Features
- 💾 LocalStorage data persistence
- 🎨 Modern responsive UI design
- ⚡ Real-time clash detection
- 🔧 Form validation and error handling
- 📱 Mobile-friendly interface

## Project Structure

```
campus-booker/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Header.jsx
│   │   │   ├── Layout.jsx
│   │   │   └── Card.jsx
│   │   ├── resources/
│   │   │   ├── ResourceList.jsx
│   │   │   └── ResourceCard.jsx
│   │   ├── bookings/
│   │   │   ├── BookingForm.jsx
│   │   │   ├── BookingList.jsx
│   │   │   └── BookingCard.jsx
│   │   ├── admin/
│   │   │   ├── AdminPanel.jsx
│   │   │   └── PendingBookings.jsx
│   │   └── ui/
│   │       ├── Button.jsx
│   │       ├── Input.jsx
│   │       └── Select.jsx
│   ├── data/
│   │   ├── resources.js
│   │   └── demoData.js
│   ├── hooks/
│   │   ├── useLocalStorage.js
│   │   └── useBookings.js
│   ├── utils/
│   │   ├── clashDetection.js
│   │   ├── validation.js
│   │   └── dateUtils.js
│   ├── styles/
│   │   ├── globals.css
│   │   └── components.css
│   ├── App.jsx
│   ├── index.js
│   └── constants.js
├── package.json
└── README.md
```

## Installation & Setup

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn

### Steps

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npm start
   ```

3. **Open your browser**
   Navigate to `http://localhost:3000`

## How to Use

### For Students

1. **Browse Resources**: View available facilities organized by type
2. **Select Resource**: Click on any resource to see details and availability
3. **Make Booking**: Fill out the booking form with date, time, and purpose
4. **View Bookings**: Track your booking status in "My Bookings"
5. **Cancel Bookings**: Cancel pending bookings if needed

### For Admins

1. **Switch Role**: Click "Switch to Admin" in the header
2. **Review Pending**: Check pending bookings in Admin Panel
3. **Approve/Reject**: Process booking requests with optional rejection reason
4. **View Statistics**: Monitor booking trends and approval rates
5. **Manage All Bookings**: Filter and search through all system bookings

## Key Concepts Explained

### Clash Detection Logic

The clash detection system prevents double bookings by:

1. **Time Range Overlap Check**: Compares new booking time with existing approved bookings
2. **Resource-Specific**: Only checks conflicts for the same resource
3. **Date-Specific**: Only checks conflicts for the same date
4. **Status-Based**: Only considers approved bookings for conflict detection

```javascript
// Core clash detection algorithm
const doTimeRangesOverlap = (start1, end1, start2, end2) => {
  const start1Minutes = timeToMinutes(start1);
  const end1Minutes = timeToMinutes(end1);
  const start2Minutes = timeToMinutes(start2);
  const end2Minutes = timeToMinutes(end2);
  
  return (start1Minutes < end2Minutes) && (start2Minutes < end1Minutes);
};
```

### Data Persistence

The application uses localStorage for data persistence:

- **Bookings**: All booking data stored in `campus_booker_bookings`
- **User Role**: Current role stored in `campus_booker_user_role`
- **Auto-sync**: Changes sync across browser tabs automatically

### Form Validation

Comprehensive validation includes:

- **Required Fields**: All mandatory fields must be filled
- **Date Validation**: Cannot book past dates
- **Time Validation**: End time must be after start time
- **Operating Hours**: Bookings must be within facility hours
- **Purpose Length**: Purpose must be 10-200 characters

## Important Viva Topics

### Technical Implementation
1. **React Hooks**: Custom hooks for localStorage and booking management
2. **State Management**: Component state vs localStorage persistence
3. **Event Handling**: Form submissions and user interactions
4. **Conditional Rendering**: Role-based UI components
5. **Responsive Design**: Mobile-first CSS Grid and Flexbox

### Algorithm & Logic
1. **Clash Detection**: Time overlap algorithm explanation
2. **Validation Logic**: Multi-layer form validation approach
3. **Data Filtering**: Client-side filtering and search implementation
4. **Role-Based Access**: Permission system design

### User Experience
1. **Error Handling**: User-friendly error messages
2. **Loading States**: Visual feedback during operations
3. **Notifications**: Success/error notification system
4. **Empty States**: Helpful messages when no data exists

## Browser Compatibility

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Development Notes

### Adding New Resources
Edit `src/data/resources.js` to add new facilities:

```javascript
{
  id: 9,
  name: 'New Facility',
  type: RESOURCE_TYPES.LAB,
  capacity: 40,
  description: 'Description here',
  equipment: ['Equipment list'],
  location: 'Building location',
  available: true,
  operatingHours: {
    start: '08:00',
    end: '18:00'
  }
}
```

### Customizing Time Slots
Modify `TIME_SLOTS` in `src/constants.js` to change available booking times.

### Styling Changes
All styles are in `src/styles/` directory with modular CSS architecture.

## Troubleshooting

### Common Issues

1. **Bookings not saving**: Check browser localStorage permissions
2. **Clash detection not working**: Verify time format is HH:MM
3. **Admin access denied**: Ensure role toggle is working
4. **Styles not loading**: Check CSS import paths

### Debug Mode
Open browser console to see detailed error messages and debug information.

## Future Enhancements

- [ ] User authentication system
- [ ] Email notifications for booking updates
- [ ] Recurring bookings feature
- [ ] Calendar view integration
- [ ] Resource availability calendar
- [ ] Advanced filtering options
- [ ] Export booking data
- [ ] Multi-language support

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is for educational purposes only.

---

**Happy Coding! 🚀**
