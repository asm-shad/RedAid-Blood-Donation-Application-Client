import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { imageUpload } from "../../../api/utils";
import axios from "axios";
import { toast } from "react-toastify";

const EditProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [profileData, setProfileData] = useState({
    name: user?.name || "",
    bloodGroup: user?.bloodGroup || "A+",
    image: user?.image || "/default-avatar.png",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value || "" }));
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setIsLoading(true);
      try {
        const imageUrl = await imageUpload(file);
        setProfileData((prev) => ({ ...prev, image: imageUrl }));
      } catch (error) {
        console.error("Image upload failed:", error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/users/${user.email}`,
        profileData
      );
      toast.success("Profile updated successfully");
      navigate("/dashboard/profile");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input
            type="text"
            name="name"
            value={profileData.name}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Blood Group</label>
          <select
            name="bloodGroup"
            value={profileData.bloodGroup}
            onChange={handleChange}
            className="w-full border border-gray-300 p-2 rounded-lg"
          >
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700">Profile Image</label>
          <input
            type="file"
            onChange={handleImageUpload}
            className="w-full border border-gray-300 p-2 rounded-lg"
          />
          {profileData.image && (
            <img
              src={profileData.image}
              alt=""
              className="mt-2 h-24 w-24 rounded-full"
            />
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-[#EB2C29] text-white px-6 py-2 rounded-lg hover:bg-lime-800"
        >
          {isLoading ? "Updating..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
};

export default EditProfile;
