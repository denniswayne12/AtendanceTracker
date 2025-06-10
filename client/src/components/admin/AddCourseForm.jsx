import React, { useState } from "react";
import axios from "../../services/apiClient.js";

export default function AddCourseForm({ onClose }) {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [department, setDepartment] = useState("");
  const [level, setLevel] = useState("");
  const [semester, setSemester] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/courses/predefined", {
        name,
        code,
        department,
        level,
        semester,
      });
      alert("Course created successfully!");
    } catch (err) {
      alert(err.response?.data?.error || "Failed to create course");
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 flex justify-center items-center min-h-screen bg-black bg-opacity-40 z-50">
      <form onSubmit={handleSubmit}  className="bg-white p-6 rounded shadow-md z-50 relative w-full max-w-md" >
        {/* Close Button */}
        <button type="button" onClick={onClose} className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl font-bold" aria-label="Close" >
            &times;
        </button>
        <h2 className="text-xl font-bold mb-4">Add New Course</h2>

        {/*___________________  course Name___________________ */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Course Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g., Programming I"
            required
            className="border w-full p-2 rounded"
          />
        </div>

        {/*___________________  course Code ___________________ */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Course Code</label>
          <input
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            placeholder="e.g., CEC200"
            required
            className="border w-full p-2 rounded"
          />
        </div>

        {/*___________________  Department ___________________ */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Department</label>
          <select
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
            className="border w-full p-2 rounded"
          >
            <option value="">Select Department</option>
            <option value="Computer Engineering">Computer Engineering</option>
            <option value="Mechanical Engineering">Mechanical Engineering</option>
            <option value="Civil Engineering">Civil Engineering</option>
            <option value="Electrical Engineering">Electrical Engineering</option>
          </select>
        </div>

        {/* ___________________  Level  ___________________ */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Level</label>
          <select
            value={level}
            onChange={(e) => setLevel(e.target.value)}
            required
            className="border w-full p-2 rounded"
          >
            <option value="">Select Level</option>
            <option value="Level 200">Level 200</option>
            <option value="Level 300">Level 300</option>
            <option value="Level 400">Level 400</option>
          </select>
        </div>

        {/* ___________________  Semester  ___________________ */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Semester</label>
          <select
            value={semester}
            onChange={(e) => setSemester(e.target.value)}
            required
            className="border w-full p-2 rounded"
          >
            <option value="">Select Semester</option>
            <option value="First Semester">First Semester</option>
            <option value="Second Semester">Second Semester</option>
          </select>
        </div>

        {/* ___________________  Submit Button ___________________  */}
        <button  type="submit" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition" >
            Add Course
        </button>
      </form>
    </div>
  );
}
