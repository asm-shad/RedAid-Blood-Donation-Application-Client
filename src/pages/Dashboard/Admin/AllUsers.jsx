import React, { useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import useAuth from "../../../hooks/useAuth";
import UpdateUserModal from "../../Modal/UpdateUserModal";
import StatusUpdateModal from "../../Modal/StatusUpdateModal";
import { toast } from "react-toastify";

const AllUsers = () => {
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isStatusModalOpen, setIsStatusModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(`/all-users/${user?.email}`);
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  const openRoleModal = (user) => {
    setSelectedUser(user);
    setIsRoleModalOpen(true);
  };

  const openStatusModal = (user) => {
    setSelectedUser(user);
    setIsStatusModalOpen(true);
  };

  const updateRole = async (newRole) => {
    if (selectedUser.role === newRole) return;
    try {
      await axiosSecure.patch(`/user/role/${selectedUser.email}`, {
        role: newRole,
      });
      toast.success("Role updated successfully!");
      refetch();
    } catch (err) {
      toast.error(err?.response?.data || "Failed to update role");
    } finally {
      setIsRoleModalOpen(false);
    }
  };

  const updateStatus = async (newStatus) => {
    try {
      await axiosSecure.patch(`/user/status/${selectedUser.email}`, {
        status: newStatus,
      });
      toast.success(
        `User ${
          newStatus === "blocked" ? "blocked" : "unblocked"
        } successfully!`
      );
      refetch();
    } catch (err) {
      toast.error(err?.response?.data || "Failed to update status");
    } finally {
      setIsStatusModalOpen(false);
    }
  };

  const filteredUsers =
    filter === "all" ? users : users.filter((user) => user.status === filter);

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
      <h1 className="text-3xl font-bold text-gray-800 mb-4">All Users</h1>
      <p className="text-gray-600 italic mb-6">
        "Leadership is not about being in charge. It is about taking care of
        those in your charge." – Simon Sinek
      </p>

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
            {paginatedUsers.map((user, idx) => (
              <tr
                key={idx}
                className="border-b text-gray-700 hover:bg-gray-100 text-center"
              >
                <td className="py-2 px-4 flex items-center justify-center">
                  <img
                    src={user.image}
                    alt={user.name}
                    className="w-10 h-10 rounded-full"
                  />
                </td>
                <td className="py-2 px-4">{user.name}</td>
                <td className="py-2 px-4">{user.email}</td>
                <td className="py-2 px-4 capitalize">{user.role}</td>
                <td
                  className={`py-2 px-4 font-semibold capitalize cursor-pointer ${
                    user.status === "active" ? "text-green-500" : "text-red-500"
                  }`}
                  onClick={() => openStatusModal(user)}
                >
                  {user.status}
                </td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => openRoleModal(user)}
                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    Update Role
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

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

      {/* Role Update Modal */}
      {selectedUser && (
        <UpdateUserModal
          isOpen={isRoleModalOpen}
          setIsOpen={setIsRoleModalOpen}
          role={selectedUser.role}
          updateRole={updateRole}
        />
      )}

      {/* Status Update Modal */}
      {selectedUser && (
        <StatusUpdateModal
          isOpen={isStatusModalOpen}
          setIsOpen={setIsStatusModalOpen}
          user={selectedUser.status}
          updateStatus={updateStatus}
        />
      )}
    </div>
  );
};

export default AllUsers;
