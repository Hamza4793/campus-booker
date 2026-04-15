# CampusBooker

CampusBooker is a React-based campus facility booking web app built for students and admins. It lets users browse campus resources, request bookings, detect time-slot clashes, review booking history, and manage approvals using browser `localStorage`.

## Overview

This project is frontend only. There is no backend or database server. All booking and role data is stored in the browser, which makes the app simple to run and suitable for academic demos, mini-projects, and viva presentations.

### Student flow
- Browse available labs, libraries, auditoriums, and sports halls
- Select a resource and submit a booking request
- Enter name, date, time, and purpose
- Avoid overlapping bookings through clash detection
- View personal bookings and cancel pending requests

### Admin flow
- Switch role from student to admin
- Review pending booking requests
- Approve or reject requests
- View all bookings with filters
- Track booking statistics

## Features

- Resource listing with grouped facility cards
- Booking form with validation
- Student name input during booking
- Clash detection for overlapping time slots
- Booking status flow: `pending`, `approved`, `rejected`
- Admin approval and rejection panel
- Booking filters by resource, date, and status
- Demo data for quick testing
- Persistent data using `localStorage`
- Responsive UI for desktop and mobile

## Tech Stack

- React 18
- React Scripts 5
- CSS
- Browser `localStorage`

## Project Structure

```text
src/
  components/
    admin/
      AdminPanel.jsx
      PendingBookings.jsx
    bookings/
      BookingCard.jsx
      BookingForm.jsx
      BookingList.jsx
    common/
      Header.jsx
      Layout.jsx
      Card.jsx
    resources/
      ResourceCard.jsx
      ResourceList.jsx
    ui/
      Button.jsx
      Input.jsx
      Select.jsx
  data/
    demoData.js
    resources.js
  hooks/
    useBookings.js
    useLocalStorage.js
  styles/
    components.css
    globals.css
  utils/
    clashDetection.js
    dateUtils.js
    validation.js
  App.jsx
  constants.js
  index.js
```

## Getting Started

### Prerequisites

- Node.js 14+
- npm

### Run locally

```bash
npm install
npm start
```

Then open:

```text
http://localhost:3000
```

If port `3000` is already busy, React may offer another port such as `3001`.

### Production build

```bash
npm run build
```

## How It Works

### 1. Resource module

Resources are defined in [src/data/resources.js](/Users/cil/CascadeProjects/2048/src/data/resources.js). Each resource contains:

- name
- type
- capacity
- location
- equipment
- operating hours

These are displayed as cards grouped by facility type.

### 2. Booking system

The booking form collects:

- student name
- resource
- date
- start time
- end time
- purpose

Booking requests are initially saved with `pending` status.

### 3. Validation

Validation is handled in [src/utils/validation.js](/Users/cil/CascadeProjects/2048/src/utils/validation.js).

It checks:

- required fields
- valid future date
- valid start and end time order
- minimum name length
- purpose length

### 4. Clash detection

Clash detection is handled in [src/utils/clashDetection.js](/Users/cil/CascadeProjects/2048/src/utils/clashDetection.js).

Two bookings overlap when:

```js
newStart < existingEnd && newEnd > existingStart
```

A clash is checked only when:

- the resource is the same
- the date is the same
- the existing booking is not rejected

This prevents double booking for the same facility and time range.

### 5. Admin review

Admins can:

- see pending requests
- approve bookings
- reject bookings with a reason
- review all bookings
- view booking statistics

### 6. Data persistence

The app stores data in browser `localStorage`:

- `campus_booker_bookings`
- `campus_booker_user_role`

This means refreshes do not remove booking data unless browser storage is cleared.

## Important Viva Points

- This is a frontend-only project, so role switching is for demo purposes only.
- `localStorage` is used instead of a backend database.
- Clash detection is based on overlapping time intervals.
- Booking status supports an approval workflow.
- React state updates the UI immediately when bookings change.
- Filtering is done on the client side using array methods.

## Demo Notes

- The project includes demo bookings for quick testing.
- Demo dates are set into the future so the app works during presentation.
- You can switch between student and admin using the header button.

## Limitations

- No real authentication
- No backend API
- No multi-user synchronization across different browsers/devices
- Data is limited to the current browser storage

## Future Improvements

- Add login/authentication
- Add backend and database support
- Add calendar view
- Add email notifications
- Add recurring bookings
- Add export or report generation

## Repository

GitHub repository:

`https://github.com/Hamza4793/campus-booker`

## License

This project is intended for educational use.
