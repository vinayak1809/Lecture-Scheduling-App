import "./Login.css"

import Header from "../../Components/Header/Header";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


export const Login = () => {
  const navigate = useNavigate();

  const [email,setEmail] = useState();
  const [password,setPassword] = useState();


  const pushData = async (e) => {
    e.preventDefault();

    const userInfo = {
      email:email,password:password
    };

    const user = await axios.post("https://lecture-scheduling-app.onrender.com/login",userInfo);
    const token = user.data.token;
    if (token){
      localStorage.setItem('token', token);
    }
    if(user.data.user.role == "admin"){
      navigate("/admin");
    }else if(user.data.user.role == "instructor"){
      navigate("/instructor");
    }else{
      navigate("/login");
    }
    };

  return (
    <div>
        <Header />
        <form onSubmit={(e)=>{pushData(e)}}>
          <ul class="form-style-1">

              <li>
                <label>Email <span class="required">*</span></label>
                <input type="text" name="field1" class="field-divided" placeholder="Name" 
                onChange={(e) => setEmail(e.target.value)}/>
              </li>

              <li>
                <label>Password <span class="required">*</span></label>
                <input type="password" name="field1" class="field-divided" placeholder="Password" 
                onChange={(e) => setPassword(e.target.value)}/>
              </li>
            
              <li>
                  <input type="submit" value="Login" />
              </li>
              
          </ul>
        </form>

    </div>
  )
}

export default Login;