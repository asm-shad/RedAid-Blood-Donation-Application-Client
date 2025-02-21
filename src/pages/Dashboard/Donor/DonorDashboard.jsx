import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaEdit,
  FaTrashAlt,
  FaEye,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa"; // React Icons for actions
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import DeleteModal from "../../Modal/DeleteModal";

const DonorDashboard = () => {
  const { user } = useAuth(); // Access user from AuthContext
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // Modal and deletion state
  const [isOpen, setIsOpen] = useState(false);
  const [deletingRequestId, setDeletingRequestId] = useState(null);

  const closeModal = () => setIsOpen(false);

  // Fetch recent donation requests
  const { data: recentRequests = [], refetch } = useQuery({
    queryKey: ["donationRequestRecent", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(
        `/my-donation-requests/${user?.email}?limit=3`
      );
      return data;
    },
  });

  // Handle view action
  const handleView = (id) => {
    navigate(`/donation-requests/${id}`);
  };

  // Handle edit action
  const handleEdit = (id) => {
    navigate(`/dashboard/donor/edit-donation-request/${id}`);
  };

  // Handle delete action
  const handleDelete = (id) => {
    setDeletingRequestId(id);
    setIsOpen(true);
  };

  const confirmDelete = async () => {
    if (!deletingRequestId) return;
    try {
      await axiosSecure.delete(`/donation-requests/${deletingRequestId}`);
      refetch(); // Refresh the data
      Swal.fire({
        icon: "success",
        title: "Deleted!",
        text: "The donation request has been deleted.",
        timer: 2000,
        showConfirmButton: false,
      });
      closeModal();
      setDeletingRequestId(null);
    } catch (error) {
      console.error("Error deleting donation request:", error);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Failed to delete the donation request.",
        timer: 2000,
        showConfirmButton: false,
      });
      closeModal();
    }
  };

  return (
    <div className="p-10">
      {/* Welcome Section with Motivational Quote */}
      <div className="bg-blue-100 p-6 rounded-lg shadow-md mb-6">
        <h1 className="text-3xl font-semibold text-blue-800 mb-2">
          Welcome, {user ? user.displayName : "Shad"}!
        </h1>
        <p className="text-blue-600 mb-4">
          "The best way to find yourself is to lose yourself in the service of
          others."
        </p>
      </div>

      {/* Recent Donation Requests */}
      {recentRequests.length > 0 && (
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-4">
            Recent Donation Requests
          </h2>
          <div className="overflow-x-auto bg-white shadow-md rounded-lg">
            <table className="w-full border-collapse table-auto text-sm">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2">Recipient Name</th>
                  <th className="border border-gray-300 p-2">Location</th>
                  <th className="border border-gray-300 p-2">Date</th>
                  <th className="border border-gray-300 p-2">Time</th>
                  <th className="border border-gray-300 p-2">Blood Group</th>
                  <th className="border border-gray-300 p-2">Status</th>
                  <th className="border border-gray-300 p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {recentRequests.map((request, index) => (
                  <tr
                    key={index}
                    className={`hover:bg-gray-50 ${
                      index % 2 === 0 ? "bg-gray-50" : "bg-white"
                    }`}
                  >
                    <td className="border border-gray-300 p-2">
                      {request.recipientName}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {request.hospitalName}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {request.donationDate}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {request.donationTime}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {request.bloodGroup}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {request.status}
                      {/* In-progress donation status shows action icons */}
                      {request.donationStatus === "inprogress" && (
                        <div className="flex space-x-2 mb-2">
                          <button className="text-green-600 p-2 rounded-full">
                            <FaCheckCircle />
                          </button>
                          <button className="text-red-600 p-2 rounded-full">
                            <FaTimesCircle />
                          </button>
                        </div>
                      )}
                    </td>
                    <td className="border border-gray-300 p-2">
                      <div className="flex space-x-2">
                        {/* Edit Button */}
                        <button
                          className="text-blue-600 hover:underline flex items-center"
                          onClick={() => handleEdit(request._id)}
                        >
                          <FaEdit />
                        </button>
                        {/* Delete Button */}
                        <button
                          className="text-red-600 hover:underline flex items-center"
                          onClick={() => handleDelete(request._id)}
                        >
                          <FaTrashAlt />
                        </button>
                        {/* View Button */}
                        <button
                          className="text-blue-600 hover:underline flex items-center"
                          onClick={() => handleView(request._id)}
                        >
                          <FaEye />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* View All Requests Button */}
      {recentRequests.length > 0 && (
        <div className="text-right mt-4">
          <Link
            to="/dashboard/donor/my-donation-requests"
            className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700"
          >
            View All Requests
          </Link>
        </div>
      )}

      {/* No Requests Message */}
      {recentRequests.length === 0 && (
        <p className="text-gray-600">You have no donation requests yet.</p>
      )}

      {/* Delete Confirmation Modal */}
      <DeleteModal
        isOpen={isOpen}
        closeModal={closeModal}
        onConfirm={confirmDelete}
      />
    </div>
  );
};

export default DonorDashboard;
