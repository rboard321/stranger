import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import Profile from "./Profile";

const cohortName = "2108-ECE-RM-WEB-PT";
const APIURL = `https://strangers-things.herokuapp.com/api/${cohortName}`;

const Login = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [loggedIn, setLoggedin] = useState(false);
  const [isMatched, setIsMatched] = useState(false);
  // set boolean state
  const [userId, setUserid] = useState('');
  const params = useParams();

  let navigate = useNavigate();
  //functions go here
  function logIn(resp) {
    if (resp.data) {
      setToken(resp.data.token);
      localStorage.setItem("token", resp.data.token);
      if (resp.data.token == "") {
        setLoggedin(false);
      } else {
        setLoggedin(true);
        navigate("/profile");
      }
    }
  }


  async function loginRoutine() {
    const resp = await fetch(`${APIURL}/users/${params.method}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: {
          username,
          password,
        },
      }),
    });
    const respObj = await resp.json();
    console.log(respObj);
    logIn(respObj);
  }
  if (loggedIn === false) {
    return (
      <>
        <h1>Login/Register</h1>
        <form
          onSubmit={async (event) => {
            event.preventDefault();
            if (params.method !== "register") {
              loginRoutine();
            } else if (password === passwordConfirm) {
              setIsMatched(false);
              loginRoutine();
            } else {
              setIsMatched(true);
            }
          }}
        >
          <input
            type="text"
            placeholder="username"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          ></input>
          <br></br>
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          ></input>
          <button type="submit">Submit</button>
          <br></br>
          {params.method === "register" ? (
            <input
              type="password"
              placeholder="password"
              value={passwordConfirm}
              onChange={(event) => setPasswordConfirm(event.target.value)}
            ></input>
          ) : null}
          <Link to="/account/register">Register</Link>
        </form>

        <div className={isMatched ? "" : "noMatch"}>
          <h3>Your passwords don't match</h3>
        </div>
      </>
    );
  } else {
    return (
      <>
        <h1>Wolcome to Stranger's Things</h1>
        <h3>Logged in as </h3>
      </>
    );
  }
};

export default Login;
