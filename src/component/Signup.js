import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

const Signup = (props) => {
  const [credentials, setCredentials] = useState({ fname: "", lname: "", email: "", password: "" })


  const history = useHistory()
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { fname, lname,email, password } = credentials;
    const response = await fetch("http://localhost:8989/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fname,lname, email, password }),
    });
    const json = await response.json()
    console.log(json);
    if (json.success) {
      //save the auth token and redirect
      // localStorage.setItem("token", json.authtoken);
      props.showAlert("SignUp successfully", "success");
      history.push("/login")
    }
    else {
      props.showAlert("Invalid details", "danger");
    }
  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });

  }
  return (
    <div className='container mt-2'>
      <h2>Create an account to use ORS</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="fname" className="form-label">firstname</label>
          <input type="text" className="form-control" id="fname" name="fname" onChange={onChange} aria-describedby="emailHelp" required />

        </div>
        <div className="mb-3">
          <label htmlFor="lname" className="form-label">lastname</label>
          <input type="text" className="form-control" id="lname" name="lname" onChange={onChange} aria-describedby="emailHelp" required />

        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email </label>
          <input type="email" className="form-control" id="email" name='email' onChange={onChange} aria-describedby="emailHelp" required />

        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" onChange={onChange} minLength={5} required />
        </div>
       

        <button type="submit" className="btn btn-primary">SignUp</button>
      </form>
    </div>
  )
}

export default Signup
