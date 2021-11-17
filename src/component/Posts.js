import React, { useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";

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
    try {
      const respObj = await fetch(`${APIURL}/posts/${postId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
    } catch (error) {
      console.log(error);
    }
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
          <h5>{post.location}</h5>
          <p>{post.description}</p>

          {post.willDeliver ? <h5>Will deliver</h5> : null}
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
          
        </div>
      ))}
    </>
  );
};

export default Posts;
