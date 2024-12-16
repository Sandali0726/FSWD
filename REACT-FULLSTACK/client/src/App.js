import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [listOfPosts, setListOfPosts] = useState([]); // Create a state variable to store the list of posts
  
  useEffect(() => {
    axios.get("http://localhost:3001/posts")// Set the list of posts to the response data
      .then((response) => {
        setListOfPosts(response.data)
        
      });
  }, []);

  return (
    <div className="App">
      {listOfPosts.map((value,key) => {
        return (
          <div className='post'>
            <div className = "title"> {value.title}</div>
            <div className = "body"> {value.postText}</div>
            <div className = "footer"> {value.username}</div>
          </div>
          );
      })}
    </div>
    );
}

export default App;
