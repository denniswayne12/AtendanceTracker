import React from 'react';
import { MdPerson, MdMarkEmailUnread, MdPassword } from "react-icons/md";
import { GiBleedingEye } from "react-icons/gi";
import { LuEyeClosed } from "react-icons/lu";
import { Link } from "react-router-dom";

export default function RegisterForm({ handleSubmit, setName, setEmail, setPassword, setConfirmPassword, setRole, showPassword, setShowPassword, loading,}) {
        return (
                <form onSubmit={handleSubmit} className="bg-white rounded-2xl w-full max-w-[450px] p-6 sm:p-8 space-y-4 shadow-md" > 
                        {/* <h2 className="text-xl font-semibold text-center">Register</h2> */}

                        <div className="border border-gray-200 rounded-xl h-12 flex items-center px-3 transition-all duration-200 focus-within:border-blue-500">
                                <MdPerson size={20} />
                                <input onChange={(e) => setName(e.target.value)} placeholder="Enter your name" type="text" required className="ml-2 w-full h-full outline-none text-sm"/>
                        </div>

                        <div className="border border-gray-200 rounded-xl h-12 flex items-center px-3 transition-all duration-200 focus-within:border-blue-500">
                                <MdMarkEmailUnread size={20} />
                                <input onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" type="email" required className="ml-2 w-full h-full outline-none text-sm" />
                        </div>

                        <div className="border border-gray-200 rounded-xl h-12 flex items-center px-3 transition-all duration-200 focus-within:border-blue-500">
                                <MdPassword size={20} />
                                <input onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" type={showPassword ? 'text' : 'password'} required className="ml-2 w-full h-full outline-none text-sm" />
                                <button type="button" onClick={() => setShowPassword(!showPassword)}
                                className="text-xs text-blue-500 font-medium flex items-center justify-center ml-2">
                                {showPassword ? <GiBleedingEye size={20} /> : <LuEyeClosed size={20} />}
                                </button>
                        </div>

                        {/* Confirm Password Input */}
                        <div className="border border-gray-200 rounded-xl h-12 flex items-center px-3 transition-all duration-200 focus-within:border-blue-500">
                                <MdPassword size={20} />
                                <input onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirm your password" type={showPassword ? 'text' : 'password'} required className="ml-2 w-full h-full outline-none text-sm" />
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-xs text-blue-500 font-medium flex items-center justify-center ml-2">
                                {showPassword ? <GiBleedingEye size={20} /> : <LuEyeClosed size={20} />}
                                </button>
                        </div>

                        {/* Role Selector */}
                        <div className="text-gray-700 font-semibold">I am a:</div>
                        <div className="border border-gray-200 rounded-xl h-12 flex items-center px-3">
                                <select onChange={(e) => setRole(e.target.value)} required className="w-full h-full outline-none text-sm bg-transparent appearance-none">
                                        <option value="">Select role</option>
                                        <option value="lecturer">Lecturer</option>
                                        <option value="admin">Admin</option>
                                </select>
                        </div>

                        {/* ______________________________  Submit Button______________________________  */}
                        <button type="submit" disabled={loading}
                                className={`mt-2 bg-black text-white font-medium text-base w-full h-12 rounded-xl hover:bg-gray-800 transition-colors duration-200 flex items-center justify-center ${   loading ? 'opacity-80 cursor-not-allowed' : '' }`} >
                                {loading ? (
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" >
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" ></circle>
                                        <path className="opacity-75" fill="currentColor"
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>) : ('Register')}
                        </button>

                        {/*______________________________  Sign In Link______________________________  */}
                        <p className="text-center text-sm text-gray-700 mt-2">
                                Already have an account?{' '}
                                <Link to="/login" className="text-blue-500 font-medium hover:underline">
                                        Sign In
                                </Link>
                        </p>
                </form>
);
}