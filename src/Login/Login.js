import React from 'react';
import './Login.css';
import { accessUrl } from './../aruha';

function Login() {
  return (
    <div className="login">

        <img src=' https://drive.google.com/uc?export=view&id=1AaHh71SPGR4FOtvyIlifbg_ZRmrR3rct' alt='Aruha'/>
        {/* logo */}
        {/* Login button */}
        <a href={accessUrl}>Login with Spotify</a>
    </div>
  )
}

export default Login