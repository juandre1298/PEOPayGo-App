'use client';
import React, { useEffect, useState } from 'react';
import { User } from '../../service/dto';
import { getUsers } from '../../service/userService';

const Dashboard = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData: User[] = await getUsers(); // Pass your accessToken here
        setUsers(userData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="container mx-auto mt-24">
      <h1 className="text-2xl font-bold mb-4">Users</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Email</th>
            <th className="border px-4 py-2">First Name</th>
            <th className="border px-4 py-2">Last Name</th>
            <th className="border px-4 py-2">User Type</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="bg-gray-100">
              <td className="border px-4 py-2">{user.id}</td>
              <td className="border px-4 py-2">{user.email}</td>
              <td className="border px-4 py-2">{user.first_name}</td>
              <td className="border px-4 py-2">{user.last_name}</td>
              <td className="border px-4 py-2">{user.type}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dashboard;
