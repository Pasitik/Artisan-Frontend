import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
  //const isAuthenticated = useSelector(state=> state.users.token != null)
  const isAuthenticated = localStorage.getItem("authToken") != null;
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoutes;
