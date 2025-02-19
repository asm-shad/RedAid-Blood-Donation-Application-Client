import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import splitBloodAnimation from "../../../assets/json/split-blood.json"; // Import animation
import coverImg from "../../../assets/cork-board.jpg";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import useRole from "../../../hooks/useRole";
import LottieBackground from "../../../components/LottieBackground/LottieBackground";
import { useEffect } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const Profile = () => {
  const { user, loading } = useAuth();
  const [role, isLoading] = useRole();
  const navigate = useNavigate();
  console.log(user);

  // Fetch user data based on email using the new query function format
  const {
    data: fetchedUser,
    isLoading: isLoadingUser,
    error,
  } = useQuery({
    queryKey: ["userProfile", user?.email],
    queryFn: async () => {
      if (!user?.email) {
        throw new Error("No email found");
      }
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/${user.email}`
      );
      return data;
    },
    enabled: !!user?.email, // Only run the query if user has an email
  });

  // Redirect to login if user is not found (after logout)
  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  // Show loading spinner while user or role data is being fetched
  if (isLoading || loading || isLoadingUser) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  // Handle error fetching user data
  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        <p>Error fetching user data</p>
      </div>
    );
  }

  return (
    <div className="relative h-screen flex justify-center items-center">
      {/* Lottie background */}
      <LottieBackground animationData={splitBloodAnimation} />
      <Helmet>
        <title>Profile</title>
      </Helmet>

      {/* Content */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Edit Profile Card */}
          <div className="md:col-span-2">
            <div className="bg-white bg-opacity-70 backdrop-blur-md rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6">Edit Profile</h2>
              <form>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Company */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Company (disabled)
                    </label>
                    <input
                      defaultValue="Creative Code Inc."
                      disabled
                      placeholder="Company"
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  {/* Username */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Username
                    </label>
                    <input
                      defaultValue={user?.displayName || "Guest User"}
                      placeholder="Username"
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  {/* Email */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Email address
                    </label>
                    <input
                      defaultValue={fetchedUser?.email || "N/A"}
                      placeholder="Email"
                      type="email"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  {/* First Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      First Name
                    </label>
                    <input
                      defaultValue="Mike"
                      placeholder="First Name"
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Last Name
                    </label>
                    <input
                      defaultValue="Andrew"
                      placeholder="Last Name"
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  {/* Address */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Address
                    </label>
                    <input
                      defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                      placeholder="Home Address"
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  {/* City */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      City
                    </label>
                    <input
                      defaultValue="Mike"
                      placeholder="City"
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  {/* Country */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Country
                    </label>
                    <input
                      defaultValue="Andrew"
                      placeholder="Country"
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  {/* Postal Code */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Postal Code
                    </label>
                    <input
                      placeholder="ZIP Code"
                      type="number"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>

                  {/* About Me */}
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">
                      About Me
                    </label>
                    <textarea
                      defaultValue="Lamborghini Mercy, Your chick she so thirsty, I'm in that two seat Lambo."
                      placeholder="Here can be your description"
                      rows="4"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* User Info Card */}
          <div className="bg-white bg-opacity-70 backdrop-blur-md rounded-lg shadow-lg p-6">
            <div className="image">
              <img
                alt="..."
                src={coverImg}
                className="w-full h-32 object-cover rounded-t-lg"
              />
            </div>
            <div className="author text-center mt-6">
              <img
                alt="..."
                className="w-24 h-24 rounded-full border-4 border-white mx-auto -mt-12"
                src={fetchedUser?.image || "/default-avatar.png"}
              />
              <h5 className="text-xl font-bold mt-4">
                {user?.displayName || "Guest User"}
              </h5>
              <p className="text-sm text-gray-600">{role || "No Role Assigned"}</p>
              <p className="text-sm text-gray-600 mt-4">
                "Lamborghini Mercy <br />
                Your chick she so thirsty <br />
                I'm in that two seat Lambo"
              </p>
            </div>
            <hr className="my-6" />
            <div className="flex justify-center space-x-4">
              <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
                <i className="fab fa-facebook-f text-gray-700" />
              </button>
              <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
                <i className="fab fa-twitter text-gray-700" />
              </button>
              <button className="p-2 rounded-full bg-gray-200 hover:bg-gray-300">
                <i className="fab fa-google-plus-g text-gray-700" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;