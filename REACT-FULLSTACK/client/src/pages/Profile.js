
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../helpers/AuthContext";

 function Profile() {
    let navigate = useNavigate();
    let { id } = useParams();
    const [username, setUsername] = useState("");
    const [listOfPosts, setListOfPost] = useState([]);
    const { authState } = useContext(AuthContext); 

    useEffect(() => {
        axios.get(`http://localhost:3001/auth/basicinfo/${id}`).then((response) => {
            setUsername(response.data.username)})
        

        axios.get(`http://localhost:3001/posts/byuserId/${id}`).
        then((response) => {
            setListOfPost(response.data)
        });
        axios.get(`http://localhost:3001/ChangePassword`).then((response) => {
          setUsername(response.data.username)})
      
        },[]);

  return (
    <div className='ProfilePageContainer'>
        <div className='basicInfo'>
          {" "}
          <h1> Username : {username} </h1>

          {authState.username === username && (
              <button  
                onClick={() => {
                    navigate('/ChangePassword');
                }}
                >
                  {" "}
                  change my password
                  </button>
                  )}
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
