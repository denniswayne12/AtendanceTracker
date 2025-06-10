import React, { useEffect, useState } from 'react';
import axios from '../../services/apiClient';

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get('/users/all');
        setUsers(res.data);
      } catch (err) {
        alert('Failed to load users');
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;

  return (
    <div className=" flex justify-center items-center flex-col">
      <h2 className="text-xl font-semibold mb-10">Manage Users</h2>
      <table className="min-w-full table-auto border-collapse rounded-xl  overflow-hidden">
        <thead>
          <tr className="bg-blue-400 py-4">
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Email / Roll Number</th>
            <th className="border px-4 py-2">Role</th>
            <th className="border px-4 py-2">Department</th>
            <th className="border px-4 py-2">Level</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-8 text-gray-500">
                No users found.
              </td>
            </tr>
          ) : (
            users.map(user => (
              <tr key={user._id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{user.name}</td>
                <td className="border px-4 py-2 flex items-center gap-4"> 
                    <div className = "w-10 h-10 rounded-full bg-red-500 flex items-center justify-center"></div> 
                    {user.email || user.rollNumber}
                </td>
                <td className="border px-4 py-2 capitalize">{user.role}</td>
                <td className="border px-4 py-2">{user.department || '-'}</td>
                <td className="border px-4 py-2">{user.level || '-'}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}