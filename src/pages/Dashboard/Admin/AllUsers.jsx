import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { FiMoreVertical } from "react-icons/fi";

const AllUsers = () => {
  const [users, setUsers] = useState([]); // Store user data
  const [filter, setFilter] = useState("all"); // Status filter
  const [currentPage, setCurrentPage] = useState(1); // Pagination
  const itemsPerPage = 5; // Rows per page

  // Fetch users data (replace with actual API call later)
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch("/api/users");
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        console.error("Error fetching users:", err);
      }
    };

    fetchUsers();
  }, []);

  // Handle user actions (Block, Unblock, Change Role)
  const handleAction = async (userId, action) => {
    try {
      // API request to update user status or role
      const response = await fetch(`/api/users/${userId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ action }),
      });

      if (!response.ok) {
        throw new Error("Failed to update user.");
      }

      // Update local state to reflect changes
      const updatedUsers = users.map((user) =>
        user.id === userId
          ? {
              ...user,
              status:
                action === "block"
                  ? "blocked"
                  : action === "unblock"
                  ? "active"
                  : user.status,
              role:
                action === "make_volunteer"
                  ? "volunteer"
                  : action === "make_admin"
                  ? "admin"
                  : user.role,
            }
          : user
      );
      setUsers(updatedUsers);

      Swal.fire("Success", "User updated successfully!", "success");
    } catch (err) {
      console.error("Error updating user:", err);
      Swal.fire("Error", "Failed to update user.", "error");
    }
  };

  // Filtered users based on status
  const filteredUsers =
    filter === "all" ? users : users.filter((user) => user.status === filter);

  // Pagination Logic
  const totalItems = filteredUsers.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-4">All Users</h1>
      <p className="text-gray-600 italic mb-6">
        "Leadership is not about being in charge. It is about taking care of
        those in your charge." – Simon Sinek
      </p>

      {/* Filter Section */}
      <div className="mb-4 flex justify-between items-center">
        <label htmlFor="filter" className="font-semibold text-gray-700">
          Filter by Status:
        </label>
        <select
          id="filter"
          className="border border-gray-300 rounded-md p-2"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="active">Active</option>
          <option value="blocked">Blocked</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-md p-4">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm">
              <th className="py-2 px-4">Avatar</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Email</th>
              <th className="py-2 px-4">Role</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.map((user) => (
              <tr
                key={user.id}
                className="border-b text-gray-700 hover:bg-gray-100"
              >
                <td className="py-2 px-4">
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td className="py-2 px-4">{user.name}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4 capitalize">{user.role}</td>
                <td
                  className={`py-2 px-4 font-semibold capitalize ${
                    user.status === "active" ? "text-green-500" : "text-red-500"
                  }`}
                >
                  {user.status}
                </td>
                <td className="py-2 px-4">
                  <div className="relative">
                    <button
                      className="text-gray-700 hover:text-gray-900 focus:outline-none"
                      onClick={() => {
                        // Show dropdown menu
                      }}
                    >
                      <FiMoreVertical />
                    </button>
                    {/* Dropdown Menu */}
                    <div className="absolute right-0 mt-2 bg-white shadow-md rounded-md w-48">
                      {user.status === "active" && (
                        <button
                          className="block px-4 py-2 text-left w-full hover:bg-gray-100"
                          onClick={() => handleAction(user.id, "block")}
                        >
                          Block
                        </button>
                      )}
                      {user.status === "blocked" && (
                        <button
                          className="block px-4 py-2 text-left w-full hover:bg-gray-100"
                          onClick={() => handleAction(user.id, "unblock")}
                        >
                          Unblock
                        </button>
                      )}
                      <button
                        className="block px-4 py-2 text-left w-full hover:bg-gray-100"
                        onClick={() => handleAction(user.id, "make_volunteer")}
                      >
                        Make Volunteer
                      </button>
                      <button
                        className="block px-4 py-2 text-left w-full hover:bg-gray-100"
                        onClick={() => handleAction(user.id, "make_admin")}
                      >
                        Make Admin
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`mx-1 px-4 py-2 rounded-md ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default AllUsers;
