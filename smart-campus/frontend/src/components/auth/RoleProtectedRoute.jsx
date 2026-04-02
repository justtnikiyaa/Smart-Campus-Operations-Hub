import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import ProtectedRoute from "./ProtectedRoute";

export default function RoleProtectedRoute({ children, allowRoles = [] }) {
  const { role } = useAuth();

  return (
    <ProtectedRoute>
      {allowRoles.includes(role) ? children : <Navigate to="/unauthorized" replace />}
    </ProtectedRoute>
  );
}
