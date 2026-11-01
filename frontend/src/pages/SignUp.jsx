import { useState } from "react";
import "./SignUp.css";
import { Link } from "react-router-dom";
const API_URL = "http://localhost:8080/api/auth";

export default function SignUp() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [msg, setMsg] = useState({ text: "", type: "" }); // type: "error" | "success"
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      setMsg({ text: "please fill all the fields", type: "error" });
      return;
    }
    if (form.password.length < 8) {
      setMsg({ text: "password must be at least 8 characters", type: "error" });
      return;
    }

    setLoading(true);
    setMsg({ text: "", type: "" });

    try {
      const res = await fetch(`${API_URL}/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const text = await res.text();

      if (res.ok) {
        setMsg({ text: "✅ signup successful", type: "success" });
        setForm({ name: "", email: "", password: "" });
      } else {
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
      <form className="signup-container" onSubmit={handleSignup}>
        <h2>Welcome in</h2>

        <div className="input-box">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter name"
            value={form.name}
            onChange={handleChange}
          />
        </div>

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
            placeholder="At least 8 characters"
            value={form.password}
            onChange={handleChange}
          />
        </div>

        <button className="btn" type="submit" disabled={loading}>
          {loading ? "signing up..." : "signup"}
        </button>

        <p className={`msg ${msg.type}`}>{msg.text}</p>
        <p className="switch-text">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </section>
  );
}
