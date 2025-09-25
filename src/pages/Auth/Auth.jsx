import React from 'react'
import './Auth.css'
import { Link } from 'react-router-dom';
 
const Auth = () => {
  return (
    <section className='login'>
      {/* logo */}
      <Link>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          alt="amazon-logo"
        />
      </Link>

      {/* form */}
      <div className='login-container'>
        <h1> Sign In</h1>
        <form action="">
          <div>
          <label type="email">Email</label>
          <input type="email" id='email' />
          </div>
          <div>
            <label type="password">Password</label>
            <input type="password" id='password' />
          </div>
          <button className='login-btn'>Sign In</button>
        </form>
        <p> 
          By signing-in you agree to the AMAZON FAKE CLONE conditions of Use & Sale. Please see our Privacy Notice, our Cookies Notice and our Intererst-Based Ads Notice.
        </p>
        {/*create account btn  */}
        <button className= 'register-btn'>Create your Amazon Account</button>
      </div>
    </section>
  );
}

export default Auth;