import axios from 'axios';
import React, { useState } from 'react'
 import { useHistory } from 'react-router-dom';

const Signup = (props) => {
  //  const [credentials, setCredentials] = useState({ fname: "", lname: "", email: "", password: ""})
  const [fname, setfname] = useState()
  const [lname, setlname] = useState()
  const [email, setemail] = useState()
  const [password, setpassword] = useState()
  
  const [image, setImage] = useState()
   const history = useHistory()
  


  const handleSubmit = async (e) => {
    e.preventDefault(); 
    // const {fname,lname,email,password,image}=credentials;   
    const formData = new FormData()
    formData.append("fname", fname)
     formData.append("lname", lname)
     formData.append("email", email)
     formData.append("password", password)
    formData.append("image", image)
   
    
    axios.post("http://localhost:8989/api/auth/register",formData,
      {
        headers: {
          "Content-Type": "application/json",
        }
      }
    )
      .then((res) => {
        console.log(res);
        if (!res.success) {

            props.showAlert(res.data.error, "danger");
          }
          if (res.data.success) {
            //save the auth token and redirect
            props.showAlert("SignUp successfully", "success");
            history.push("/login")
          }

      }).catch((err) => {
        console.log(err);
      })
    }
    //  const {fname,lname,email,password}=credentials;   
    // const response = await fetch("http://localhost:8989/api/auth/register", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //    body: JSON.stringify({ fname, lname, email, password }),
  
    // });
    // const json = await response.json()
    // console.log(json);
    // if (!json.success) {

    //   props.showAlert(json.error, "danger");
    // }
    // if (json.success) {
    //   //save the auth token and redirect
    //   props.showAlert("SignUp successfully", "success");
    //   history.push("/login")
    // }

  //}
  // const onChange = (e) => {
  //   setCredentials({ ...credentials, [e.target.name]: e.target.value });

  // }
   const onChange1 = (e) => {
     setfname(e.target.value);

   }
   const onChange2 = (e) => {
     setlname(e.target.value);

   }
   const onChange3 = (e) => {
     setemail(e.target.value);

   }
   const onChange4 = (e) => {
     setpassword(e.target.value);

   }
  return (
    <div className='container mt-2 pt-3'>
      <h2>Create an account to use ORS</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data" >
        <div className="mb-3">
          <label htmlFor="fname" className="form-label">firstname</label>
          <input type="text" className="form-control" id="fname" name="fname" onChange={onChange1} value={fname} aria-describedby="emailHelp" required />

        </div>
        <div className="mb-3">
          <label htmlFor="lname" className="form-label">lastname</label>
          <input type="text" className="form-control" id="lname" name="lname" onChange={onChange2} value={lname} aria-describedby="emailHelp" required />

        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email </label>
          <input type="email" className="form-control" id="email" name='email' onChange={onChange3} value={email} aria-describedby="emailHelp" required />

        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" onChange={onChange4} value={password} minLength={5} required />
        </div>
        <div className="mb-3">
          <label htmlFor="file" className="form-label">File</label>
          <input type="file" className="form-control" id="file" name="file_upload" onChange={(e) => setImage(e.target.files[0])} minLength={5} required />
        </div>


        <button type="submit"  className="btn btn-primary">SignUp</button>
      </form>
    </div>
  )
}

export default Signup
