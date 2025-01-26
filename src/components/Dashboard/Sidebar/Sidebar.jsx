import { useState } from "react";
import { GrLogout } from "react-icons/gr";
import { AiOutlineBars } from "react-icons/ai";
import AdminMenu from "./Menu/AdminMenu";
import DonorMenu from "./Menu/DonorMenu";
import VolunteerMenu from "./Menu/VolunteerMenu";
import MenuItem from "./Menu/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/logo.png";
import useRole from "../../../hooks/useRole";
import { FcSettings } from "react-icons/fc";
import useAuth from "../../../hooks/useAuth";

const Sidebar = () => {
  const { logOut } = useAuth();
  const [isActive, setActive] = useState(false); // Sidebar state for mobile
  const [role, isLoading] = useRole();
  const [selectedItem, setSelectedItem] = useState(null);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logOut(); // Call logout function
      navigate("/"); // Redirect to home page
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const handleToggle = () => {
    setActive(!isActive); // Toggle sidebar visibility
  };

  const handleMenuItemClick = (item) => {
    setSelectedItem(item);
    setActive(false); // Close sidebar after menu item is clicked (mobile view)
  };

  return (
    <>
      {/* Mobile Navbar */}
      <div className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 text-white flex justify-between md:hidden">
        <div>
          <div className="block cursor-pointer p-4 font-bold">
            <Link to="/">
              <span className="font-bold font-rancho text-3xl">RedAid</span>
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-red-600"
          aria-label="Toggle Sidebar"
        >
          <AiOutlineBars className="h-5 w-5 text-white" />
        </button>
      </div>

      {/* Backdrop for Mobile View */}
      {isActive && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={handleToggle}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`z-30 md:fixed flex flex-col justify-between overflow-x-hidden bg-gradient-to-b from-red-500 via-red-600 to-red-700 text-white w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-200 ease-in-out`}
      >
        <div>
          {/* Sidebar Logo */}
          <div className="w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-white bg-opacity-20 mx-auto">
            <Link to="/">
              <img
                className="hidden md:block w-auto h-16 rounded-full border-2 border-white bg-white"
                src={logo}
                alt="logo"
                width="100"
                height="100"
              />
            </Link>
          </div>

          {/* Nav Items */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            <nav>
              {role === "admin" && (
                <AdminMenu
                  onItemClick={handleMenuItemClick}
                  selectedItem={selectedItem}
                />
              )}
              {role === "donor" && (
                <DonorMenu
                  onItemClick={handleMenuItemClick}
                  selectedItem={selectedItem}
                />
              )}
              {role === "volunteer" && (
                <VolunteerMenu
                  onItemClick={handleMenuItemClick}
                  selectedItem={selectedItem}
                />
              )}
            </nav>
          </div>
        </div>

        {/* Footer Section */}
        <div>
          <span className="md:inline font-bold font-rancho text-3xl md:text-5xl">
            RedAid
          </span>

          <hr className="border-white mb-4" />

          <MenuItem
            icon={FcSettings}
            label="Profile"
            address="/dashboard/profile"
            onClick={() => handleMenuItemClick("profile")}
            isSelected={selectedItem === "profile"}
            iconClassName="text-white"
          />
          <button
            onClick={handleLogout}
            className="flex w-full items-center px-4 py-2 mt-5 text-white hover:bg-red-600 hover:bg-opacity-80 transition-colors duration-300 transform"
          >
            <GrLogout className="w-5 h-5" />
            <span className="mx-4 font-medium">Logout</span>
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
