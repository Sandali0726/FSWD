import React,{useState} from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
   const navigate = useNavigate();
  const [username,setusername]=useState("");
  const [password,setpassword]=useState("");
  
  const login = () => {
    const data = {username: username, password: password};
    axios.post("http://localhost:3001/auth/login", 
    data).then((response) => {
      if(response.data.error){
        alert(response.data.error);
      } else{
        sessionStorage.setItem("accessToken", response.data);
        navigate("/");}}
      );
  };
  
      

  return (
    <div className="loginContainer">
    <label>Username:</label>
      <input type = "text" 
      onChange={(event) => {
        setusername(event.target.value);
      }}/>
      <label>Password:</label>
      <input type = "password"
      onChange={(event) => {
        setpassword(event.target.value);
      }}/>

      <button onClick={login}>Login</button>
    </div>
  )
}

export default Login;
