'use client';

import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  //Fetching data from the dummy API
  const fetchData = async () => {
    try {
      const response = await fetch("https://jsonplaceholder.typicode.com/users");
      const result = await response.json();
      setData(result);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setLoading(false);
    }
  };

  // useEffect to call the fetchData function
  useEffect(() => {
    fetchData();
  }, []);

  //Display loading message
  if(loading) {
    return <p>Loading data.....</p>
  }


  return (
    <div>
      <h1 className="ml-10 mt-10 text-2xl font-semibold">User Information</h1>

      <table className="mt-10 mx-auto border border-white text-center w-full">
        <thead>
          <tr className="border-b border-white">
          <th className="p-2 border-r border-white">ID</th>
            <th className="p-2 border-r border-white">Name</th>
            <th className="p-2 border-r border-white">Email</th>
            <th className="p-2 border-r border-white">Phone Number</th>
            <th className="p-2 border-r border-white">Website</th>
          </tr>
        </thead>

        <tbody>
          {data.map((user) => (
            <tr key={user.id} className="border-b border-white">
              <td className="p-2 border-r border-white">{user.id}</td>
              <td className="p-2 border-r border-white">{user.name}</td>
              <td className="p-2 border-r border-white">{user.email}</td>
              <td className="p-2 border-r border-white">{user.phone}</td>
              <td className="p-2 border-r border-white">{user.website}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
