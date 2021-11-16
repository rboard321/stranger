import React, { useEffect, useState} from "react";
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { useParams } from 'react-router';

const cohortName = '2108-ECE-RM-WEB-PT';
const APIURL = `https://strangers-things.herokuapp.com/api/${cohortName}`;


const Register = ({setToken}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    
    return<>
        <h1>Login/Register</h1>
        
        <form onSubmit={async(event) =>{
          event.preventDefault();
          const resp = await fetch(`${APIURL}/users/register`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              user: {
                username,
                password
              }
            })
          }) 
          .catch(console.error);
          const respObj = await resp.json();
          setToken(respObj.data.token)
          console.log({setToken})
        }}>
            <input type="text" placeholder="username" value={username}
             onChange={(event) => setUsername(event.target.value)}></input>
             <br></br>
             <input type="password" placeholder="password" value={password}
             onChange={(event) => setPassword(event.target.value)}></input> 
             <br></br>
             <input type="password" placeholder="confirm password" value={password}
             onChange={(event) => setPassword(event.target.value)}></input> 
             <button type="submit" >Submit</button>
        </form>
    </>
}

export default Register;