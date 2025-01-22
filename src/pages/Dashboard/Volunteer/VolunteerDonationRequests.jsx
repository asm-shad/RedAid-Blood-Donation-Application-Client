import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import axios from "axios";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import districtsData from "../../../assets/json/districts.json"; // Import districts JSON
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { toast } from "react-toastify";

const VolunteerDonationRequests = () => {
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [districts, setDistricts] = useState([]);
  const axiosSecure = useAxiosSecure();

  // Load districts on component mount
  useEffect(() => {
    setDistricts(districtsData);
  }, []);

  // Fetch all donation requests
  const {
    data: donationRequests,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["volunteerDonationRequests"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/donation-requests`
      );
      return data;
    },
  });

  // Handle status update
  const handleStatus = async (requestId) => {
    try {
      await axiosSecure.patch(`/donation-requests/status/${requestId}`);
      refetch();
      toast.success("Successfully updated request status!");
    } catch (error) {
      console.error(
        "Error updating status:",
        error.response?.data || error.message
      );
      toast.error("Failed to update request status.");
    }
  };

  if (isLoading) return <LoadingSpinner />;

  // Get district name by ID
  const getDistrictName = (districtId) => {
    if (!districtId) return "Unknown District";
    const district = districts.find((d) => d.id === districtId.toString());
    return district ? district.name : "Unknown District";
  };

  // Filtered Requests
  const filteredRequests =
    filter === "all"
      ? donationRequests
      : donationRequests.filter((request) => request.status === filter);

  // Pagination Logic
  const totalItems = filteredRequests?.length || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedRequests = filteredRequests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Page Title */}
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Volunteer Blood Donation Requests
      </h1>
      <p className="text-gray-600 italic mb-6">
        Manage blood donation requests responsibly and make a difference!
      </p>

      {/* Filter Section */}
      <div className="mb-4">
        <label htmlFor="filter" className="text-gray-700 font-semibold">
          Filter by Status:
        </label>
        <select
          id="filter"
          className="ml-2 border border-gray-300 rounded-md p-2"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="inprogress">In Progress</option>
          <option value="done">Done</option>
          <option value="canceled">Canceled</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white shadow-md rounded-md p-4">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm">
              <th className="py-2 px-4">Requester Name</th>
              <th className="py-2 px-4">Recipient Name</th>
              <th className="py-2 px-4">Location</th>
              <th className="py-2 px-4">Date</th>
              <th className="py-2 px-4">Time</th>
              <th className="py-2 px-4">Blood Group</th>
              <th className="py-2 px-4">Status</th>
              <th className="py-2 px-4">Update Status</th>
            </tr>
          </thead>
          <tbody>
            {paginatedRequests.map((request, idx) => (
              <tr
                key={idx}
                className="border-b text-gray-700 hover:bg-gray-100"
              >
                <td className="py-2 px-4">{request.requesterName}</td>
                <td className="py-2 px-4">{request.recipientName}</td>
                <td className="py-2 px-4">
                  {getDistrictName(request.recipientDistrict)},{" "}
                  {request.recipientUpazila}
                </td>
                <td className="py-2 px-4">{request.donationDate}</td>
                <td className="py-2 px-4">{request.donationTime}</td>
                <td className="py-2 px-4">{request.bloodGroup}</td>
                <td
                  className={`py-2 px-4 font-semibold ${
                    request.status === "pending"
                      ? "text-yellow-500"
                      : request.status === "inprogress"
                      ? "text-blue-500"
                      : request.status === "done"
                      ? "text-green-500"
                      : "text-red-500"
                  }`}
                >
                  {request.status}
                </td>
                <td className="border border-gray-300 py-2 px-4 space-x-2">
                  <div className="flex justify-center items-center">
                    {request.status === "pending" && (
                      <button
                        onClick={() => handleStatus(request._id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <FaTimesCircle size={20} />
                      </button>
                    )}
                    {request.status === "inprogress" && (
                      <button
                        onClick={() => handleStatus(request._id)}
                        className="text-green-500 hover:text-green-700"
                      >
                        <FaCheckCircle size={20} />
                      </button>
                    )}
                    {request.status === "done" && (
                      <span className="text-green-500">Completed</span>
                    )}
                    {request.status === "canceled" && (
                      <span className="text-red-500">Canceled</span>
                    )}
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

export default VolunteerDonationRequests;
