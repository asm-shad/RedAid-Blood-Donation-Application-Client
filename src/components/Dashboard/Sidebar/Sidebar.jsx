import { useState } from "react";
import { GrLogout } from "react-icons/gr";
import { AiOutlineBars } from "react-icons/ai";
import AdminMenu from "./Menu/AdminMenu";
import DonorMenu from "./Menu/DonorMenu";
import VolunteerMenu from "./Menu/VolunteerMenu";
import MenuItem from "./Menu/MenuItem";
import { Link } from "react-router-dom";
import { BsGraphUp } from "react-icons/bs";

const Sidebar = ({ userRole, logOut }) => {
  const [isActive, setIsActive] = useState(false);

  const handleToggle = () => {
    setIsActive(!isActive);
  };

  return (
    <>
      {/* Mobile Navbar */}
      <div className="bg-gray-100 text-gray-800 flex justify-between md:hidden">
        <div>
          <div className="block cursor-pointer p-4 font-bold">
            <Link to="/">
              <img
                // className='hidden md:block'
                src="/logo.png"
                alt="logo"
                width="100"
                height="100"
              />
            </Link>
          </div>
        </div>

        <button
          onClick={handleToggle}
          className="mobile-menu-button p-4 focus:outline-none focus:bg-gray-200"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isActive && "-translate-x-full"
        }  md:translate-x-0  transition duration-200 ease-in-out`}
      >
        {/* Logo and Site Name */}
        {/* <div className="flex flex-col items-center space-y-2">
          <img
            src="/logo.png" // Accessing the logo from the public folder
            alt="RedAid Logo"
            className="h-12 w-auto"
          />
          <h1 className="text-xl font-semibold text-red-700">RedAid</h1>
        </div> */}
        <div>
          <div>
            <div className="w-full hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-center items-center bg-lime-100 mx-auto">
              <Link to="/">
                <img
                  // className='hidden md:block'
                  src="/logo.png"
                  alt="logo"
                  width="100"
                  height="100"
                />
              </Link>
            </div>
          </div>

          {/* Nav Items */}
          <div className="flex flex-col justify-between flex-1 mt-6">
            <nav>
              {/*  Menu Items */}
              <DonorMenu />
              <VolunteerMenu />

              <MenuItem
                icon={BsGraphUp}
                label="Statistics"
                address="/dashboard"
              />
              <VolunteerMenu />
            </nav>
          </div>
        </div>

        {/* Footer Section */}
        <div className="mt-auto">
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
