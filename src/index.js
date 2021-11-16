import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Posts from "./component/Posts";
import Login from "./component/Login";
import Register from "./component/Register";
import Profile from "./component/Profile";
import Create from "./component/Create";
import Header from "./component/Header";
import Messages from "./component/Messages";
import Home from "./component/Home";

const App = () => {
  const [token, setToken] = useState("");
  const [posts, setPosts] = useState([]);
  const [profile, setProfile] = useState({});
  const [singlePost, setSinglepost] = useState([]);
  const [userId, setUserid] = useState("");
  console.log(userId);

  return (
    <>
      <Header />
      <Routes>
        <Route 
        exact path="/" 
        element={
            <Home
             profile={profile} 
            />
          } 
        />
        <Route
          path="/posts"
          element={
            <Posts
              setSinglepost={setSinglepost}
              setPosts={setPosts}
              posts={posts}
              token={token}
              profile={profile}
            />
          }
        />
        <Route
          exact
          path="/account/:method"
          element={<Login setToken={setToken} />}
        />
        <Route
          path="/profile"
          element={
            <Profile
              token={token}
              setUserid={setUserid}
              setProfile={setProfile}
              profile={profile}
            />
          }
          setProfile={setProfile}
        />
        <Route path="/create" element={<Create />} />
        <Route
          path="/message"
          element={<Messages userId={userId} posts={posts} />}
        />
      </Routes>
    </>
  );
};

ReactDOM.render(
  <Router>
    <App />
  </Router>,

  document.getElementById("app")
);
