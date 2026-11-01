import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.css";

const API_URL = "http://localhost:8080/api/auth";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [msg, setMsg] = useState({ text: "", type: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      setMsg({ text: "please fill all the fields", type: "error" });
      return;
    }

    setLoading(true);
    setMsg({ text: "", type: "" });

    try {
      const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        const user = await res.json();
        localStorage.setItem("user", JSON.stringify(user));
        navigate("/home");
      } else {
        const text = await res.text();
        const isPlainText = text && !text.startsWith("{");
        setMsg({
          text: isPlainText ? text : "please check your data",
          type: "error",
        });
      }
    } catch {
      setMsg({ text: "cannot reach the server", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="signup-page">
      <form className="signup-container" onSubmit={handleLogin}>
        <h2>Welcome back</h2>

        <div className="input-box">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter email"
            value={form.email}
            onChange={handleChange}
          />
        </div>

        <div className="input-box">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Enter password"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        <button className="btn" type="submit" disabled={loading}>
          {loading ? "logging in..." : "login"}
        </button>

        <p className={`msg ${msg.type}`}>{msg.text}</p>

        <p className="switch-text">
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </section>
  );
}
