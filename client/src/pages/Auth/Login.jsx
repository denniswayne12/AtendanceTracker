import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import LoginForm from '../../components/auth/LoginForm';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

     if (!email || !password) {
      toast.error('Email and password are required');
      setLoading(false);
      return;
    }
    try{
          const res = await axios.post('http://localhost:5000/api/auth/login', {email,password,});
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('user', JSON.stringify(res.data.user));

        if (res.data.user.role === 'admin') {
              toast.success('Logged in as Admin!', { autoClose: 1500 });
              setTimeout(() => navigate('/admin'), 1600);

        }else if (res.data.user.role === 'student') {
              toast.success('Logged in as Student!', { autoClose: 1500 });
              setTimeout(() => navigate('/studentdashboard'), 1600);
        }else {
              toast.success('Logged in as Lecturer!', { autoClose: 1500 });
             
              setTimeout(() => navigate('/lecturer'), 1600);
              
            }
  }catch (err) {
              toast.error('Login failed. Check your credentials.');
  } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-800">
        <LoginForm
        handleSubmit={handleSubmit}
        setEmail={setEmail}
        setPassword={setPassword}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        loading={loading}
      />

    </div>
  );
}