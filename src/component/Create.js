import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

const cohortName = "2108-ECE-RM-WEB-PT";
const APIURL = `https://strangers-things.herokuapp.com/api/${cohortName}`;

const Create = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [location, setLocation] = useState("");
  const [willDeliver, setWilldeliver] = useState(false);
  let navigate = useNavigate();

  async function submitPost(event) {
    event.preventDefault();
    const resp = await fetch(`${APIURL}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        post: {
          title,
          description,
          price,
          willDeliver,
        },
      }),
    });
    const json = await resp.json();
    navigate("/posts");
  }
  if (localStorage.getItem("token") === null) {
    return (
      <>
        <h1>Please Login</h1>
        <Link to="/account/login">Login/Register</Link>
      </>
    );
  }
  return (
    <>
      <h3 className="title">Create Post</h3>

      <form className="title" onSubmit={submitPost}>
        <input
          className="field"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <br></br>
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <br></br>
        <input
          type="text"
          placeholder="Price"
          value={price}
          onChange={(event) => setPrice(event.target.value)}
        />
        <br></br>
        <input
          type="text"
          placeholder="Location"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
        />
        <br></br>
        <input type="checkbox" onChange={() => setWilldeliver(true)} />
        Will deliver
        <br></br>
        <button>Post</button>
      </form>
    </>
  );
};

export default Create;
