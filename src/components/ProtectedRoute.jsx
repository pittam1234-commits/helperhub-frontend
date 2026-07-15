import { Navigate } from "react-router-dom";

function ProtectedRoute({
  children,
  allowedRoles,
}) {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (
    allowedRoles &&
    !allowedRoles.includes(role)
  ) {
    if (role === "ADMIN") {
      return (
        <Navigate
          to="/admin"
          replace
        />
      );
    }

    if (role === "WORKER") {
      return (
        <Navigate
          to="/worker/dashboard"
          replace
        />
      );
    }

    if (role === "USER") {
      return (
        <Navigate
          to="/workers"
          replace
        />
      );
    }

    return <Navigate to="/" replace />;
  }

  return children;
}

export default ProtectedRoute;