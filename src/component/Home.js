import React from "react"

const Home = ({ profile }) => {
  const userName = profile.username
  if (localStorage.getItem("token") === null) {
    return (
      <>
        <h2 className="title">Welome to Stranger's Things</h2>
        <h3 className="title">
          Login or Create an account to find the perfect items from strangers
          just like you!
        </h3>
      </>
    )
  }
  return (
    <>
      <h1 className="title">Welome to Stranger's Things</h1>
      <h2 className="title">You are currently logged in as {userName}.</h2>
    </>
  )
}

export default Home
