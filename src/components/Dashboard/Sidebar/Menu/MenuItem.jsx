import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const MenuItem = ({ label, address, icon: Icon, iconClassName }) => (
  <NavLink
    to={address}
    end
    className={({ isActive }) =>
      `flex items-center px-4 py-2 my-5 transition-colors duration-300 transform rounded-md ${
        isActive
          ? "bg-red-800 text-white" // Active state with a reddish background and white text
          : "text-gray-100 hover:bg-red-500 hover:text-white" // Hover effect for non-active state
      }`
    }
  >
    <Icon className={`w-5 h-5 ${iconClassName}`} />
    <span className="mx-4 font-medium">{label}</span>
  </NavLink>
);

MenuItem.propTypes = {
  label: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
};

export default MenuItem;
