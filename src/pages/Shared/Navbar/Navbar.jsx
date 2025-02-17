import logo from "../../../assets/logo.png";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const Navbar = () => {
  const { user, logOut } = useAuth();

  return (
    <div className="navbar sticky top-0 z-50 px-4 py-3 shadow-md bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left Section - Logo */}
        <div className="flex-1">
          <Link to="/" className="flex gap-2 items-center">
            <img
              className="w-auto h-8 rounded-full border-2 border-white bg-white"
              src={logo}
              alt="Logo"
            />
            <span className="md:inline font-bold font-rancho text-3xl">
              RedAid
            </span>
          </Link>
        </div>

        {/* Right Section */}
        <div className="flex items-center">
          {/* Larger Screens - Horizontal Menu */}
          <ul className="hidden sm:flex menu menu-horizontal px-1 gap-4 items-center">
            <li>
              <Link to="/" className="hover:underline">
                Home
              </Link>
            </li>
            <li>
              <Link to="/donation-requests" className="hover:underline">
                Donation Requests
              </Link>
            </li>
            <li>
              <Link to="/blog" className="hover:underline">
                Blog
              </Link>
            </li>
            {user ? (
              <>
                <li>
                  <Link to="/funding-links" className="hover:underline">
                    Funding Links
                  </Link>
                </li>
                {/* User Profile Dropdown */}
                <div className="dropdown dropdown-end">
                  <div
                    tabIndex={0}
                    role="button"
                    className="btn btn-ghost btn-circle avatar"
                  >
                    <div
                      title={user?.displayName || "User"}
                      className="w-8 rounded-full border-2 border-white"
                    >
                      <img
                        referrerPolicy="no-referrer"
                        alt="User Profile Photo"
                        src={user?.photoURL || "/default-avatar.png"}
                      />
                    </div>
                  </div>
                  <ul
                    tabIndex={0}
                    className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg rounded-box bg-white text-gray-700 w-52"
                  >
                    <li>
                      <Link to="/dashboard">Dashboard</Link>
                    </li>
                    <li className="mt-2">
                      <button
                        onClick={logOut}
                        className="bg-red-600 text-white block w-full py-2 rounded-md text-center"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <li>
                <Link
                  to="/login"
                  className="bg-white text-red-700 px-4 py-1 rounded-md hover:bg-gray-200"
                >
                  Login
                </Link>
              </li>
            )}
          </ul>

          {/* Smaller Screens - Dropdown Menu */}
          <div className="sm:hidden dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div
                title={user?.displayName || "User"}
                className="w-8 rounded-full border-2 border-white"
              >
                <img
                  referrerPolicy="no-referrer"
                  alt="User Profile Photo"
                  src={user?.photoURL || "/default-avatar.png"}
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg rounded-box bg-white text-gray-700 w-52"
            >
              <li>
                <Link to="/" className="hover:underline">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/donation-requests" className="hover:underline">
                  Donation Requests
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:underline">
                  Blog
                </Link>
              </li>
              {user ? (
                <>
                  <li>
                    <Link to="/funding-links" className="hover:underline">
                      Funding Links
                    </Link>
                  </li>
                  <li>
                    <Link to="/dashboard" className="hover:underline">
                      Dashboard
                    </Link>
                  </li>
                  <li className="mt-2">
                    <button
                      onClick={logOut}
                      className="bg-red-600 text-white block w-full py-2 rounded-md text-center"
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <li>
                  <Link
                    to="/login"
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 text-center"
                  >
                    Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
