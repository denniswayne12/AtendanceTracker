# Student Attendance Tracker

A modern web application for tracking student attendance, built with React, Node.js, Express, and MongoDB.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
- [Project Structure](#project-structure)
- [Environment Variables](#environment-variables)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

---

## Features

- **User Authentication:** Secure login and registration for students, lecturers, and admins.
- **Role-Based Access:** Different dashboards and permissions for each user type.
- **Attendance Management:** Lecturers can generate QR codes for sessions; students scan to mark attendance.
- **Course Management:** Admins and lecturers can manage courses and view attendance statistics.
- **Responsive UI:** Clean, mobile-friendly interface using Tailwind CSS.
- **Notifications:** Real-time feedback using React Toastify.

## Tech Stack

- **Frontend:** React, React Router, React Icons, Tailwind CSS, Axios, React Toastify
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, BcryptJS, Helmet, Morgan, CORS, Dotenv
- **Other:** QuickChart.io for QR code generation

## Screenshots

<!-- Add screenshots of login, dashboard, QR code, etc. here -->

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm (v9+ recommended)
- MongoDB (local or cloud)

### Installation

#### 1. Clone the repository

```bash
git clone https://github.com/yourusername/attendanceTracker.git
cd attendanceTracker
```

#### 2. Install dependencies

Install client dependencies:

```bash
cd client
npm install
```

Install server dependencies:

```bash
cd ../server
npm install
```

### Running the App

#### 1. Start the backend server

```bash
cd server
npm start
```

The backend will run on [http://localhost:5000](http://localhost:5000).

#### 2. Start the frontend

```bash
cd ../client
npm start
```

The frontend will run on [http://localhost:3000](http://localhost:3000).

## Project Structure

```
attendanceTracker/
├── client/         # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── utils/
│   │   └── App.js
│   └── package.json
├── server/         # Node.js backend
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middleware/
│   └── index.js
└── README.md
```

## Environment Variables

Create a `.env` file in both `client` and `server` directories as needed.

**Example for `server/.env`:**
```
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

**Example for `client/.env`:**
```
REACT_APP_API_URL=http://localhost:5000
```

## Usage

- Register as a student, lecturer, or admin.
- Lecturers can create courses and generate QR codes for attendance.
- Students scan QR codes to mark attendance.
- Admins can manage users and view reports.

## Contributing

Contributions are welcome! Please open issues or submit pull requests.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License.

---
