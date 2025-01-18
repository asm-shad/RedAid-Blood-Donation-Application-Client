import PropTypes from "prop-types";
import { NavLink } from "react-router-dom";

const MenuItem = ({ label, address, icon: Icon }) => {
  return (
    <NavLink
      to={address}
      end
      className={({ isActive }) =>
        `flex items-center px-4 py-2 my-5 transition-colors duration-300 transform ${
          isActive
            ? "bg-red-100 text-red-700"
            : "text-gray-600 hover:bg-red-50 hover:text-red-700"
        }`
      }
    >
      <Icon className="w-5 h-5" />
      <span className="mx-4 font-medium">{label}</span>
    </NavLink>
  );
};

MenuItem.propTypes = {
  label: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
};

export default MenuItem;
