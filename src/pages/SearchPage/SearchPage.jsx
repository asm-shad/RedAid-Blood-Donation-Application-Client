import React, { useEffect, useState } from "react";
import { FaSearch, FaQuoteLeft } from "react-icons/fa";
import { Helmet } from "react-helmet-async";
import { useQuery } from "@tanstack/react-query";
import districtsData from "../../assets/json/districts.json";
import upazilasData from "../../assets/json/upazilas.json";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { TbFidgetSpinner } from "react-icons/tb";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import toast from "react-hot-toast";

const SearchPage = () => {
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedUpazila, setSelectedUpazila] = useState("");
  const [selectedBloodGroup, setSelectedBloodGroup] = useState("");
  const { user } = useAuth();

  // Quote data query
  const { data: quoteData = {}, isLoading: isLoadingQuote } = useQuery({
    queryKey: ["quote"],
    queryFn: async () => {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/quote`);
      return data;
    },
  });

  // Safely extract quote and author with fallback values
  const {
    quote = "Giving is not just about making a donation.",
    author = "Unknown",
  } = quoteData;

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

  // Fetch donors with TanStack Query
  const {
    data: donors,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["donors", selectedBloodGroup, selectedDistrict, selectedUpazila],
    queryFn: async () => {
      if (!user?.email) {
        throw new Error("No email found");
      }
      const { data } = await axios.get(
        `${
          import.meta.env.VITE_API_URL
        }/users/?bloodGroup=${selectedBloodGroup}&district=${selectedDistrict}&upazila=${selectedUpazila}`
      );
      return data;
    },
    enabled: false, // Disable automatic fetching
  });

  // Handle form submission
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!selectedBloodGroup && !selectedDistrict && !selectedUpazila) {
      toast.error("Select at least one search field first!");
      return;
    }
    refetch(); // Trigger fetching manually
  };

  return (
    <>
      <Helmet>
        <title>RedAid | Search Donors</title>
      </Helmet>

      <div
        className=" flex flex-col justify-center items-center p-6 bg-gradient-to-r from-red-500 via-red-600 to-red-700"
        style={{
          background: "",
        }}
      >
        {/* Quote Section */}
        <div className="flex-1 flex items-center justify-center bg-red-50  my-4 p-6 rounded-lg shadow-md">
          <div className="text-center text-red-600 max-w-md">
            <FaQuoteLeft size={40} className="mx-auto mb-4" />
            <p className="text-xl italic">{quote}</p>
            <p className="text-right font-semibold mt-2">- {author}</p>
          </div>
        </div>

        <div
          className="w-full max-w-2xl p-8 rounded-lg shadow-xl"
          style={{
            background: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.8)",
          }}
        >
          <h2 className="text-3xl font-semibold text-center text-black mb-6">
            Search Donors
          </h2>

          {/* Search Form */}
          <form onSubmit={handleSearch} className="grid grid-cols-1 gap-6">
            {/* Blood Group */}
            <div className="form-control">
              <label className="label text-black">Blood Group</label>
              <select
                className="input input-bordered bg-transparent text-black placeholder-gray-200 w-full"
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
              <label className="label text-black">District</label>
              <select
                className="input input-bordered bg-transparent text-black placeholder-gray-200 w-full"
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
              <label className="label text-black">Upazila</label>
              <select
                className="input input-bordered bg-transparent text-black placeholder-gray-200 w-full"
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
                disabled={isLoading}
              >
                {isLoading ? (
                  <TbFidgetSpinner className="animate-spin mr-2" />
                ) : (
                  <FaSearch className="mr-2" />
                )}
                Search Donors
              </button>
            </div>
          </form>
        </div>

        {/* Donor List */}
        <div className="mt-10 w-full max-w-3xl">
          {isLoading && (
            <p className="text-white mt-6 text-lg">
              <LoadingSpinner></LoadingSpinner>
            </p>
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
