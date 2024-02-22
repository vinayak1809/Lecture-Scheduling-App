import { Link } from "react-router-dom";
import "./AdminPanel.css"
import axios from "axios";
import { useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import { url } from "../../utils/url";

const AdminPanel = () => {
  const [schedules, setSchedules] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${url}/get-schedules`);
        setSchedules(response.data.course)
      } catch (error) {
        console.error("Error fetching schedule:", error);
      }
    };
  
    fetchData();
  }, []);
  
  return (
    <div>
       <Header />
        <nav>
          <li>Ideamagix</li>
          <div className="side">
          <Link to={"/schedule-lecture"} >
                  <li>Schedule Lecture</li>
          </Link>
          <Link to={"/add-course"} >
              <li>Add Course</li>
          </Link>
          <Link to={"/logout"} >
                  <li>Logout</li>
          </Link>
          </div>
        </nav>

        
    <main>
       
        <div className="task-list" id="task-list">

        <table>
          <tr>
            <th>Lecture Name</th>
            <th>Instructor Name</th>
            <th>Date</th>
            <th>Batch</th>
          </tr>

            {schedules && schedules.map(schedule => (

                  <tr>
                    <th>{schedule.courseID.name}</th>
                    <th>{schedule.instructorID.name}</th>
                    <th>{schedule.date}</th>
                    <th>{schedule.timeOfDay}</th>
                  </tr>
              
            ))}

        </table>
        </div>
    </main>

    </div>
  )
}

export default AdminPanel;