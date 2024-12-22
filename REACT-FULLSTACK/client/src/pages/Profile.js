
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

 function Profile() {
    let { id } = useParams();
    const [username, setUsername] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:3001/auth/basicInfo/${id}`).then((response) => {
            setUsername(response.data.username)})
        });

  return (
    <div className='ProfilePageContainer'>
        <div className='basicInfo'><h1>Username:{username}</h1></div>
        <div className='listOfPosts'></div>
        </div>
  )
}

export default Profile;
