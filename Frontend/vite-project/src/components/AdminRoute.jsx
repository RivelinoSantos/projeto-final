import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {

  const usuario = JSON.parse(
    localStorage.getItem("usuario")
  );

  if (!usuario?.admin) {
    return <Navigate to="/" />;
  }

  return children;
}