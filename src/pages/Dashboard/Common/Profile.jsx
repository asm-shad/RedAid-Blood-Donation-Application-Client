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
      <div className="relative bg-white bg-opacity-70 backdrop-blur-md shadow-lg rounded-2xl z-1 md:w-4/5 lg:w-3/5 p-4">
        <img
          alt="cover photo"
          src={coverImg}
          className="w-full mb-4 rounded-t-lg h-56"
        />
        <div className="flex flex-col items-center justify-center p-4 -mt-16">
          <a href="#" className="relative block">
            <img
              alt="profile"
              src={fetchedUser?.image || "/default-avatar.png"}
              className="mx-auto object-cover rounded-full h-24 w-24 border-2 border-white"
            />
          </a>

          <p className="p-2 px-4 text-xs text-white bg-[#EB2C29] rounded-full capitalize">
            {role || "No Role Assigned"}
          </p>
          <p className="mt-2 text-2xl font-bold text-gray-800">
            UserName: {user?.displayName || "Guest User"}
          </p>
          <div className="w-full p-2 mt-4 rounded-lg">
            <div className="flex flex-wrap items-center justify-between text-sm text-gray-600">
              <p className="flex flex-col text-xl">
                BloodGroup:
                <span className="font-bold text-black">
                  {fetchedUser?.bloodGroup || "N/A"}
                </span>
              </p>
              <p className="flex flex-col text-xl">
                Email:
                <span className="font-bold text-black">
                  {fetchedUser?.email || "N/A"}
                </span>
              </p>
            </div>
          </div>

          {/* Buttons moved back below */}
          <div className="mt-4">
            <button
              onClick={() => navigate("/dashboard/profile/edit")}
              className="bg-[#EB2C29] px-10 py-1 rounded-lg text-white cursor-pointer hover:bg-lime-800 block mb-1"
            >
              Update Profile
            </button>
            <button className="bg-[#EB2C29] px-7 py-1 rounded-lg text-white cursor-pointer hover:bg-lime-800">
              Change Password
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
