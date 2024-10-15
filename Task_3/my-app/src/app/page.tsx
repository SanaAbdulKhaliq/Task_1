'use client'
import React, { useEffect, useState } from "react";

const App = () => {
  const [data, setData] = useState([]); // Initialize data as an empty array
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(10); // Number of posts per page

  // Function to fetch data from the API
  const fetchData = async () => {
    try {
      const response = await fetch("https://dummyjson.com/posts");
      const result = await response.json();
      setData(result.posts); // Ensure you're setting the posts array
      setLoading(false);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setLoading(false);
    }
  };

  // Call fetchData when the component mounts
  useEffect(() => {
    fetchData();
  }, []);

  // Filter data based on search term
  const filteredData = data.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get current posts for pagination
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredData.slice(indexOfFirstPost, indexOfLastPost);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <p>Loading data...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Posts Table</h1>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by title..."
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full mb-4 p-2 border border-gray-300 text-black rounded shadow-sm focus:outline-none focus:border-blue-500"
      />

      {/* Table */}
      <table className="min-w-full bg-white border border-gray-200 shadow-lg text-black">
        <thead>
          <tr className="bg-gray-100 border-b">
            <th className="px-4 py-2 text-left">ID</th>
            <th className="px-4 py-2 text-left">Title</th>
            <th className="px-4 py-2 text-left">Body</th>
          </tr>
        </thead>
        <tbody>
          {currentPosts.map((post) => (
            <tr key={post.id} className="border-b hover:bg-gray-50">
              <td className="px-4 py-2">{post.id}</td>
              <td className="px-4 py-2">{post.title}</td>
              <td className="px-4 py-2">{post.body}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: Math.ceil(filteredData.length / postsPerPage) }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`px-3 py-1 mx-1 border rounded ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-white text-blue-500 border-blue-500"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default App;
