import React from 'react';
import { IoQrCodeOutline } from "react-icons/io5";
import { TbFileAnalytics } from "react-icons/tb";
import { IoSettingsSharp,IoBookOutline } from "react-icons/io5";

export default function Sidebar({ onNavigate }) {
  return (
    <div className="w-64 bg-blue-500 shadow h-full text-white">
      <div className="p-2 text-xl font-bold">Attendance Tracker</div>
      <nav className="mt-5  px-4 pt-10 space-y-2 border-t-2 border-blue-400">

            <button onClick={() => onNavigate('courses')} className="flex items-center gap-1 w-full text-left  px-3 py-2 hover:bg-blue-300 hover:text-black rounded">
              <IoBookOutline />
              Courses
            </button>

            <button onClick={() => onNavigate('qrcode')} className="flex items-center gap-1 w-full text-left  px-3 py-2 hover:bg-blue-300 hover:text-black rounded">
              <IoQrCodeOutline />
              QR Code
            </button>

            <button onClick={() => onNavigate('statistics')} className="flex items-center gap-1 w-full text-left  px-3 py-2 hover:bg-blue-300 hover:text-black rounded">
              <TbFileAnalytics />
              Statistics
            </button>


            <button onClick={() => onNavigate('settings')} className="flex items-center gap-1 w-full text-left  px-3 py-2 hover:bg-blue-300 hover:text-black rounded">
               <IoSettingsSharp /> Settings
            </button>

      </nav>
    </div>
  );
}