import "./Login.css"

import Header from "../../Components/Header/Header";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { url } from "../../utils/url";

export const Login = () => {
  const navigate = useNavigate();

  const [email,setEmail] = useState();
  const [password,setPassword] = useState();


  const pushData = async (e) => {
    e.preventDefault();
    try{
      const userInfo = {
        email:email,password:password
      };
  
      const user = await axios.post(`${url}/login`,userInfo);
      const token = user.data.token;

      if (token){
        localStorage.setItem('token', token);
      }
      if(user.data.user.role == "admin"){
        navigate("/admin");
        window.location.reload();
      }else if(user.data.user.role == "instructor"){
        navigate("/instructor");
        window.location.reload();
      }else{
        navigate("/login");
        window.location.reload();
      }
    }catch(err){
      alert(err.response.data.error)
    }
    };

  return (
    <div>
        <Header />
        <form onSubmit={(e)=>{pushData(e)}}>
          <ul className="form-style-1">

              <li>
                <label>Email <span className="required">*</span></label>
                <input type="text" name="field1" className="field-divided" placeholder="Name" 
                onChange={(e) => setEmail(e.target.value)}/>
              </li>

              <li>
                <label>Password <span className="required">*</span></label>
                <input type="password" name="field1" className="field-divided" placeholder="Password" 
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