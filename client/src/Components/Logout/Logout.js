import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const cleanStorage = () => {
    localStorage.removeItem("token");
  };

  useEffect(() => {
    cleanStorage();
    navigate("/login");
  }, []);

  return null;
};

export default Logout;
