import React, { useEffect, useState } from "react";

const cohortName = "2108-ECE-RM-WEB-PT";
const APIURL = `https://strangers-things.herokuapp.com/api/${cohortName}`;

const Profile = ({ profile, setProfile, setUserid, userId }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      const resp = await fetch(`${APIURL}/users/me`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await resp.json();
      setUserid(data.data._id);
      setProfile(data.data);
      setMessages(data.data.messages);
    };
    fetchProfile();
  }, []);

  return (
    <>
      <h1>Welcome {profile.username ? profile.username : ""}</h1>
      <h3>Messages to Me:</h3>
      {messages.map((item) =>
        profile._id !== item.fromUser._id ? (
          <div className="post" key={item._id}>
            <h2>Title: {item.post.title}</h2>
            <h3>From: {item.fromUser.username}</h3>
            <h4>{item.content}</h4>
          </div>
        ) : null
      )}
      <h3>Messages from me:</h3>
      {messages.map((item) =>
        profile._id === item.fromUser._id ? (
          <div className="post" key={item._id}>
            <h2>Title: {item.post.title}</h2>
            <h3>From: {item.fromUser.username}</h3>
            <h4>{item.content}</h4>
          </div>
        ) : null
      )}
    </>
  );
};

export default Profile;
