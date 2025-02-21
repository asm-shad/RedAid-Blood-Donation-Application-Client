import React, { useState } from "react";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import login from "../../assets/heart-214014_1920.jpg"; // Background image
import { TbFidgetSpinner } from "react-icons/tb";
import useAuth from "../../hooks/useAuth";
import LoadingSpinner from "../../components/LoadingSpinner/LoadingSpinner";
import Swal from "sweetalert2"; // Import SweetAlert2

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState({ login: "" });
  const { signIn, signInWithGoogle, loading, user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";
  if (loading) return <LoadingSpinner />;
  if (user) return <Navigate to={from} replace={true} />;

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;
    const form = location.state?.from?.pathname || "/";

    if (!email || !password) {
      setError({ login: "Please fill in all fields." });
      toast.error("Please fill in all fields.");
      return;
    }

    // Email and Password Authentication
    signIn(email, password)
      .then((result) => {
        console.log("User logged in:", result.user);

        toast.success("Login successful!");
        navigate(form, { replace: true }); // Redirect to the home page after login
      })
      .catch((err) => {
        console.error(err.message);
        setError({ login: "Invalid email or password. Please try again." });

        // Display SweetAlert2 error with a link to login page
        Swal.fire({
          icon: "error",
          title: "Login Failed",
          text: "Incorrect email or password. Please try again.",
          footer: `<a href='/login' style='color: #3085d6; text-decoration: none;'>Go back to Login</a>`,
        });

        toast.error("Invalid email or password.");
      });
  };

  const handleGoogleSignIn = () => {
    Swal.fire({
      title: "Google Sign-In Not Available",
      text: "Google Sign-In is not available for this site, as we don't get the required data through this. This is just for demo purposes.",
      icon: "info",
      confirmButtonText: "OK",
      confirmButtonColor: "#3085d6",
    });
  };

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
            <button
              type="submit"
              className="btn bg-red-600 text-white hover:bg-red-700 flex justify-center items-center"
            >
              {loading ? <TbFidgetSpinner className="animate-spin" /> : "Login"}
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
