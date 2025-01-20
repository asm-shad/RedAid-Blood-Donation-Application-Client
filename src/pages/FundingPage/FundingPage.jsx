import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import FundingModal from "../Modal/FundingModal";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Helmet } from "react-helmet-async"; // Import Helmet for SEO

const FundingPage = () => {
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const itemsPerPage = 5; // Number of rows per page
  const [totalFunds, setTotalFunds] = useState(0); // Total funds calculated
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const { user } = useAuth(); // Authentication and user info
  const navigate = useNavigate();

  // Fetch all funding records and calculate total funds
  const {
    data: funds,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["funds"],
    queryFn: async () => {
      const { data } = await axios(`${import.meta.env.VITE_API_URL}/funds`);
      return data;
    },
  });

  // Update total funds when the `funds` data changes
  useEffect(() => {
    if (funds) {
      const total = funds.reduce((acc, fund) => acc + fund.amount, 0);
      setTotalFunds(total);
    }
  }, [funds]);

  // Handle Give Fund Button (open modal)
  const handleGiveFund = () => {
    if (!user) {
      Swal.fire("Unauthorized", "Please login to give funding.", "warning");
      navigate("/login"); // Redirect to login if user is not logged in
    } else if (user?.status !== "active") {
      Swal.fire(
        "Inactive Account",
        "You must have an active account to donate.",
        "warning"
      );
    } else {
      setIsModalOpen(true); // Open the modal if user is eligible
    }
  };

  // Pagination logic
  const totalItems = funds?.length || 0; // If funds is undefined, it defaults to 0
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedFunds =
    funds?.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    ) || []; // Fallback to an empty array if funds is undefined

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      {/* Helmet for SEO */}
      <Helmet>
        <title>Funding Page | Donate Now</title>
        <meta
          name="description"
          content="Support our cause by donating funds to help those in need. Your donation can make a difference."
        />
        <meta
          name="keywords"
          content="donate, charity, fundraising, help, support"
        />
        <meta name="author" content="My Charity Organization" />
      </Helmet>

      {/* Page Header */}
      <div className="flex justify-between items-center w-full max-w-6xl mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Funding Page</h1>
        <button
          onClick={handleGiveFund}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Give Fund
        </button>
      </div>

      {/* Total Funds */}
      <div className="bg-white shadow-md rounded-lg p-4 w-full max-w-6xl mb-6">
        <h2 className="text-lg font-semibold text-gray-800">
          Total Funds Collected:{" "}
          <span className="text-green-500 font-bold">${totalFunds}</span>
        </h2>
      </div>

      {/* Funds Table */}
      <div className="bg-white shadow-md rounded-lg w-full max-w-6xl">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm">
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Fund Amount</th>
              <th className="py-2 px-4">Funding Date</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {paginatedFunds.length > 0 ? (
              paginatedFunds.map((fund) => (
                <tr
                  key={fund._id}
                  className="border-b text-gray-700 hover:bg-gray-100"
                >
                  <td className="py-2 px-4">{fund.name || "Anonymous"}</td>
                  <td className="py-2 px-4 text-green-500 font-bold">
                    ${fund.amount}
                  </td>
                  <td className="py-2 px-4">
                    {new Date(fund.timestamp).toLocaleString()}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="3"
                  className="text-center py-4 text-gray-600 italic"
                >
                  No funds available yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
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
      )}

      {/* Fund Modal */}
      <FundingModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        user={user}
        refetch={refetch} // refetch funds after donation
      />

      {/* Motivational Quote */}
      <div className="my-12 text-center">
        <p className="text-xl font-semibold text-gray-700">
          “Your donation can save lives. Spread awareness and inspire others.”
        </p>
        <span className="block mt-2 text-gray-500">– Anonymous</span>
      </div>
    </div>
  );
};

export default FundingPage;
