'use client';

import { useState } from "react";
import users from '../public/users.json';

export default function Page() {
  const [userData] = useState(users);


  return (
    <div>
      <h1 className="ml-10 mt-10 text-2xl font-semibold">User Information</h1>

      <table className="mt-10 ml-10 border border-white text-center w-1/2">
        <thead>
          <tr className="border-b border-white">
            <th className="p-2 border-r border-white">Name</th>
            <th className="p-2 border-r border-white">Email</th>
            <th className="p-2 border-r border-white">Phone Number</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user, index) => (
            <tr key={index} className="border-b border-white">
              <td className="p-2 border-r border-white">{user.name}</td>
              <td className="p-2 border-r border-white">{user.email}</td>
              <td className="p-2 border-r border-white">{user.phone}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
