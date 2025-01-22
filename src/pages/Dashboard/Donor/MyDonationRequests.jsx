import React, { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

const MyDonationRequests = () => {
  const { user } = useAuth();
  const [filter, setFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const axiosSecure = useAxiosSecure();

  const {
    data: requestDetails = [],
    isLoading: isLoadingRequest,
    refetch,
  } = useQuery({
    queryKey: ["donationRequest", user?.email],
    queryFn: async () => {
      const { data } = await axiosSecure(
        `/my-donation-requests/${user?.email}`
      );
      return data;
    },
  });

  const handleStatus = async (requestId) => {
    try {
      console.log("Updating status for request ID:", requestId);
      const { data } = await axiosSecure.patch(
        `/donation-requests/status/${requestId}`
      );
      refetch();
      toast.success("Successfully Request Status Changed");
    } catch (error) {
      console.error(
        "Error updating status:",
        error.response?.data || error.message
      );
      toast.error("Request Status Change Failed");
    }
  };

  if (isLoadingRequest) return <LoadingSpinner />;

  const filteredRequests =
    filter === "all"
      ? requestDetails
      : requestDetails.filter((request) => request.status === filter);

  const totalItems = filteredRequests.length;
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
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        My Donation Requests
      </h1>

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

      <div className="overflow-x-auto bg-white shadow-md rounded-md p-4">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm">
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
                className="border-b text-gray-700 hover:bg-gray-100 text-center"
              >
                <td className="py-2 px-4">{request.recipientName}</td>
                <td className="py-2 px-4">{request.fullAddress}</td>
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
                      <button className="text-green-500 hover:text-green-700">
                        Done
                      </button>
                    )}
                    {request.status === "canceled" && (
                      <button className="text-red-500 hover:text-green-700">
                        Canceled
                      </button>
                    )}
                  </div>
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
    </div>
  );
};

export default MyDonationRequests;
