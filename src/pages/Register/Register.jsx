import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Swal from "sweetalert2";
import { updateProfile } from "firebase/auth";
import registerBg from "../../assets/heart-214014_1920.jpg"; // Background image
import { Helmet } from "react-helmet-async";
import districtsData from "../../assets/json/districts.json";
import upazilasData from "../../assets/json/upazilas.json";
import axios from "axios";
import { imageUpload } from "../../api/utils";
import useAuth from "../../hooks/useAuth";
import { TbFidgetSpinner } from "react-icons/tb";

const Register = () => {
  const [error, setError] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const navigate = useNavigate();

  const { createUser, setUser, loading } = useAuth();

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
    }
  }, [selectedDistrict]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.files[0];
    const email = form.email.value;
    const bloodGroup = form.bloodGroup.value;
    const district = form.district.value;
    const upazila = form.upazila.value;
    const password = form.password.value;
    const confirmPassword = form.confirm_password.value;

    // Validation
    if (name.length < 4) {
      setError({ name: "Name must be at least 4 characters long." });
      return;
    }
    if (password !== confirmPassword) {
      setError({ confirmPassword: "Passwords do not match." });
      return;
    }
    if (!/^(?=.*[A-Z])(?=.*[a-z]).{6,}$/.test(password)) {
      setError({
        password:
          "Password must contain at least one uppercase letter, one lowercase letter, and be at least 6 characters long.",
      });
      return;
    }

    setError({}); // Clear errors if validation passes

    try {
      // Wait for image upload to complete
      const photoURL = await imageUpload(photo);

      // Firebase Authentication: Create User
      const result = await createUser(email, password);
      const user = result.user;

      // Update User Profile
      await updateProfile(user, {
        displayName: name,
        photoURL,
      });

      // Save user info to the database
      const newUser = {
        name,
        email,
        photo: photoURL,
        bloodGroup,
        district,
        upazila,
        status: "active",
        role: "donor",
      };

      // Update AuthContext (if used)
      setUser({
        displayName: name,
        photoURL,
        email,
      });

      console.log("New user created:", newUser);
      Swal.fire("Success", "Registration successful!", "success");
      navigate("/"); // Redirect to home page
    } catch (err) {
      console.error("Error during registration:", err);
      Swal.fire("Error", err.message || "Registration failed.", "error");
    }
  };

  return (
    <>
      <Helmet>
        <title>RedAid | Register</title>
      </Helmet>
      <div
        className="min-h-screen flex justify-center items-center"
        style={{
          backgroundImage: `url(${registerBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div
          className="card w-full max-w-lg p-12 rounded-lg shadow-xl"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255, 0, 0, 0.6), rgba(255, 85, 85, 0.4))",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
          }}
        >
          <h2 className="text-2xl font-semibold text-center text-white mb-6">
            Register your account
          </h2>
          <form onSubmit={handleSubmit} className="card-body text-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-sm text-white">Name</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  className="input input-bordered bg-transparent text-white placeholder-gray-200"
                  required
                />
              </div>

              {/* Email Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-sm text-white">Email</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="input input-bordered bg-transparent text-white placeholder-gray-200"
                  required
                />
              </div>
            </div>

            {/* Avatar Input in its own row */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-sm text-white">
                  Avatar (Profile Picture)
                </span>
              </label>
              <input
                type="file"
                name="photo"
                accept="image/*"
                className="input input-bordered bg-transparent text-white placeholder-gray-200 w-full"
                required
              />
            </div>
            {/* Blood Group Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-sm text-white">
                  Blood Group
                </span>
              </label>
              <select
                name="bloodGroup"
                className="input input-bordered bg-transparent text-white placeholder-gray-200"
                required
              >
                <option className="text-black" value="">
                  Select Blood Group
                </option>
                <option className="text-black" value="A+">
                  A+
                </option>
                <option className="text-black" value="A-">
                  A-
                </option>
                <option className="text-black" value="B+">
                  B+
                </option>
                <option className="text-black" value="B-">
                  B-
                </option>
                <option className="text-black" value="AB+">
                  AB+
                </option>
                <option className="text-black" value="AB-">
                  AB-
                </option>
                <option className="text-black" value="O+">
                  O+
                </option>
                <option className="text-black" value="O-">
                  O-
                </option>
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* District Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-sm text-white">
                    District
                  </span>
                </label>
                <select
                  name="district"
                  className="input input-bordered bg-transparent text-white placeholder-gray-200"
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
              {/* Upazila Field */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text text-white">Upazila</span>
                </label>
                <select
                  name="upazila"
                  className="input input-bordered bg-transparent text-white placeholder-gray-200"
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
            </div>

            {/* Password Fields */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-sm text-white">Password</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  className="input input-bordered bg-transparent text-white placeholder-gray-200 w-full"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-200"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Confirm Password Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text text-sm text-white">
                  Confirm Password
                </span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirm_password"
                  placeholder="Confirm your password"
                  className="input input-bordered bg-transparent text-white placeholder-gray-200 w-full"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-200"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {error.confirmPassword && (
                <label className="label text-sm text-rose-300">
                  {error.confirmPassword}
                </label>
              )}
            </div>

            {/* Submit Button */}
            <div className="form-control mt-6">
              <button
                type="submit"
                className="btn bg-red-600 text-white hover:bg-red-700 flex justify-center items-center"
              >
                {loading ? (
                  <TbFidgetSpinner className="animate-spin" />
                ) : (
                  "Register"
                )}
              </button>
            </div>
          </form>

          <p className="text-center font-semibold text-white mt-4">
            Already have an account?{" "}
            <Link className="text-white underline" to="/login">
              Login
            </Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default Register;
