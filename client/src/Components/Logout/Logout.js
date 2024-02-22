import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const cleanStorage = () => {
    console.log("ehehhe");
    localStorage.removeItem("token");
  };

  useEffect(() => {
    cleanStorage();
    navigate("/login");
  }, []);

  return null; // Since Logout is not rendering anything, return null
};

export default Logout;
