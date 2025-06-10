// components/auth/StudentRegisterForm.jsx
import React, { useState } from 'react';
import axios from '../../services/apiClient.js';

import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import StudentRegisterForm from '../../components/auth/StudentRegisterForm.jsx';

export default function StudentRegister() {
  const [name, setName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [level, setLevel] = useState('');
  const [department, setDepartment] = useState('');
  const [option, setOption] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!name || !rollNumber || !password || !level || !department) {
      toast.error('All fields are required');
      setLoading(false);
      return;
    }

    try {
      const res = await axios.post('/auth/register/student', { name, email: rollNumber, password, level, department, option,});
      localStorage.setItem('token', res.data.token);
      toast.success('Registration successful! Logging you in...', { autoClose: 1500 }); 
      setTimeout(() => {
        navigate('/login');
      }, 1600);
    } catch (err) {
      toast.error('Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <StudentRegisterForm
      handleSubmit={handleSubmit}
      name={name}
      setName={setName}
      rollNumber={rollNumber}
      setRollNumber={setRollNumber}
      password={password}
      setPassword={setPassword}
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      loading={loading}
      level={level}
      setLevel={setLevel}
      department={department}
      setDepartment={setDepartment}
      option={option}
      setOption={setOption}
    />
  );
}