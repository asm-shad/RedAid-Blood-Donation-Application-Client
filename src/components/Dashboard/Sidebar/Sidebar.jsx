import { useState } from "react";
import { GrLogout } from "react-icons/gr";
import { AiOutlineBars } from "react-icons/ai";
import MenuItem from "./Menu/MenuItem";
import AdminMenu from "./Menu/AdminMenu";
import DonorMenu from "./Menu/DonorMenu";
import VolunteerMenu from "./Menu/VolunteerMenu";

const Sidebar = ({ userRole, logOut }) => {
  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  return (
    <>
      {/* Mobile Navbar */}
      <div className="bg-gray-100 text-gray-800 flex justify-between md:hidden">
        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 px-4 py-6 transform ${
          isActive ? "-translate-x-full" : "translate-x-0"
        } md:translate-x-0 transition-transform duration-200`}
      >
        <div className="flex flex-col space-y-4">
          <img
            src="https://via.placeholder.com/150x50" // Replace with your logo
            alt="RedAid"
            className="h-10 mx-auto"
          />

          <nav>
            {userRole === "admin" && <AdminMenu />}
            {userRole === "donor" && <DonorMenu />}
            {userRole === "volunteer" && <VolunteerMenu />}
          </nav>
        </div>

        <div>
          <MenuItem
            label="Profile"
            address="/dashboard/profile"
            icon={GrLogout}
          />
          <button
            onClick={logOut}
            className="flex items-center px-4 py-2 mt-5 text-gray-600 hover:bg-red-50 hover:text-red-700 transition duration-300"
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
