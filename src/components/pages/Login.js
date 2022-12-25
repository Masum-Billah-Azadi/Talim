import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Login = ()=> {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState();
  const [loading, setLoading] = useState();

  const { login } = useAuth();

  async function handleSubmit(e) {

    try {
      setError("");
      setLoading(true);
      await login(email, password);
    } catch (err) {
      console.log(err);
      setLoading(false);
      setError("Failed to login!");
    }
  }
  return (
    <>
    <h1>Login to your account</h1>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter email"
        icon="alternate_email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Enter password"
        icon="lock"
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button type="submit" disabled={loading}>
        <span>Login</span>
      </button>

      {error && <p className="error">{error}</p>}

      <div className="info">
        Don't have an account? <Link to="/Signup">Signup</Link> instead.
      </div>
    </form>
    </>
  );
}
export default Login
