import "./Login.css"

import Header from "../../Components/Header/Header";
import { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { url } from "../../utils/url";
import UserContext from "../../context/UserContext";

export const Login = () => {
  const navigate = useNavigate();

  const [email,setEmail] = useState();
  const [password,setPassword] = useState();

  const {setUser} = useContext(UserContext);

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
      if(user.data.user.role === "admin"){
        console.log(user)
        setUser({role:user.data.user.role})
        navigate("/admin");
        
      }else if(user.data.user.role === "instructor"){
        setUser({role:user.data.user.role})
        navigate("/instructor");
        
      }else{
        setUser({role:user.data.user.role})
        navigate("/login");
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