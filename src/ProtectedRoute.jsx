import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;
function ProtectedRoute() {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setAuthenticated(false);
        setLoading(false);
        return;
      }


      try {
        const response = await fetch(`${API_URL}/user/home`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          setAuthenticated(true);
        } else {
          setAuthenticated(false);
          localStorage.removeItem("token");
        }
      } catch (error) {
        console.error(error);
        setAuthenticated(false);
      }

      setLoading(false);
    };

    verifyToken();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return authenticated ? <Outlet /> : <Navigate to="/login" replace />;
}

export default ProtectedRoute;