import "./Login.css"

import Header from "../../Components/Header/Header";
import { useState } from "react";
import axios from "axios";

export const Login = () => {

  const [email,setEmail] = useState();
  const [password,setPassword] = useState();


  const pushData = async (e) => {
    e.preventDefault();

    const userInfo = {
      email:email,password:password
    };

    console.log(userInfo,"courseDetails")
    const user = await axios.post("http://localhost:4000/login",userInfo);
    const token = user.data.token;

    localStorage.setItem('token', token);
    
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