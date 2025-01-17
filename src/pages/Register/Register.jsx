import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../provider/AuthProvider";
import Swal from "sweetalert2";
import { updateProfile } from "firebase/auth";
import registerBg from "../../assets/heart-214014_1920.jpg"; // Background image

const Register = () => {
  const [error, setError] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // const { createUser, signInWithGoogle } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;

    if (name.length < 4) {
      setError({ name: "Must be more than 3 characters long" });
      return;
    }

    if (!/^(?=.*[A-Z])(?=.*[a-z]).{6,}$/.test(password)) {
      setError({
        password:
          "Password must have at least one uppercase letter, one lowercase letter, and be at least 6 characters long",
      });
      return;
    }

    setError({}); // Reset error state if validation passes

    createUser(email, password)
      .then((result) => {
        console.log(result.user);

        updateProfile(result.user, {
          displayName: name,
          photoURL: photo,
        })
          .then(() => {
            const createdAt = result?.user?.metadata?.creationTime;
            const newUser = { name, email, createdAt };

            fetch("https://dream-bridge-server.vercel.app/users", {
              method: "POST",
              headers: {
                "content-type": "application/json",
              },
              body: JSON.stringify(newUser),
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.insertedId) {
                  Swal.fire({
                    title: "Success!",
                    text: "User Created Successfully",
                    icon: "success",
                    confirmButtonText: "Great!",
                  });
                  form.reset();
                  navigate("/"); // Redirect after successful registration
                }
              });
          })
          .catch((error) => {
            console.error("Error updating profile:", error);
          });
      })
      .catch((error) => {
        console.log("Error during registration:", error);
      });
  };

  const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then((result) => {
        console.log("Google sign-in successful:", result.user);
        Swal.fire({
          title: "Success!",
          text: "Logged in with Google!",
          icon: "success",
          confirmButtonText: "Great!",
        });
        navigate("/");
      })
      .catch((err) => {
        console.error(err.message);
        Swal.fire({
          title: "Error!",
          text: "Google sign-in failed. Please try again.",
          icon: "error",
          confirmButtonText: "Okay",
        });
      });
  };

  return (
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
        <form onSubmit={handleSubmit} className="card-body">
          <div className="form-control">
            <label className="label">
              <span className="label-text text-white">Name</span>
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter your Name"
              className="input input-bordered bg-transparent text-white placeholder-gray-200"
              required
            />
            {error.name && (
              <label className="label text-sm text-rose-300">
                {error.name}
              </label>
            )}
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-white">PhotoURL</span>
            </label>
            <input
              type="text"
              name="photo"
              placeholder="Enter PhotoURL"
              className="input input-bordered bg-transparent text-white placeholder-gray-200"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-white">Email</span>
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              className="input input-bordered bg-transparent text-white placeholder-gray-200"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text text-white">Password</span>
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
            {error.password && (
              <label className="label text-sm text-rose-300">
                {error.password}
              </label>
            )}
          </div>
          <div className="form-control mt-6">
            <button className="btn bg-red-600 text-white hover:bg-red-700">
              Register
            </button>
          </div>
        </form>
        <div className="divider text-white">OR</div>
        <button
          onClick={handleGoogleSignIn}
          className="btn bg-red-500 mb-2 text-white hover:bg-red-600 w-full"
        >
          Sign in with Google
        </button>
        <p className="text-center font-semibold text-white mt-4">
          Already have an account?{" "}
          <Link className="text-white underline" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
