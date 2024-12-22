import React, { useEffect, useState,useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";
import { useNavigate } from "react-router-dom";

function Post() {
  let { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { authState } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`http://localhost:3001/posts/byId/${id}`).then((response) => {
      setPostObject(response.data);
    });
  

  axios.get(`http://localhost:3001/comments/${id}`).then((response) => {
    setComments(response.data);
  });
},[]);

const addComment = () => {
  axios.post("http://localhost:3001/comments", {
    commentBody: newComment,
    PostId: id,
  },
  {
    headers: {
      accessToken: localStorage.getItem("accessToken"),}
  }
).then((response) => {
    if (response.data.error) {
      alert(response.data.error);
    } else {
      const commentToAdd = {commentBody: newComment, username: response.data.username};
    setComments([...comments,commentToAdd]);
    setNewComment("");
  };
})};

const deleteComment = (id) => {
  axios.delete(`http://localhost:3001/comments/${id}`, {
    headers: {
      accessToken: localStorage.getItem("accessToken"),
    },
  }).then(() => {
    setComments(
      comments.filter((val) => {
        return val.id != id;})
    );})
}

const navigate = useNavigate();

const deletepost = (id) => {
  axios
    .delete(`http://localhost:3001/posts/${id}`, {
      headers: { accessToken: localStorage.getItem("accessToken") },
    })
    .then(() => {
      navigate("/");
    });
};


  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          <div className="title"> {postObject.title} </div>
          <div className="body">{postObject.postText}</div>
          <div className="footer">{postObject.username}{authState.username === postObject.username &&  
            <button 
              onClick= {() => 
                  {deletepost(postObject.id)
                  }}
                  >delete</button>}</div>
        </div>
      </div>

      <div className="rightSide">
        <div className="addCommentContainer">
          <input type ="text" 
          placeholder = "Comment..." 
          autoComplete="off"
          value={newComment}
         
          onChange={(event) => 
            {setNewComment(event.target.value)}}
          />
          <button onClick={addComment}> Add Comment </button>
        </div>

        <div className="listOfComments">
          {comments.map((comment, key) => {
            return (
              <div key={key} className="comment">
                <div>{comment.commentBody}</div>
                <div><strong>Username:</strong> {comment.username}</div>
                {authState.username==comment.username && <button onClick= {() => {deleteComment(comment.id)}}>delete</button>}
                </div>
            
            );
          })}
        </div>

      </div>
    </div>
  );
}

export default Post;