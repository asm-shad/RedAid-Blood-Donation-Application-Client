import { useQuery } from "@tanstack/react-query";
import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import axios from "axios";
import { Link } from "react-router-dom";
import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";
import districtsData from "../../../assets/json/districts.json"; // Import districts JSON

const AllDonationRequests = () => {
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [districts, setDistricts] = useState([]);

  // Load districts on component mount
  useEffect(() => {
    setDistricts(districtsData);
  }, []);

  // Fetch all donation requests
  const { data: donationRequests, isLoading } = useQuery({
    queryKey: ["redLifeAid"],
    queryFn: async () => {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/donation-requests`
      );
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  // Handle status updates
  const handleStatusChange = async (id, status) => {
    try {
      const response = await fetch(`/api/donation-requests/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status }),
      });

      if (!response.ok) {
        throw new Error("Failed to update donation request.");
      }

      Swal.fire("Success", `Request marked as ${status}!`, "success");
    } catch (err) {
      console.error("Error updating donation request:", err);
      Swal.fire("Error", "Failed to update donation request.", "error");
    }
  };

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
        All Blood Donation Requests
      </h1>
      <p className="text-gray-600 italic mb-6">
        "The purpose of life is not to be happy. It is to be useful, to be
        honorable, to be compassionate, to have it make some difference that you
        have lived and lived well." – Ralph Waldo Emerson
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
              <th className="py-2 px-4">Actions</th>
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
                <td className="border border-gray-300 p-2 space-x-2">
                  {/* Edit, Delete, and View Icons */}
                  <div className="flex space-x-2">
                    <Link
                      to={`/dashboard/donor/edit-donation-request/${request._id}`}
                      className="text-blue-600 hover:underline flex items-center"
                    >
                      <FaEdit />
                    </Link>
                    <button
                      className="text-red-600 hover:underline flex items-center"
                      onClick={() => Swal.fire("Delete action coming soon!")}
                    >
                      <FaTrashAlt />
                    </button>
                    <Link
                      to={`/dashboard/donor/donation-request-details/${request.id}`}
                      className="text-blue-600 hover:underline flex items-center"
                    >
                      <FaEye />
                    </Link>
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

export default AllDonationRequests;
