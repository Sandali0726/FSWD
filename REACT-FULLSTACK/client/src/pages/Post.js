import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../helpers/AuthContext";

function Post() {
  const { id } = useParams();
  const [postObject, setPostObject] = useState({});
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { authState } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch post data
    axios.get(`http://localhost:3001/posts/byId/${id}`)
      .then((response) => setPostObject(response.data))
      .catch((error) => console.error("Error fetching post:", error));

    // Fetch comments
    axios.get(`http://localhost:3001/comments/${id}`)
      .then((response) => setComments(response.data))
      .catch((error) => console.error("Error fetching comments:", error));
  }, [id]);

  const addComment = () => {
    if (!newComment.trim()) return; // Avoid empty comments
    axios.post(
      "http://localhost:3001/comments",
      {
        commentBody: newComment,
        PostId: id,
      },
      {
        headers: {
          accessToken: localStorage.getItem("accessToken"),
        },
      }
    )
    .then((response) => {
      if (response.data.error) {
        console.error(response.data.error);
      } else {
        setComments([...comments, { commentBody: newComment, username: response.data.username }]);
        setNewComment("");
      }
    })
    .catch((error) => console.error("Error adding comment:", error));
  };

  const deleteComment = (commentId) => {
    axios.delete(`http://localhost:3001/comments/${commentId}`, {
      headers: { accessToken: localStorage.getItem("accessToken") },
    })
    .then(() => {
      setComments(comments.filter((comment) => comment.id !== commentId));
    })
    .catch((error) => console.error("Error deleting comment:", error));
  };

  const deletePost = () => {
    axios.delete(`http://localhost:3001/posts/${id}`, {
      headers: { accessToken: localStorage.getItem("accessToken") },
    })
    .then(() => {
      navigate("/");
    })
    .catch((error) => console.error("Error deleting post:", error));
  };

  const editPost = (option) => {
    const newValue = prompt(`Enter New ${option === "title" ? "Title" : "Text"}:`);
    if (!newValue || !newValue.trim()) return; // Avoid empty inputs

    const endpoint = option === "title" ? "title" : "postText";
    const fieldKey = option === "title" ? "newTitle" : "newText";

    axios.put(
      `http://localhost:3001/posts/${endpoint}`,
      {
        [fieldKey]: newValue,
        id: id,
      },
      {
        headers: { accessToken: localStorage.getItem("accessToken") },
      }
    )
    .then(() => {
      setPostObject({
        ...postObject,
        [option === "title" ? "title" : "postText"]: newValue,
      });
    })
    .catch((error) => console.error(`Error editing ${option}:`, error));
  };

  return (
    <div className="postPage">
      <div className="leftSide">
        <div className="post" id="individual">
          <div
            className="title"
            onClick={() => {
              if (authState.username === postObject.username) {
                editPost("title");
              }
            }}
          >
            {postObject.title}
          </div>
          <div
            className="body"
            onClick={() => {
              if (authState.username === postObject.username) {
                editPost("body");
              }
            }}
          >
            {postObject.postText}
          </div>
          <div className="footer">
            {postObject.username}
            {authState.username === postObject.username && (
              <button onClick={deletePost}>Delete Post</button>
            )}
          </div>
        </div>
      </div>
      <div className="rightSide">
        <div className="addCommentContainer">
          <input
            type="text"
            placeholder="Comment..."
            autoComplete="off"
            value={newComment}
            onChange={(event) => setNewComment(event.target.value)}
          />
          <button onClick={addComment}>Add Comment</button>
        </div>
        <div className="listOfComments">
          {comments.map((comment, key) => (
            <div key={key} className="comment">
              {comment.commentBody}
              <label> Username: {comment.username}</label>
              {authState.username === comment.username && (
                <button onClick={() => deleteComment(comment.id)}>Delete</button>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Post;
