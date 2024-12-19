import React,{useState} from 'react'
import axios from "axios";

function Login() {
  const [username,setusername]=useState("");
  const [password,setpassword]=useState("");
  
  const login = () => {
    const data = {username: username, password: password};
    axios.post("http://localhost:3001/auth/login", 
    data).then((response) => {
      console.log(response.data);
    });
  };
      

  return (
    <div>
      <input type = "text" 
      onChange={(event) => {
        setusername(event.target.value);
      }}/>
      <input type = "password"
      onChange={(event) => {
        setpassword(event.target.value);
      }}/>

      <button onClick={login}>Login</button>
    </div>
  )
}

export default Login;
