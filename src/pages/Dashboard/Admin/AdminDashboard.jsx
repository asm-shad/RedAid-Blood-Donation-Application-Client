import React from "react";
import { FaUsers, FaDollarSign, FaHeartbeat } from "react-icons/fa";
import { useQuery } from "@tanstack/react-query";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";

const AdminDashboard = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: statData, isLoading } = useQuery({
    queryKey: ["dashboard-stat"],
    queryFn: async () => {
      const { data } = await axiosSecure("/dashboard-stat");
      return data;
    },
  });

  if (isLoading) return <LoadingSpinner />;

  const { totalDonor, totalRequest, totalFund } = statData || {};

  // Data for charts
  const chartData = [
    { name: "Donors", value: totalDonor },
    { name: "Requests", value: totalRequest },
    { name: "Funding ($)", value: totalFund },
  ];

  const pieData = [
    { name: "Total Donors", value: totalDonor },
    { name: "Total Requests", value: totalRequest },
  ];

  const COLORS = ["#0088FE", "#FF8042"];

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      {/* Welcome Section */}
      <div className="bg-white shadow-md rounded-md p-6 mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Welcome, {user?.displayName || "Admin"} 👋
        </h1>
        <p className="text-gray-600 italic mt-2">
          "The best way to find yourself is to lose yourself in the service of
          others." – Mahatma Gandhi
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
            <p className="text-gray-600 text-sm">{totalDonor} Donors</p>
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
            <p className="text-gray-600 text-sm">$ {totalFund}</p>
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
            <p className="text-gray-600 text-sm">{totalRequest} Requests</p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="mt-10">
        <h2 className="text-xl font-bold text-gray-800 text-center mb-4">
          Platform Insights
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Bar Chart */}
          <div className="bg-white p-6 shadow-md rounded-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Donors, Requests & Funding Overview
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#FF6363" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Pie Chart */}
          <div className="bg-white p-6 shadow-md rounded-md">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Donors vs. Requests
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
