import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Auth/Login.jsx';
import Register from './pages/Auth/Register.jsx';
import PageNotfound404 from './pages/Notfound.jsx';
import ProtectedRoute from './utils/PrivateRoute.jsx';

import AdminDashboard from './pages/Admin/Dashboard.jsx';
import LecturerDashboard from '././pages/Lecturer/Dashboard.jsx';
import StudentDashboard from './pages/student/Dashboard.jsx';
import CourseDetailPage from './components/lecturer/course/CourseDetailPage.jsx';

/* 
import QRCodeGenerator from './shared/QRCodeGenerator.jsx';
import Statistics from './components/lecturer/Statistics.jsx'; */

import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <Router>
        <Routes>
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Course-specific detail page with tab (attendance, students, reports) */}
              <Route path="/lecturer/course/:courseId/:tab?" element={<ProtectedRoute allowedRoles={['lecturer']}>  <CourseDetailPage /></ProtectedRoute>} />

               {/*  <Route path="/register/student" element={<StudentRegister />} /> */}

              <Route path="/admin" element={<ProtectedRoute allowedRoles={['admin']}>  <AdminDashboard /></ProtectedRoute> } />
              <Route path="/lecturer" element={<ProtectedRoute allowedRoles={['lecturer']}>  <LecturerDashboard /></ProtectedRoute> } />
              <Route path="/studentdashboard" element={  <ProtectedRoute allowedRoles={['student']}>   <StudentDashboard /> </ProtectedRoute>  } />
              <Route path="*" element={<PageNotfound404 />} />
        </Routes>
      </Router>
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} theme="colored" />
    </>
  );
}

export default App;