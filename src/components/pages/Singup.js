import {
  faGithub, faGoogle, faTwitter
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function SignupForm() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState();
  // const [loading, setLoading] = useState();

  const { signup } = useAuth();
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    // do validation
    if (password !== confirmPassword) {
      return setError("Passwords don't match!");
    }

    try {
      setError("");
      // setLoading(true);
      await signup(email, password, username);
      history.push("/");
    } catch (err) {
      console.log(err);
      // setLoading(false);
      setError("Failed to create an account!");
    }
  }
  const toggleAccount = () => setNewAccount((prev) => !prev);
  const { signInWithGoogle, signInWithGithub } = useAuth();
  return (
    <div className="authContainer">
      <FontAwesomeIcon
        icon={faTwitter}
        color={"#04AAFF"}
        size="3x"
        style={{ marginBottom: 30 }}
      />
    <h1>Signup to your account</h1>
    <form onSubmit={handleSubmit} className="container">
      <input
        type="text"
        placeholder="Enter name"
        icon="person"
        required
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="authInput"
      />

      <input
        type="text"
        required
        placeholder="Enter email"
        icon="alternate_email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="authInput"
      />

      <input
        type="password"
        required
        placeholder="Enter password"
        icon="lock"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="authInput"
      />

      <input
        type="password"
        required
        placeholder="Confirm password"
        icon="lock_clock"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        className="authInput"
      />
      <input
          type="submit"
          className="authInput authSubmit"
          value={newAccount ? "Create Account" : "Sign In"}
        />

      {/* <button disabled={loading}>
        <span className="authInput authSubmit">Submit Now</span>
      </button> */}
      {error && <span className="authError">{error}</span>}

      
    </form>
    <div className="info">
        Already have an account? <Link to="/Login">Login</Link> instead.
    </div>
    <span onClick={toggleAccount} className="authSwitch">
    {newAccount ? "Sign In" : "Create Account"}
    </span>
    <div className="authBtns">
    <button className="authBtn" onClick={signInWithGoogle}>Continue with Google <FontAwesomeIcon icon={faGoogle} /></button>
    <button className="authBtn" onClick={signInWithGithub}>Continue with GitHub <FontAwesomeIcon icon={faGithub} /></button>
    </div>
    </div>
    
  );
}
