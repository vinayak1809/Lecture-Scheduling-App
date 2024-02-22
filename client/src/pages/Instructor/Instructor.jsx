import { useEffect, useState } from "react";
import Header from "../../Components/Header/Header";
import "./Instructor.css";
import axios from "axios";
import { Link } from "react-router-dom";

const Instructor = () => {
  const [insSchedules, setInsScheules] = useState();

  const token = localStorage.getItem("token");

  const fetchData = async () => {
    try {
      const response = await axios.get("https://lecture-scheduling-app.onrender.com/get-instructor-schedules", {headers: {
        Authorization: `Bearer ${token}`,
      }});
      setInsScheules(response.data.course)

    } catch (error) {
      console.error("Error fetching schedule:", error);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);
  
  return (
    <div>
       <Header />
      
       <nav>
          <li>Ideamagix</li>
          <Link key={0} to={"/logout"}>
                  <li>Logout</li>
          </Link>
        </nav>
        
    <main>
       
        <div className="task-list" id="task-list">

        <table>
          <tr>
            <th>Lecture Name</th>
            <th>Date</th>
            <th>Batch</th>
          </tr>

            {insSchedules && insSchedules.map(schedule => (

                  <tr>
                    <th>{schedule.courseID.name}</th>
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

export default Instructor;