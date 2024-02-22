import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login/Login";
import Instructor from "./pages/Instructor/Instructor";
import AdminPanel from "./pages/Admin/AdminPanel";
import AddCourse from "./Components/Add-Course/AddCourse";
import ScheduleLecture from "./Components/Schedule-Lecture/ScheduleLecture";
import { useEffect, useState } from "react";
import Logout from "./Components/Logout/Logout";
import axios from "axios";

const token = localStorage.getItem("token");

function App() {
  const [user, setUser] = useState({ role: "" });

  async function fetchData() {
    try {
      const response = await axios.get(
        "https://lecture-scheduling-app.onrender.com/login-details",
        {
          headers: {
            Authorization: "Bearer " + token,
          },
        }
      );
      setUser({ role: response.data.user.role });
    } catch (error) {
      console.error("Error fetching instructors:", error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {user.role == "admin" ? (
            <>
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/add-course" element={<AddCourse />} />
              <Route path="/schedule-lecture" element={<ScheduleLecture />} />
              <Route path="/logout" element={<Logout />} />
            </>
          ) : user.role == "instructor" ? (
            <>
              <Route path="/instructor" element={<Instructor />} />
              <Route path="/logout" element={<Logout />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<Login />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
