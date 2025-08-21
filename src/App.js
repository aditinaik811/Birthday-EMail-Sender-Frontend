import { useEffect, useState } from "react";
import axios from 'axios';
import loader from '../src/assets/bday_loader.gif'
import './App.css'; 

function App() {
  const [form, setForm] = useState({ name: "", email: "", birthday: "" });
  const [users, setUsers] = useState([]);
  const[loading,setLoader] = useState(false)
  const API = process.env.REACT_APP_API_BASE_URL;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    console.log(API)
    getUsers();
    
  }, []);
  const getUsers=()=>{
    axios.get(`${API}/api/users`)
      .then(res => 
        
        setUsers(res.data),
        
      )
      .catch(err => 
        console.log(err),
       
      );
  }

  const deleteDetails = (details)=>{
    console.log("Hello ",details._id)
    if (window.confirm(`Are you sure you want to delete ${details.name}'s birthday?`)){
    axios.delete(`${API}/api/users/delete/${details._id}`)
    .then(res=>{
      console.log(res)
      getUsers();
    })
    .catch(err=>{
      console.log(err)
    })
  }
}
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true)
    axios.post(`${API}/api/users`,{
      name:form.name,
      email:form.email,
      birthday:form.birthday
    })
    .then(res=>{
      console.log(res)
      setLoader(false)
      getUsers();
    })
    .catch(err=>{
      console.log(err)
      setLoader(false)
    })
  };

  return (
    <div className="app">
      <h2><i class="fa-solid fa-calendar-days"></i>Birthday Buddy</h2>
      <form className="birthday-form" onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="birthday" type="date" value={form.birthday} onChange={handleChange} required />
        <button style={{display:'flex',justifyContent:'center',alignItems:'center',height:'40px',textAlign:'center',fontWeight:'bold'}}type="submit">{loading &&<img style={{width:'100px',height:'50px' ,marginRight:'2px'}}src={loader} alt="loader"/>}Add User</button>
        
      </form>

      <h3>🎂 Upcoming Birthdays</h3>
<ul className="user-list">
  {users.map(user => (
    <li key={user._id || user.email} className="user-card">
      <p className="user-name"><i class="fa-solid fa-user"></i> {user.name}</p>
      <p className="user-email"><i class="fa-solid fa-envelope"></i>{user.email}</p>
      <p className="user-birthday"><i class="fa-solid fa-cake-candles"></i>{new Date(user.birthday).toLocaleDateString()}</p>
       <button onClick={()=>deleteDetails(user)}className="delete-button"><i class="fa-solid fa-trash"></i></button>
    </li>
  ))}
</ul>
    </div>
  );
}

export default App;
