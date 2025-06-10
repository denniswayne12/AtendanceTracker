import React from 'react';
import { MdPerson, MdPassword, MdSchool, MdCategory } from "react-icons/md";
import { LuEyeClosed } from "react-icons/lu";
import { GiBleedingEye } from "react-icons/gi";


export default function StudentRegisterForm({ handleSubmit,name, setName,rollNumber,setRollNumber,password,setPassword, showPassword, setShowPassword, loading, level, setLevel, department, setDepartment, option, setOption }) {
  return ( 
  
  <form onSubmit={handleSubmit} className="bg-white rounded-2xl w-full max-w-[450px] p-6 sm:p-8 space-y-4 shadow-md">
          
          {/* Name Input */}
          <div className="border border-gray-200 rounded-xl h-12 flex items-center px-3 transition-all duration-200 focus-within:border-blue-500">
            <MdPerson size={20} />
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter your name" type="text" required className="ml-2 w-full h-full outline-none text-sm"
            />
          </div>
    
          {/* Roll Number Input */}
          <div className="border border-gray-200 rounded-xl h-12 flex items-center px-3 transition-all duration-200 focus-within:border-blue-500">
            <MdPerson size={20} />
            <input value={rollNumber} onChange={(e) => setRollNumber(e.target.value)} placeholder="Enter your roll number" type="text" required className="ml-2 w-full h-full outline-none text-sm"/>
          </div>
    
          {/* Password Input */}
          <div className="border border-gray-200 rounded-xl h-12 flex items-center px-3 transition-all duration-200 focus-within:border-blue-500">
    
              <MdPassword size={20} />
              <input value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" type={showPassword ? 'text' : 'password'} required className="ml-2 w-full h-full outline-none text-sm" />
    
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-xs text-blue-500 font-medium flex items-center justify-center ml-2">
                {showPassword ? <GiBleedingEye size={20} /> : <LuEyeClosed size={20} />}
              </button>
          </div>
            {/* Level */}
      <div className="border border-gray-200 rounded-xl h-12 flex items-center px-3 transition-all duration-200 focus-within:border-blue-500">
        <MdSchool size={20} />
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          required
          className="ml-2 w-full h-full outline-none text-sm bg-transparent appearance-none"
        >
          <option value="">Select Level</option>
          <option value="Level 200">Level 200 (1st Year)</option>
          <option value="Level 300">Level 300 (2nd Year)</option>
          <option value="Level 400">Level 400 (3rd Year)</option>
        </select>
      </div>

      {/* Department */}
      <div className="border border-gray-200 rounded-xl h-12 flex items-center px-3 transition-all duration-200 focus-within:border-blue-500">
        <MdSchool size={20} />
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          required
          className="ml-2 w-full h-full outline-none text-sm bg-transparent appearance-none"
        >
          <option value="">Select Department</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Electrical Engineering">Electrical Engineering</option>
          <option value="Mechanical Engineering">Mechanical Engineering</option>
          <option value="Civil Engineering">Civil Engineering</option>
          <option value="Business Administration">Business Administration</option>
          <option value="Law">Law</option>
          <option value="Medicine">Medicine</option>
          <option value="Others">Others</option>
        </select>
      </div>

      {/* Option / Program */}
      <div className="border border-gray-200 rounded-xl h-12 flex items-center px-3 transition-all duration-200 focus-within:border-blue-500">
        <MdCategory size={20} />
        <select value={option} onChange={(e) => setOption(e.target.value)} className="ml-2 w-full h-full outline-none text-sm bg-transparent appearance-none">
          <option value="">Select Option</option>
          <option value="Software Engineering">Software Engineering</option>
          <option value="Data Science">Data Science</option>
          <option value="Cyber Security">Cyber Security</option>
          <option value="Networking">Networking</option>
          <option value="Web Development">Web Development</option>
          <option value="General Studies">General Studies</option>
          <option value="Others">Others</option>
        </select>
      </div>   
          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`mt-2 bg-black text-white font-medium text-base w-full h-12 rounded-xl hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center ${loading ? 'opacity-80 cursor-not-allowed' : ''}`}
          >
            {loading ? (
              <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
            ) : (
              'Register'
            )}
          </button>
    
          {/* Sign In Link */}
          <p className="text-center text-sm text-gray-700 mt-2">
            Already have an account?{' '}
            <a href="/login" className="text-blue-500 font-medium hover:underline">
              Sign In
            </a>
          </p>
        </form>
  )
}
