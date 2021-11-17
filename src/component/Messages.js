import React, { useState } from "react";

import { useLocation } from "react-router-dom";

const cohortName = "2108-ECE-RM-WEB-PT";
const APIURL = `https://strangers-things.herokuapp.com/api/${cohortName}`;
const Message = ({ posts, userId }) => {
  const [message, setMessage] = useState("");
  const [author, setAuthor] = useState("");
  const location = useLocation();
  const { id } = location.state;

  async function sendMessage(message) {
    console.log(`${APIURL}/posts/${id}`);
    try {
      const resp = await fetch(`${APIURL}/posts/${id}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({
          message: {
            content: message,
          },
        }),
      });
      const data = await resp.json();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      <h1>Posts: </h1>
      {posts.map((post) =>
        id === post._id ? (
          <div className="post" key={post.id}>
            <h2>{post.title}</h2>
            <h4>{post.price}</h4>
            <div>{post.description}</div>
            <form
              onSubmit={async (event) => {
                event.preventDefault();
                sendMessage(message);
              }}
            >
              <input
                type="text"
                placeholder="message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
              ></input>
              <button>Send</button>
            </form>
          </div>
        ) : null
      )}
    </>
  );
};

export default Message;
