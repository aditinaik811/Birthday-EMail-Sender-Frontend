import React, { useEffect, useState } from "react";
import axios from 'axios'
function App() {
  const [form, setForm] = useState({ name: "", email: "", birthday: "" });
  const[birthday,setBirthday]=useState({})
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };


  useEffect(()=>{
    axios.get('http://localhost:5000/api/users')
    .then(res=>{
      console.log(res.data);
      setBirthday(res.data)

    })
    .catch(err=>{
      console.log(err)
    })
  },[])
  const handleSubmit = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch("http://localhost:5000/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    alert(data.message || "User added!");
  } catch (err) {
    console.error("❌ Error submitting form:", err);
    alert("Failed to connect to server. Make sure backend is running.");
  }
};


  return (
    <div style={{ backgroundColor:"green"}}>
      <h2>🎉 Birthday Reminder</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <br />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <br />
        <input name="birthday" type="date" value={form.birthday} onChange={handleChange} required />
        <br />
        <button type="submit">Add User</button>
      </form>
    </div>
  );
}

export default App;
