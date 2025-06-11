import React, { useState } from 'react';
import { IoMdClose } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";

export default function Sidebar({ onNavigate, sidebarOpen, setSidebarOpen }) {
  const [open, setOpenState] = useState(false);

  // Allow parent to control sidebar state for hiding the sandbtn
  const setOpen = (val) => {
    setOpenState(val);
    if (setSidebarOpen) setSidebarOpen(val);
  };

  return (
    <>
      <button
        className={`md:hidden fixed top-4 left-4 z-40 bg-white rounded-full p-2 shadow transition ${open ? 'hidden' : ''}`}
        onClick={() => setOpen(true)}  aria-label="Open sidebar" >
        <RxHamburgerMenu />
      </button>

      {/* Sidebar */}
      <aside
          className={` bg-white shadow min-h-screen w-64 fixed top-0 left-0 z-30 transition-transform duration-200
            ${open ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:static md:block`}>
          <div className="p-6 text-xl font-bold flex justify-between items-center"> Student Panel
              <button className="md:hidden text-gray-500" onClick={() => setOpen(false)} aria-label="Close sidebar" >
                <IoMdClose />
              </button>
          </div>

          <nav className="mt-6 px-4 space-y-2">
              <button onClick={() => { setOpen(false); onNavigate('overview'); }} className="block w-full text-left px-3 py-2 hover:bg-blue-100 rounded-md">
                Overview
              </button>
              <button onClick={() => { setOpen(false); onNavigate('register-courses'); }} className="block w-full text-left px-3 py-2 hover:bg-blue-100 rounded-md">
                Register Courses
              </button>
              <button onClick={() => { setOpen(false); onNavigate('my-courses'); }} className="block w-full text-left px-3 py-2 hover:bg-blue-100 rounded-md">
                My Courses
              </button>
              <button onClick={() => { setOpen(false); onNavigate('attendance'); }} className="block w-full text-left px-3 py-2 hover:bg-blue-100 rounded-md">
                Attendance Records
              </button>
          </nav>
      </aside>

      {open && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-20 md:hidden" onClick={() => setOpen(false)} />
      )}
    </>
  );
}