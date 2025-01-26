import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import districtsData from "../../assets/json/districts.json";
import upazilasData from "../../assets/json/upazilas.json";
import axios from "axios";

// Fetch donors based on selected criteria
const fetchDonors = async (bloodGroup, district, upazila) => {
  const response = await axios.get(
    `/search-donors?bloodGroup=${bloodGroup}&district=${district}&upazila=${upazila}`
  );
  return response.data; // Ensure this returns an array of donors
};

const SearchPage = () => {
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedUpazila, setSelectedUpazila] = useState("");
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("");

  // Load districts on component mount
  useEffect(() => {
    setDistricts(districtsData);
  }, []);

  // Update upazilas based on selected district
  useEffect(() => {
    if (selectedDistrict) {
      const filteredUpazilas = upazilasData.filter(
        (upazila) => upazila.district_id === selectedDistrict
      );
      setUpazilas(filteredUpazilas);
    } else {
      setUpazilas([]);
    }
  }, [selectedDistrict]);

  // TanStack Query to fetch donors
  const {
    data: donors,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["donors", selectedBloodGroup, selectedDistrict, selectedUpazila],
    queryFn: () =>
      fetchDonors(selectedBloodGroup, selectedDistrict, selectedUpazila),
    enabled: false, // Disable automatic query execution
  });

  // Handle search form submission
  const handleSearch = async (e) => {
    e.preventDefault();
    refetch(); // Trigger the data fetching manually
  };

  return (
    <>
      <Helmet>
        <title>RedAid | Search Donors</title>
      </Helmet>

      <div
        className="min-h-screen flex flex-col justify-center items-center p-6"
        style={{
          background: "linear-gradient(to bottom, #ff4d4d, #ff6666)",
        }}
      >
        <div
          className="w-full max-w-2xl p-8 rounded-lg shadow-xl"
          style={{
            background: "rgba(255, 255, 255, 0.4)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          <h2 className="text-3xl font-semibold text-center text-white mb-6">
            Search Donors
          </h2>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="grid grid-cols-1 gap-6 ">
            {/* Blood Group */}
            <div className="form-control">
              <label className="label text-white">Blood Group</label>
              <select
                className="input input-bordered bg-transparent text-white placeholder-gray-200 w-full"
                value={selectedBloodGroup}
                onChange={(e) => setSelectedBloodGroup(e.target.value)}
                required
              >
                <option className="text-black" value="">
                  Select Blood Group
                </option>
                {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(
                  (group) => (
                    <option className="text-black" key={group} value={group}>
                      {group}
                    </option>
                  )
                )}
              </select>
            </div>

            {/* District */}
            <div className="form-control">
              <label className="label text-white">District</label>
              <select
                className="input input-bordered bg-transparent text-white placeholder-gray-200 w-full"
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                required
              >
                <option className="text-black" value="">
                  Select District
                </option>
                {districts.map((district) => (
                  <option
                    className="text-black"
                    key={district.id}
                    value={district.id}
                  >
                    {district.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Upazila */}
            <div className="form-control">
              <label className="label text-white">Upazila</label>
              <select
                className="input input-bordered bg-transparent text-white placeholder-gray-200 w-full"
                value={selectedUpazila}
                onChange={(e) => setSelectedUpazila(e.target.value)}
                required
              >
                <option className="text-black" value="">
                  Select Upazila
                </option>
                {upazilas.map((upazila) => (
                  <option
                    className="text-black"
                    key={upazila.id}
                    value={upazila.name}
                  >
                    {upazila.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Button */}
            <div className="form-control mt-4">
              <button
                type="submit"
                className="btn bg-red-600 text-white hover:bg-red-700 flex justify-center items-center"
              >
                <FaSearch className="mr-2" /> Search Donors
              </button>
            </div>
          </form>
        </div>

        {/* Donor List */}
        <div className="mt-10 w-full max-w-3xl">
          {isLoading && (
            <p className="text-white mt-6 text-lg">Loading donors...</p>
          )}
          {isError && (
            <p className="text-white mt-6 text-lg">Error fetching data!</p>
          )}
          {donors && donors.length > 0 ? (
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                Donor Results
              </h3>
              <ul className="divide-y divide-gray-300">
                {donors.map((donor) => (
                  <li key={donor._id} className="py-3">
                    <p className="text-lg font-medium text-red-600">
                      {donor.name}
                    </p>
                    <p>Blood Group: {donor.bloodGroup}</p>
                    <p>
                      Location: {donor.district}, {donor.upazila}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-white mt-6 text-lg">
              No donors found. Please search to see results.
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default SearchPage;
