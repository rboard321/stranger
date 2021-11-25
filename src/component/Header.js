import React from "react"

import { Link, useNavigate } from "react-router-dom"

const Header = () => {
  let navigate = useNavigate()
  const token = localStorage.getItem("token")
  return (
    <>
      <header>
        <h1 className="title">Stranger's Things</h1>
        <Link className="link" to="/">
          Home
        </Link>{" "}
        |
        <Link className="link" to="/posts">
          {" "}
          Posts
        </Link>{" "}
        |
        <Link className="link" to="/account/login">
          {" "}
          Login/Register
        </Link>{" "}
        |
        <Link className={token ? "" : "ifLoggedIn"} to="/create">
          {" "}
          Create
        </Link>{" "}
        |
        <Link className={token ? "" : "ifLoggedIn"} to="/profile">
          {" "}
          Profile
        </Link>
        <button
          className={token ? "" : "ifLoggedIn"}
          onClick={() => {
            localStorage.removeItem("token")
            navigate("/posts")
          }}
        >
          log out
        </button>
      </header>
    </>
  )
}

export default Header
