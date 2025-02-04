import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import PropTypes from "prop-types";

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useContext(CurrentUserContext);
  if (!isLoggedIn) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}

export default ProtectedRoute;

ProtectedRoute.propTypes = {
  children: PropTypes.object,
};
