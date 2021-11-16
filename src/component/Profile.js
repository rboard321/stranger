import React, { useEffect, useState} from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

const cohortName = '2108-ECE-RM-WEB-PT';
const APIURL = `https://strangers-things.herokuapp.com/api/${cohortName}`;

const Profile = ({profile, setProfile, setUserid}) => {

    
    const [messages, setMessages] = useState([])
    
    useEffect(() => {
        const fetchProfile = async () => {
          const resp = await fetch(`${APIURL}/users/me`, {
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${localStorage.getItem('token')}`
              }
          });
          const data = await resp.json();
          
          setProfile(data.data);
          setMessages(data.data.messages);
          setUserid(data.data._id)
        }
        fetchProfile();
    }, [])  

    

    return <>
{console.log('profile messages: ', messages)}

  <h1>
      Welcome {profile.username ? profile.username : ''}
  </h1>
  <h3>Messages to Me:</h3>
    {
  messages.map(item => <div className="post" key={item._id}>
    <h1>From: {item.fromUser.username}</h1>
    <h4>{item.content}</h4>
    
  </div>
    
  )
  
    }
      
  </>
}




  export default Profile;
  