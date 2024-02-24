import UserContext from "./UserContext";
import React, { useEffect, useState } from 'react';
import axios from "axios";

const UserContextProvider = ({children}) => {
  const [user, setUser] =useState({user:{role:""}});
  
  const token = localStorage.getItem('token');

  function fetchData(){
    if (token) {
      axios.get("http://localhost:4000/login-details", {
        headers: {
                 Authorization: "Bearer " + token,
        }
      })
      .then(response => {
        setUser(response.data.user);
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
      });
    }
  }

  useEffect(() => {
    fetchData()
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;