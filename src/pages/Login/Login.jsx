import React, { useState } from "react";
import { Link } from "react-router-dom";
import login from "../../assets/heart-214014_1920.jpg"; // Importing the background image

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState({ login: "" });

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;

    // Example validation logic
    if (!email || !password) {
      setError({ login: "Please fill in all fields." });
      return;
    }

    // Simulate login logic
    console.log("Login submitted:", formData);
    setError({ login: "" }); // Clear errors on successful submission
    alert("Logged in successfully!");
  };

  // Simulate Google Sign-In
  const handleGoogleSignIn = () => {
    console.log("Google Sign-In clicked.");
    alert("Signed in with Google!");
  };

  // Update form data
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div
      className="min-h-screen flex justify-center items-center"
      style={{
        backgroundImage: `url(${login})`,
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
          Login to your account
        </h2>
        <form onSubmit={handleSubmit} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-white">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="input input-bordered bg-transparent text-white placeholder-gray-200"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-white">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              className="input input-bordered bg-transparent text-white placeholder-gray-200"
              required
            />
            {error.login && (
              <label className="label text-sm text-rose-300">
                {error.login}
              </label>
            )}
          </div>
          <label className="label">
            <Link
              to="/auth/forgot-password"
              className="label-text-alt link link-hover text-white"
            >
              Forgot password?
            </Link>
          </label>
          <div className="form-control mt-6">
            <button className="btn bg-red-600 text-white hover:bg-red-700">
              Login
            </button>
          </div>
        </form>
        <div className="divider text-white">OR</div>
        <button
          className="btn bg-red-700 mb-2 text-white hover:bg-red-800 w-full"
          onClick={handleGoogleSignIn}
        >
          Sign in with Google
        </button>
        <p className="text-center font-semibold text-white">
          Don’t have an account?{" "}
          <Link className="text-white underline" to="/register">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
