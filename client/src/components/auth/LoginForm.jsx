import React from 'react';
import { Link } from "react-router-dom";
import { MdPassword, MdMarkEmailUnread } from "react-icons/md";
import { GiBleedingEye } from "react-icons/gi";
import { LuEyeClosed } from "react-icons/lu";

export default function LoginForm({
  handleSubmit,
  setEmail,
  setPassword,
  showPassword,
  setShowPassword,
  error,
  loading,
}) {

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl w-full max-w-[450px] p-6 sm:p-8 space-y-4 shadow-md" >


      {/* Email Input Field */}
      <div className="text-gray-700 font-semibold">Email or Roll Number</div>
      <div className="border border-gray-200 rounded-xl h-12 flex items-center px-3 transition-all duration-200 focus-within:border-blue-500">
        <MdMarkEmailUnread size={20} />
        <input onChange={(e) => setEmail(e.target.value)} placeholder="Matricle / Email" type="text" required autoComplete="UserName" className="ml-2 w-full h-full outline-none text-sm"/>
      </div>


      {/* Password Input Field with Toggle */}
      <div className="text-gray-700 font-semibold">Password</div>
      <div className="border border-gray-200 rounded-xl h-12 flex items-center px-3 transition-all duration-200 focus-within:border-blue-500">
        <MdPassword size={20} />
        <input onChange={(e) => setPassword(e.target.value)} placeholder="Enter your Password" type={showPassword ? 'text' : 'password'} required autoComplete="current-password" className="ml-2 w-full h-full outline-none text-sm"/>
        <button type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-xs text-blue-500 font-medium flex items-center justify-center ml-2" >
            {showPassword ? <GiBleedingEye size={20} /> : <LuEyeClosed size={20} />}
        </button>
      </div>

      {/*___________________ Inline Error Message ___________________ */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/*------------------------- Remember Me & Forgot Password -------------------------*/}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
        <label className="flex items-center gap-1 text-sm text-gray-700 font-normal">
            <input type="checkbox" />Remember me
        </label>
        <a href="/forgot-password" className="text-sm text-blue-500 font-medium hover:underline">
          Forgot password?
        </a>
      </div>

      {/*___________________ Submit Button with Loading Spinner ___________________*/}
      <button type="submit" disabled={loading}
            className={`mt-2 bg-black text-white font-medium text-base w-full h-12 rounded-xl hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center
                ${loading ? 'opacity-80 cursor-not-allowed' : ''}`} >
            {loading ? (
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>) : ('Sign In')}
     </button>

      {/* ___________________ Sign Up Link ___________________ */}
        <p className="text-center text-sm text-gray-700 mt-2">
                Don't have an account?{' '}
                <Link to="/register" className="text-blue-500 font-medium hover:underline">
                    Sign Up
                </Link>
        </p>
    </form>
);
}