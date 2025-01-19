import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

const FundingPage = () => {
  const [funds, setFunds] = useState([]); // Store funding data
  const [currentPage, setCurrentPage] = useState(1); // Pagination state
  const itemsPerPage = 5; // Number of rows per page
  const [totalFunds, setTotalFunds] = useState(0); // Total funds
  const { isAuthenticated, user } = useAuth(); // Authentication and user info
  const navigate = useNavigate();

  // Fetch all funding records and total funds
  useEffect(() => {
    const fetchFunds = async () => {
      try {
        const response = await fetch("/api/funds");
        const data = await response.json();
        setFunds(data.funds);
        setTotalFunds(data.total); // Total funds received
      } catch (err) {
        console.error("Error fetching funding data:", err);
        Swal.fire("Error", "Unable to fetch funding data.", "error");
      }
    };

    fetchFunds();
  }, []);

  // Handle Give Fund Button (Redirect to payment page)
  const handleGiveFund = () => {
    if (!isAuthenticated) {
      Swal.fire("Unauthorized", "Please login to give funding.", "warning");
      navigate("/login"); // Redirect to login if user is not logged in
    } else {
      navigate("/dashboard/give-fund"); // Redirect to funding (Stripe) page
    }
  };

  // Pagination logic
  const totalItems = funds.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const paginatedFunds = funds.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
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
          <tbody>
            {paginatedFunds.length > 0 ? (
              paginatedFunds.map((fund) => (
                <tr
                  key={fund.id}
                  className="border-b text-gray-700 hover:bg-gray-100"
                >
                  <td className="py-2 px-4">{fund.name}</td>
                  <td className="py-2 px-4 text-green-500 font-bold">
                    ${fund.amount}
                  </td>
                  <td className="py-2 px-4">{fund.date}</td>
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
    </div>
  );
};

export default FundingPage;
