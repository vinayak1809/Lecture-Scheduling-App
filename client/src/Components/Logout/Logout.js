import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../../context/UserContext";

const Logout = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext);

  const cleanStorage = () => {
    localStorage.removeItem("token");
  };

  useEffect(() => {
    cleanStorage();
    setUser({ user: { role: "" } });

    navigate("/login");
  }, []);

  return null;
};

export default Logout;
