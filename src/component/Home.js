import React, { useEffect, useState} from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

const Home = ({profile}) => {
if(localStorage.getItem('token') === null){
    return<>
    <h1>Welome to Stranger's Things</h1>
    <h3>Login or Create an account to find the perfect items from strangers just like you!</h3>
    </>
}
return<>
<h1>Welome to Stranger's Things</h1>
<h2>You are currently logged in as {profile.username}.</h2>
</>
}

export default Home;