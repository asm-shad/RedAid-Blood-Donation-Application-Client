import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import splitBloodAnimation from "../../../assets/json/split-blood.json";
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

  const {
    data: fetchedUser,
    isLoading: isLoadingUser,
    error,
  } = useQuery({
    queryKey: ["userProfile", user?.email],
    queryFn: async () => {
      if (!user?.email) throw new Error("No email found");
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/users/${user.email}`
      );
      return data;
    },
    enabled: !!user?.email,
  });

  useEffect(() => {
    if (!loading && !user) navigate("/login");
  }, [user, loading, navigate]);

  if (isLoading || loading || isLoadingUser) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        <p>Error fetching user data</p>
      </div>
    );
  }

  return (
    <div className="relative h-screen flex flex-col justify-center items-center z-0">
      <LottieBackground animationData={splitBloodAnimation} />
      <Helmet>
        <title>Profile</title>
      </Helmet>

      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          {/* Profile Details */}
          <div className="md:col-span-2">
            <div className="bg-white bg-opacity-70 backdrop-blur-md rounded-lg shadow-lg p-6 h-full">
              <h2 className="text-2xl font-bold mb-6">Profile Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-gray-700">Company</p>
                  <p className="text-lg font-semibold">Creative Code Inc.</p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700">Username</p>
                  <p className="text-lg font-semibold">
                    {user?.displayName || "Guest User"}
                  </p>
                </div>

                <div className="md:col-span-2">
                  <p className="text-sm font-medium text-gray-700">Email</p>
                  <p className="text-lg font-semibold">
                    {fetchedUser?.email || "N/A"}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700">
                    First Name
                  </p>
                  <p className="text-lg font-semibold">
                    {fetchedUser?.firstName || "John"}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700">Last Name</p>
                  <p className="text-lg font-semibold">
                    {fetchedUser?.lastName || "Doe"}
                  </p>
                </div>

                <div className="md:col-span-2">
                  <p className="text-sm font-medium text-gray-700">Address</p>
                  <p className="text-lg font-semibold">
                    {fetchedUser?.address || "Not Available"}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700">City</p>
                  <p className="text-lg font-semibold">
                    {fetchedUser?.city || "Unknown"}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700">Country</p>
                  <p className="text-lg font-semibold">
                    {fetchedUser?.country || "Unknown"}
                  </p>
                </div>

                <div>
                  <p className="text-sm font-medium text-gray-700">
                    Postal Code
                  </p>
                  <p className="text-lg font-semibold">
                    {fetchedUser?.zip || "N/A"}
                  </p>
                </div>

                <div className="md:col-span-2">
                  <p className="text-sm font-medium text-gray-700">About Me</p>
                  <p className="text-lg font-semibold">
                    {fetchedUser?.about || "No details provided."}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* User Card */}
          <div className="bg-white bg-opacity-70 backdrop-blur-md rounded-lg shadow-lg p-6 h-full">
            <div className="image">
              <img
                alt="Cover"
                src={coverImg}
                className="w-full h-32 object-cover rounded-t-lg"
              />
            </div>
            <div className="author text-center mt-6">
              <img
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-white mx-auto -mt-12"
                src={fetchedUser?.image || "/default-avatar.png"}
              />
              <h5 className="text-xl font-bold mt-4">
                {user?.displayName || "Guest User"}
              </h5>
              <p className="text-sm text-gray-600">
                {role || "No Role Assigned"}
              </p>
              <p className="text-sm text-gray-600 mt-4 italic">
                "{fetchedUser?.bio || "Live, Learn, and Grow"}"
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
