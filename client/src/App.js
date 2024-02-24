import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import Instructor from "./pages/Instructor/Instructor";
import AdminPanel from "./pages/Admin/AdminPanel";
import AddCourse from "./Components/Add-Course/AddCourse";
import ScheduleLecture from "./Components/Schedule-Lecture/ScheduleLecture";
import Logout from "./Components/Logout/Logout";
import NotFound from "./pages/Not-Found/NotFound";

import { useContext } from "react";
import UserContext from "./context/UserContext";

function App() {
  const { user } = useContext(UserContext);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {user.role === "admin" ? (
            <>
              <Route path="*" element={<NotFound />} />
              <Route path="/" element={<Navigate to="/admin" />} />
              <Route path="/login" element={<Navigate to="/admin" />} />
              <Route path="/admin" element={<AdminPanel />} />
              <Route path="/add-course" element={<AddCourse />} />
              <Route path="/schedule-lecture" element={<ScheduleLecture />} />
              <Route path="/logout" element={<Logout />} />
            </>
          ) : user.role === "instructor" ? (
            <>
              <Route path="*" element={<NotFound />} />
              <Route path="/" element={<Navigate to="/instructor" />} />
              <Route path="/login" element={<Navigate to="/instructor" />} />
              <Route path="/instructor" element={<Instructor />} />
              <Route path="/logout" element={<Logout />} />
            </>
          ) : (
            <>
              <Route path="*" element={<NotFound />} />
              <Route path="/" element={<Navigate to="/login" />} />
              <Route path="/login" element={<Login />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
