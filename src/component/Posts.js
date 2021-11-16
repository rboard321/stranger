import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import message from "./Messages";

const cohortName = "2108-ECE-RM-WEB-PT";
const APIURL = `https://strangers-things.herokuapp.com/api/${cohortName}`;

let navigate = useNavigate;

const Posts = ({ setPosts, posts, profile }) => {
  
  useEffect(() => {
    const fetchPosts = async () => {
      const resp = await fetch(`${APIURL}/posts`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await resp.json();
      setPosts(data.data.posts);
    };
    fetchPosts();
  }, []);

  const handleDelete = async (postId) => {
    
    const respObj = await fetch(`${APIURL}/posts/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    const fetchPosts = async () => {
      const resp = await fetch(`${APIURL}/posts`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await resp.json();
      setPosts(data.data.posts);
    };
    fetchPosts();
  };

  return (
    <>
      <h1>Posts</h1>
      {posts.map((post) => (
        <div className="post" key={post.id}>
          <h2>{post.title}</h2>
          <h4>{post.price}</h4>
          <p>{post.description}</p>
          {post.isAuthor === false ? (
            <Link to="/message" state={{ id: post._id }} className="btnMessage">
              Message/View
            </Link>
          ) : null}
          {post.isAuthor === true ? (
            <button className="btn" onClick={() => handleDelete(post._id)}>
              Delete
            </button>
          ) : null}
          <Link to="/message" state={{ id: post._id }} className="btnMessage">
            Message/View
          </Link>
        </div>
      ))}
    </>
  );
};

export default Posts;
