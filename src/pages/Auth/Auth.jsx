import  { useState } from 'react'
import { useContext } from 'react';
import './Auth.css'
import { Link } from 'react-router-dom';
import { auth } from "../../Utility/firebase"
import {signInWithEmailAndPassword,createUserWithEmailAndPassword} from "firebase/auth"
import {StateContext} from "../../components/DataProvider/DataProvider";
import { Type } from '../../Utility/action.type';
 
const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { state, dispatch } = useContext(StateContext);
  const { user } = state; // if you need the user

  const authHandler = async (e) => {
    e.preventDefault();

    if (e.target.name === "signin") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
        })
        .catch((err) => {
          setError(err.message);
        });
    } else if (e.target.name === "signup") {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
        })
        .catch((err) => {
          setError(err.message);
        });
    }
  };

  return (
    <section className="login">
      {/* logo */}
      <Link>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          alt="amazon-logo"
        />
      </Link>

      {/* form */}
      <div className="login-container">
        <h1> Sign In</h1>
        <form action="">
          <div>
            <label type="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
            />
          </div>
          <div>
            <label type="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
            />
          </div>
          <button
            type="submit"
            onClick={authHandler}
            name="signin"
            className="login-btn"
          >
            Sign In
          </button>
        </form>
        <p>
          By signing-in you agree to the AMAZON FAKE CLONE conditions of Use &
          Sale. Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>
        {/*create account btn  */}
        <button
          type="submit"
          onClick={authHandler}
          name="signup"
          className="register-btn"
        >
          Create your Amazon Account
        </button>
        {error && <small className='er'>{error}</small>}
      </div>
    </section>
  );
}

export default Auth;