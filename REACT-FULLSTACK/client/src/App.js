import "./App.css";
import { BrowserRouter as Router, Route, Routes, Link, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import CreatePost from "./pages/CreatePost";
import Post from "./pages/Post";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import { AuthContext } from "./helpers/AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [authState, setAuthState] = useState(
    {
      username: "",
      id: 0,
      status: false,
    }
  );
  const navigate = useNavigate(); // Now works because App is inside Router.

  useEffect(() => {
    axios
      .get("http://localhost:3001/auth/auth", {
        headers: { accessToken: localStorage.getItem("accessToken") },
      })
      .then((response) => {
        if (response.data.error) {
          setAuthState({...authState, status: false});
          navigate("/login");
        } else {
          setAuthState(
            {
              username: response.data.username,
              id: response.data.id,
              status: true,
            }
          );
        }
      });
  }, []);

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAuthState({username: "",
      id: 0,
      status: false});
  }

  return (
    <div className="App">
      <AuthContext.Provider value={{ authState, setAuthState }}>
        <div className="navbar">
          <Link to="/"> Home Page</Link>
          {authState && <Link to="/createpost"> Create A Post</Link>}
          {!authState.status ?(
            <>
              <Link to="/login"> Login</Link>
              <Link to="/registration"> Registration</Link>
            </>
          ):(
            <button onClick={logout}>Logout</button>
          )}
          <h1>{authState.username}</h1>
        </div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/createpost" element={<CreatePost />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/login" element={<Login />} />
          <Route path = "*" element = { <PageNotFound/>}/>
        </Routes>
      </AuthContext.Provider>
    </div>
  );
}

// Wrap App component in Router
export default function WrappedApp() {
  return (
    <Router>
      <App />
    </Router>
  );
}
