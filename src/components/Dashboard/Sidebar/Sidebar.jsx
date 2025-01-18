import { useState } from "react";
import { GrLogout } from "react-icons/gr";
import { AiOutlineBars } from "react-icons/ai";
import AdminMenu from "./Menu/AdminMenu";
import DonorMenu from "./Menu/DonorMenu";
import VolunteerMenu from "./Menu/VolunteerMenu";
import MenuItem from "./Menu/MenuItem";
import { Link, useNavigate } from "react-router-dom";
import { BsGraphUp } from "react-icons/bs";

const Sidebar = ({ logOut }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userRole, setUserRole] = useState("admin"); // Default role set to 'admin'
  const navigate = useNavigate();

  const handleToggle = () => setIsMenuOpen((prev) => !prev);

  // Handle role change and navigate to the corresponding route
  const handleRoleChange = (e) => {
    const role = e.target.value;
    setUserRole(role);

    // Navigate to the corresponding dashboard route
    switch (role) {
      case "admin":
        navigate("/dashboard/admin");
        break;
      case "donor":
        navigate("/dashboard/donor");
        break;
      case "volunteer":
        navigate("/dashboard/volunteer");
        break;
      default:
        navigate("/");
    }
  };

  const renderMenu = () => {
    switch (userRole) {
      case "admin":
        return <AdminMenu />;
      case "donor":
        return <DonorMenu />;
      case "volunteer":
        return <VolunteerMenu />;
      default:
        return null;
    }
  };

  return (
    <>
      {/* Mobile Navbar */}
      <div className="bg-gray-100 text-gray-800 flex justify-between md:hidden">
        <Link to="/" className="block p-4 font-bold">
          <img src="/logo.png" alt="Logo" width="100" height="100" />
        </Link>
        <button
          onClick={handleToggle}
          aria-expanded={isMenuOpen}
          aria-label="Toggle navigation menu"
          className="p-4 focus:outline-none focus:bg-gray-200"
        >
          <AiOutlineBars className="h-5 w-5" />
        </button>
      </div>

      {/* Sidebar */}
      <div
        className={`z-10 md:fixed flex flex-col justify-between overflow-x-hidden bg-gray-100 w-64 space-y-6 px-2 py-4 absolute inset-y-0 left-0 transform ${
          isMenuOpen ? "-translate-x-full" : "translate-x-0"
        } md:translate-x-0 transition duration-200 ease-in-out`}
      >
        {/* Logo Section with Dropdown */}
        <div className="hidden md:flex px-4 py-2 shadow-lg rounded-lg justify-between items-center bg-lime-100 mx-auto">
          <Link to="/" className="mr-4">
            <img src="/logo.png" alt="Logo" width="100" height="100" />
          </Link>
          <select
            value={userRole}
            onChange={handleRoleChange}
            className="p-2 border border-gray-300 rounded"
          >
            <option value="admin">Admin</option>
            <option value="donor">Donor</option>
            <option value="volunteer">Volunteer</option>
          </select>
        </div>

        {/* Role-Specific Menu */}
        <div className="flex flex-col justify-between flex-1 mt-6">
          <nav>
            {renderMenu()}
            <MenuItem
              icon={BsGraphUp}
              label="Statistics"
              address="/dashboard"
            />
          </nav>
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
