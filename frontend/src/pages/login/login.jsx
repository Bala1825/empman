
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!email.trim() || !password) {
      setError("Please enter your email and password.");
      return;
    }

    if (email.trim().toLowerCase() !== "admin@example.com" ||
        password !== "Admin123!") {
      setError("Invalid email or password.");
      return;
    }

    login(email.trim().toLowerCase());

    navigate(location.state?.from || "/dashboard", {
      replace: true,
    });
  }

  return (
    <section className="login-card">
      <div className="login-heading">
        <h1>Welcome back</h1>
        <p>Sign in to continue to your account.</p>
      </div>

      <form onSubmit={handleSubmit} className="login-form">
        <label htmlFor="email">Email address</label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="admin@example.com"
          autoComplete="username"
          required
        />

        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Enter your password"
          autoComplete="current-password"
          required
        />

        {error && <p className="login-error" role="alert">{error}</p>}

        <button type="submit">Sign in</button>
      </form>

      <p className="login-demo">
        email: admin@example.com
        <br />
        password: Admin123!
      </p>
    </section>
  );
}

export default Login;
