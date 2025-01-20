// Upload image and return image URL

import axios from "axios";

export const imageUpload = async (imageData) => {
  // Upload avatar to imageBB
  const formData = new FormData();
  formData.append("image", imageData);
  const { data } = await axios.post(
    `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY}`,
    formData
  );
  return data.data.display_url;
};

export const saveUser = async (user) => {
  try {
    await axios.post(`${import.meta.env.VITE_API_URL}/users/${user?.email}`, {
      name: user?.name,
      image: user?.photo,
      email: user?.email,
      bloodGroup: user?.bloodGroup,
      district: user?.district,
      upazila: user?.upazila,
      status: user?.status,
      role: user?.role,
    });
  } catch (error) {
    console.error("Error saving user:", error);
    throw error;
  }
};
