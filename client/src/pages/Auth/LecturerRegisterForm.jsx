import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import RegisterForm from '../../components/auth/RegistrationForm';

export default function LecturerRegisterForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [role, setRole] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!name || !email || !password || !confirmPassword || !role) {
      toast.error('All fields are required');
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        name,
        email,
        password,
        role,
      });

      toast.success('Registration successful!');
      // Op redirect user after delay
      setTimeout(() => {
        window.location.href = '/login'; // Or use navigate('/login')
      }, 1500);

    } catch (err) {
      toast.error('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
           <RegisterForm
              handleSubmit={handleSubmit}
              setName={setName}
              setEmail={setEmail}
              setPassword={setPassword}
              setConfirmPassword={setConfirmPassword}
              setRole={setRole}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              loading={loading}
            />
  )
}
