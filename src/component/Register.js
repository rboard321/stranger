import React, { useState } from "react"

/* Have you noticed how you're using the following two lines in multiple files? If any of this information changes you'll
 * have to make sure you search through multiple files so that the change stays consistent everywhere. It would be much easier
 * to store these in one location and access them from there whenever you need them. That way, only one change is needed and
 * all files get the new info!
 */
const cohortName = "2108-ECE-RM-WEB-PT"
const APIURL = `https://strangers-things.herokuapp.com/api/${cohortName}`

const Register = ({ setToken }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  return (
    <>
      <h1>Login/Register</h1>

      <form
        onSubmit={async (event) => {
          event.preventDefault()
          const resp = await fetch(`${APIURL}/users/register`, {
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
          }).catch(console.error)
          const respObj = await resp.json()
          setToken(respObj.data.token)
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
        {/*  I pointed out in another file that `<input />` should be a self-closing tag. The same is true for `<br />` */}
        <br></br>
        <input
          type="password"
          placeholder="confirm password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        ></input>
        <button type="submit">Submit</button>
      </form>
    </>
  )
}

export default Register
