import React from "react";
import { FaUsers, FaDollarSign, FaHeartbeat } from "react-icons/fa";
import useAuth from "../../../hooks/useAuth";

const VolunteerDashboard = () => {
  const { user } = useAuth(); // Get the authenticated user's details

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      {/* Welcome Section */}
      <div className="bg-white shadow-md rounded-md p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome, {user?.displayName || "Volunteer"} 👋
        </h1>
        <p className="text-gray-600 italic mt-2">
          "No one has ever become poor by giving." – Anne Frank
        </p>
      </div>

      {/* Quick Overview */}
      <p className="text-lg font-semibold text-gray-800 mb-4">
        Here’s a quick overview of the platform’s current status:
      </p>

      {/* Statistics Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Total Users */}
        <div className="bg-white shadow-md rounded-md p-6 flex items-center gap-4">
          <div className="p-4 bg-blue-100 text-blue-600 rounded-full">
            <FaUsers className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800">Total Users</h2>
            <p className="text-gray-600 text-sm">120 Donors</p>
          </div>
        </div>

        {/* Total Funding */}
        <div className="bg-white shadow-md rounded-md p-6 flex items-center gap-4">
          <div className="p-4 bg-green-100 text-green-600 rounded-full">
            <FaDollarSign className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Total Funding
            </h2>
            <p className="text-gray-600 text-sm">$5,000</p>
          </div>
        </div>

        {/* Total Blood Donation Requests */}
        <div className="bg-white shadow-md rounded-md p-6 flex items-center gap-4">
          <div className="p-4 bg-red-100 text-red-600 rounded-full">
            <FaHeartbeat className="w-8 h-8" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800">
              Total Blood Requests
            </h2>
            <p className="text-gray-600 text-sm">75 Requests</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VolunteerDashboard;
