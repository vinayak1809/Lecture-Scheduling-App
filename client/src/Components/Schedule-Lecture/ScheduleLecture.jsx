import axios from 'axios';
import React, { useEffect, useState } from 'react'

import Header from '../Header/Header';

const ScheduleLecture = () => {

    const [instructors, setinstructors] = useState();
    const [minDate, setMinDate] = useState('');
    const [courses,setCourse] = useState('');
    
    const [courseID,setCourseID] = useState();
    const [instructorID,setInstructorID] = useState();
    const [day,setDay] = useState("morning");
    const [date,setDate] = useState();


    const pushData = async (e) => {
        e.preventDefault();
    
        const courseDetails = {
            courseID:courseID,
            instructorID:instructorID,
            timeOfDay:day,
            date:date
        };
    
        await axios.post("http://localhost:4000/schedule-instructor",courseDetails);
    };
    
    useEffect(() => {
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        setMinDate(formattedDate);
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:4000/get-instructors");
            setinstructors(response.data.user)
            if (response.data.user.length >0){
                setInstructorID(response.data.user[0]._id)
            }
            console.log(response.data.user)
        } catch (error) {
            console.error("Error fetching instructors:", error);
        }
    };

    const fetchData2 = async () => {
        try {
            const response = await axios.get("http://localhost:4000/get-course");
            setCourse(response.data.course)
            if (response.data.course.lenght >0){
                setCourseID(response.data.course[0]._id)
            }
            console.log(response.data.course)
        } catch (error) {
            console.error("Error fetching Courses:", error);
        }
        };
    
    useEffect(() => {
        fetchData();
        fetchData2();
    }, []);


  return (
    <div>
        <Header />
        <form onSubmit={(e)=>{pushData(e)}}>
          <ul class="form-style-1">
              <li>
                  <label>Subject</label>
                  <select class="field-select"
                    id="level"
                    onChange={(e) => setCourseID(e.target.value)}
                    >
                    {courses && courses.map((course)=>(
                        <option value={course._id}>{course.name}</option>
                    ))} 
                  </select>
              </li>
              <li>
                  <label>Instructor</label>
                  <select  class="field-select"
                    id="level"
                    onChange={(e) => setInstructorID(e.target.value)}
                    >
                    {instructors && instructors.map((instructor)=>(
                        <option value={instructor._id}>{instructor.name}</option>
                    ))} 
                  </select>
              </li>
              
              <li>
                  <label>Batch</label>
                  <select  class="field-select"
                    id="level"
                    onChange={(e) => setDay(e.target.value)}
                    >
                    <option value="morning">Morning</option>
                    <option value="afternoon">Afternoon</option>
                    <option value="evening">Evening</option>
                  </select>
              </li>
              <li>
                  <label>Date</label>
                <input type="date" id="deadline" min={minDate} 
                    onChange={(e) => setDate(e.target.value)}></input>
              </li>           
              <li>
                  <input type="submit" value="Add" />
              </li>
          </ul>
        </form>
    </div>
    
  )
}

export default ScheduleLecture;