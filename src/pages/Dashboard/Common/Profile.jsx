import { Helmet } from "react-helmet-async";
import { useNavigate } from "react-router-dom";
import splitBloodAnimation from "../../../assets/json/split-blood.json"; // Import animation
import coverImg from "../../../assets/cork-board.jpg";
import useAuth from "../../../hooks/useAuth";
import LoadingSpinner from "../../../components/LoadingSpinner/LoadingSpinner";
import useRole from "../../../hooks/useRole";
import LottieBackground from "../../../components/LottieBackground/LottieBackground";
import { useEffect } from "react";

const Profile = () => {
  const { user, loading } = useAuth();
  const [role, isLoading] = useRole();
  const navigate = useNavigate();

  // Redirect to login if user is not found (after logout)
  useEffect(() => {
    if (!loading && !user) {
      navigate("/login");
    }
  }, [user, loading, navigate]);

  // Show loading spinner while user or role data is being fetched
  if (isLoading || loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div className="relative h-screen flex justify-center items-center">
      <Helmet>
        <title>Profile</title>
      </Helmet>

      {/* Lottie background */}
      <LottieBackground animationData={splitBloodAnimation} />

      {/* Content */}
      <div className="relative bg-white shadow-lg rounded-2xl z-10 md:w-4/5 lg:w-3/5">
        <img
          alt="cover photo"
          src={coverImg}
          className="w-full mb-4 rounded-t-lg h-56"
        />
        <div className="flex flex-col items-center justify-center p-4 -mt-16">
          <a href="#" className="relative block">
            <img
              alt="profile"
              src={user?.photoURL || "/default-avatar.png"}
              className="mx-auto object-cover rounded-full h-24 w-24 border-2 border-white"
            />
          </a>

          <p className="p-2 px-4 text-xs text-white bg-[#EB2C29] rounded-full capitalize">
            {role || "No Role Assigned"}
          </p>
          <p className="mt-2 text-xl font-medium text-gray-800">
            User Name: {user?.displayName || "Guest User"}
          </p>
          <div className="w-full p-2 mt-4 rounded-lg">
            <div className="flex flex-wrap items-center justify-between text-sm text-gray-600">
              <p className="flex flex-col">
                Name
                <span className="font-bold text-black">
                  {user?.displayName || "N/A"}
                </span>
              </p>
              <p className="flex flex-col">
                Email
                <span className="font-bold text-black">
                  {user?.email || "N/A"}
                </span>
              </p>

              <div className="mt-4">
                <button className="bg-[#EB2C29] px-10 py-1 rounded-lg text-white cursor-pointer hover:bg-lime-800 block mb-1">
                  Update Profile
                </button>
                <button className="bg-[#EB2C29] px-7 py-1 rounded-lg text-white cursor-pointer hover:bg-lime-800">
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
