import React,{useState } from 'react'
import axios from "axios";

 function ChangePassword() {
  const [OldPassword,setOldPassword] = useState("")
  const [NewPassword,setNewPassword] = useState("")

  const ChangePassword = () => {
    axios.put("http://localhost:3001/auth/ChangePassword"
    ,{OldPassword:OldPassword,
      NewPassword:NewPassword
    },
    {headers:
      {accessToken:localStorage.getItem
        ('accessToken')}}
      ).then((response) => {
        if(response.data.error){
          alert(response.data.error)
        }
      })
  };
  return (
    <div>
        <h1>ChangePassword</h1>
        <input type="text"
        placeholder='Old Password...' 
        onChange = {(event) =>{
          setOldPassword(event.target.value);
        }}
        />
        <input type="text"
        placeholder='New Password...' 
        onChange = {(event) =>{
          setNewPassword(event.target.value);
        }}
        />
        
        
          <button onClick ={ChangePassword}>Save change</button>
    </div>
  )
}
export default ChangePassword;