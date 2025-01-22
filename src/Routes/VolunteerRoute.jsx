import PropTypes from "prop-types";
import useRole from "../hooks/useRole";
import LoadingSpinner from "../components/LoadingSpinner/LoadingSpinner";
import { Navigate } from "react-router-dom";

const VolunteerRoute = ({ children }) => {
  const [role, isLoading] = useRole();

  if (isLoading) return <LoadingSpinner />;
  if (role === "volunteer") return children;
  return <Navigate to="/dashboard" replace="true" />;
};

VolunteerRoute.propTypes = {
  children: PropTypes.element,
};

export default VolunteerRoute;
