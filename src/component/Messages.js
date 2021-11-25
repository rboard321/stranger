import React, { useState } from "react"

import { useLocation } from "react-router-dom"

const cohortName = "2108-ECE-RM-WEB-PT"
const APIURL = `https://strangers-things.herokuapp.com/api/${cohortName}`

const Message = ({ posts }) => {
  const [message, setMessage] = useState("")

  const location = useLocation()
  const { id } = location.state

  async function sendMessage(message) {
    try {
      const resp = await fetch(`${APIURL}/posts/${id}/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          message: {
            content: message
          }
        })
      })
      /* Here you converted the response to a JSON and then captured it in a variable called `data` - but then you don't
       * use it! Converting and storing it is just wasted memory and power if you're not doing anything with it. */
      const data = await resp.json()
    } catch (error) {
      console.log(error)
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
                event.preventDefault()
                /* you used an `async` above but didn't `await` anything */
                sendMessage(message)
                setMessage("")
              }}
            >
              {/*Though it works, the below `input` is technically incorrect. Normally an HTML input should be self-closing
                (e.g. <input />). Because of the extra closing tag my editor actually thought this was XML instead of HTML */}
              <input
                type="text"
                placeholder="message"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
              ></input>
              <button disabled={localStorage.getItem("token") === null}>
                Send
              </button>
            </form>
          </div>
        ) : null
      )}
    </>
  )
}

export default Message

/* I wanted to show you another way you could shorten this code a bit. Instead of using a ternary, you could use the logical
 * **AND** operator (`&&`) to achieve the same thing. Since you know you'll either return a bit of code or `NULL` every
 * time if `false`, the logical **AND** will have the same effect. **BOTH SIDES** of the `&&` must be true for any of
 * the code to execute.
 *
 * Example:
 *
 * (your code first)
 * ```javascript
 * id === post._id ? (return if true) : null
 * ```
 *
 * (same effect with logical AND)
 * ```javascript
 * id === post._id && (return if true)
 * ```
 *
 * If `id` and `post._id` are NOT EQUAL it will NOT continue past the && to evaluate the second part of the expression.
 * That way, it'll have the same effect as your ternary with a little bit less code. */
