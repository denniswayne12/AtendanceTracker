import React from 'react';
import { IoSettingsSharp,IoBookOutline } from "react-icons/io5";
import { MdManageAccounts } from "react-icons/md";
import { TbFileAnalytics } from "react-icons/tb";


export default function Sidebar({ onNavigate }) {
  return (
    <aside className="w-64 bg-blue-500 shadow h-full text-white">
      <div className="p-2 text-xl font-bold ">Admin Panel</div>
      <nav className="mt-5 px-4 pt-10 space-y-2 border-t-2 border-blue-400">
        <button onClick={() => onNavigate('courses')} className="  w-full text-left px-3 py-2 hover:bg-blue-300 hover:text-black  rounded-md flex items-center gap-1">
          <IoBookOutline />
          Predefined Courses
        </button>
        <button onClick={() => onNavigate('users')} className="w-full text-left px-3 py-2 hover:bg-blue-300 hover:text-black rounded-md flex items-center gap-1">
          <MdManageAccounts />
          Manage Users
        </button>
        <button onClick={() => onNavigate('analytics')} className="w-full text-left px-3 py-2 hover:bg-blue-300 hover:text-black rounded-md flex items-center gap-1">
          <TbFileAnalytics />
          Analytics & Reports
        </button>
        <button onClick={() => onNavigate('settings')} 
            className="w-full text-left px-3 py-2 hover:bg-blue-300 hover:text-black rounded-md flex items-center gap-1">
            <IoSettingsSharp />Settings
        </button>
      </nav>
    </aside>
  );
}