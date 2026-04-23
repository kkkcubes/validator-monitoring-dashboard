import { useState } from "react";

export default function Login() {
  const [form, setForm] = useState({});

  const login = async () => {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form)
    });

    const data = await res.json();
    localStorage.setItem("token", data.token);
    window.location.href = "/";
  };

  return (
    <div>
      <input placeholder="username" onChange={(e) => setForm({ ...form, username: e.target.value })} />
      <input placeholder="password" type="password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button onClick={login}>Login</button>
    </div>
  );
}