import React, { useEffect, useState } from "react"

const cohortName = "2108-ECE-RM-WEB-PT"
const APIURL = `https://strangers-things.herokuapp.com/api/${cohortName}`

const Profile = ({ profile, setProfile, setUserid }) => {
  /* This is not entirely necessary, but is considered good practice: Declare your states to be the same "shapes" as the
   * data you intend to include. In this case, you simply declared an empty array as the initial state. In the long run,
   * it may be better to more explicitly define the data you intend to use because we won't necessarily see the layout of
   * that data here while using it.
   *
   * So, instead of `useState([])` you could check what your data will look like and initialize this state as something like
   * `useState([{ fromUser: false}])`. This will allow you, your code editor, and anyone else reading your code to see
   * what you're working with.
   */
  const [messages, setMessages] = useState([])

  useEffect(() => {
    const fetchProfile = async () => {
      const resp = await fetch(`${APIURL}/users/me`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        }
      })
      const data = await resp.json()
      setUserid(data.data._id)
      setProfile(data.data)
      setMessages(data.data.messages)
    }
    /* Your `fetchProfile()` function returns a promise. It is generally good practice to "handle" these using a `try/catch`
     * block (newer syntax) or `.then/.catch` (older syntax). A promise may not resolve correctly and you should have a
     * nice fallback for that. */
    fetchProfile()
  }, [])

  return (
    <>
      <h1 className="title">
        Welcome {profile.username ? profile.username : ""}
      </h1>
      <h3 className="title">Messages to Me:</h3>
      {messages.map((item) =>
        profile._id !== item.fromUser._id ? (
          <div className="post" key={item._id}>
            <h2>Title: {item.post.title}</h2>
            <h3>From: {item.fromUser.username}</h3>
            <h4>{item.content}</h4>
          </div>
        ) : null
      )}
      <h3 className="title">Messages from me:</h3>
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
  )
}

export default Profile
