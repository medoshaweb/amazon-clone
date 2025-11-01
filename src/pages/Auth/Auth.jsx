import { useState } from "react";
import { useContext } from "react";
import "./Auth.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../Utility/firebase";
import { ClipLoader } from "react-spinners";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { StateContext } from "../../components/DataProvider/DataProvider";
import { Type } from "../../Utility/action.type";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState({
    signIn: false,
    signUp: false,
  });

  const { state, dispatch } = useContext(StateContext);
  const { user } = state;
  const navigate = useNavigate();
  const navStateData = useLocation();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const authHandler = async (e) => {
    e.preventDefault();
    setError("");

    // Trim whitespace from email
    const trimmedEmail = email.trim();

    // Validate email format
    if (!trimmedEmail) {
      setError("Please enter your email address.");
      return;
    }

    if (!validateEmail(trimmedEmail)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Validate password
    if (!password) {
      setError("Please enter your password.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (e.target.name === "signin") {
      setLoading({ ...loading, signIn: true });
      signInWithEmailAndPassword(auth, trimmedEmail, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loading, signIn: false });
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((err) => {
          let errorMessage = err.message;
          if (err.code === "auth/invalid-email") {
            errorMessage = "Invalid email address. Please check your email format.";
          } else if (err.code === "auth/user-not-found") {
            errorMessage = "No account found with this email address.";
          } else if (err.code === "auth/wrong-password") {
            errorMessage = "Incorrect password. Please try again.";
          } else if (err.code === "auth/invalid-credential") {
            errorMessage = "Invalid email or password. Please try again.";
          }
          setError(errorMessage);
          setLoading({ ...loading, signIn: false });
        });
    } else if (e.target.name === "signup") {
      setLoading({ ...loading, signUp: true });
      createUserWithEmailAndPassword(auth, trimmedEmail, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loading, signUp: false });
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((err) => {
          let errorMessage = err.message;
          if (err.code === "auth/invalid-email") {
            errorMessage = "Invalid email address. Please enter a valid email.";
          } else if (err.code === "auth/email-already-in-use") {
            errorMessage = "An account with this email already exists. Please sign in instead.";
          } else if (err.code === "auth/weak-password") {
            errorMessage = "Password is too weak. Please use a stronger password.";
          }
          setError(errorMessage);
          setLoading({ ...loading, signUp: false });
        });
    }
  };

  return (
    <section className="login">
      {/* logo */}
      <Link to={"/"}>
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg"
          alt="amazon-logo"
        />
      </Link>

      {/* form */}
      <div className="login-container">
        <h1> Sign In</h1>
        {navStateData?.state?.message && (
          <small style={{
            padding: "5px",
            textAlign: "center",
            color: "red",
            fontWeight: "bold",
          }}
          >
            {navStateData?.state?.message}
          </small>
        )}
        <form action="">
          <div>
            <label type="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
              required
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label type="password">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              id="password"
              required
              placeholder="Enter your password"
              minLength={6}
            />
          </div>
          <button
            type="submit"
            onClick={authHandler}
            name="signin"
            className="login-btn"
          >
            {loading.signIn ? (
              <ClipLoader color="#000" size={15}></ClipLoader>
            ) : (
              "Sign In"
            )}
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
          {loading.signUp ? (
            <ClipLoader color="#000" size={15}></ClipLoader>
          ) : (
            "Create your Amazon Account"
          )}
        </button>
        {error && <small className="er">{error}</small>}
      </div>
    </section>
  );
};

export default Auth;
