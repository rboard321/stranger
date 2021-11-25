import React, { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useParams } from "react-router"

const cohortName = "2108-ECE-RM-WEB-PT"
const APIURL = `https://strangers-things.herokuapp.com/api/${cohortName}`

const Login = ({ setToken }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState("")
  const [loggedIn, setLoggedin] = useState(false)
  const [isMatched, setIsMatched] = useState(false)

  const params = useParams()

  let navigate = useNavigate()

  function logIn(resp) {
    if (resp.data) {
      setToken(resp.data.token)
      localStorage.setItem("token", resp.data.token)
      // Try to stick with a "deep equals" (`===`) for comparisons as a shallow equals (`==`) can result in unexpected type coercion.
      if (resp.data.token == "") {
        setLoggedin(false)
      } else {
        setLoggedin(true)
        navigate("/profile")
      }
    }
  }

  async function loginRoutine() {
    try {
      const resp = await fetch(`${APIURL}/users/${params.method}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          user: {
            username,
            password
          }
        })
      })
      const respObj = await resp.json()

      logIn(respObj)
    } catch (error) {
      console.log(error)
    }
  }
  if (loggedIn === false) {
    return (
      <>
        <h1 className="title">Login/Register</h1>
        <form
          className="title"
          onSubmit={async (event) => {
            event.preventDefault()
            if (params.method !== "register") {
              loginRoutine()
            } else if (password === passwordConfirm) {
              setIsMatched(false)
              loginRoutine()
            } else {
              setIsMatched(true)
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
          <button type="submit" disabled={password.length < 8}>
            Submit
          </button>
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
        {password.length < 8 && params.method === "register" ? (
          <div>
            <h3>Your password must be 8 characters long</h3>
          </div>
        ) : null}
        <div className={isMatched ? "" : "noMatch"}>
          <h3>Your passwords don't match</h3>
        </div>
      </>
    )
  } else {
    return (
      <>
        <h1>Welcome</h1>
      </>
    )
  }
}

export default Login
