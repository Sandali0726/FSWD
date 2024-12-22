
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

 function Profile() {
    let navigate = useNavigate();
    let { id } = useParams();
    const [username, setUsername] = useState("");
    const [listOfPosts, setListOfPost] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:3001/auth/basicinfo/${id}`).then((response) => {
            setUsername(response.data.username)})
        

        axios.get(`http://localhost:3001/posts/byuserId/${id}`).
        then((response) => {
            setListOfPost(response.data)
        });
        },[]);

  return (
    <div className='ProfilePageContainer'>
        <div className='basicInfo'>
          <h1> Username : {username} </h1>
          </div>
        <div className='listOfPosts'>
          {listOfPosts.map((value, key) => {
        return (
          <div key = {key} className = "post">
            <div className="title"> {value.title} </div>
            <div className="body" 
            onClick={() => {
              navigate(`/post/${value.id}`);
            }}
            >
            {value.postText}</div>
            
            <div className="footer">
            <div className="username">{value.username}</div>
            <div className="buttons">
              <label> {value.Likes.length} </label>
            </div>
            </div>
            </div>
        );
      
      })}</div>
        </div>
  )
}

export default Profile;
