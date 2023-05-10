import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

const Login = (props) => {

    const [credentials, setCredentials] = useState({ email: "", password: "" })

    const history = useHistory()
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("http://localhost:8989/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        });
        const json = await response.json()
        // console.log(json); 
        if (json.success) {
            //save the auth token and redirect
            sessionStorage.setItem("token", json.authtoken);
            props.showAlert("Login successfully", "success");
            history.push("/")
        }
        else {
            props.showAlert("Invalid credential", "danger");

        }
    }
    const onChange = (e) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });

    }
    return (
        <>
            {/* <div className='mt-3'>
    <form onSubmit={handleSubmit}>
    <h2>Login here</h2>
        <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" value={credentials.email} name='email' onChange={onChange} aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" value={credentials.password} onChange={onChange} name='password' />
        </div>

        <button type="submit" className="btn btn-primary"  >Login</button>
    </form>
</div> */}

            <div className="container col-xl-10 col-xxl-8 px-4 py-1">
                <div className="row align-items-center g-lg-5 py-1">
                    <div className="col-lg-7 text-center text-lg-start">
                        <h1 className="display-4 fw-bold lh-1 text-body-emphasis mb-3">Login Here</h1>
                        <p className="col-lg-10 fs-4">Please try to login with correct credentials</p>
                    </div>
                    <div className="col-md-10 mx-auto col-lg-5">
                        <form className="p-4 p-md-5 border rounded-3 bg-body-tertiary" onSubmit={handleSubmit}>
                            <div>
                                <h4 className='d-flex justify-content-center align-items-center'>Login to ORS</h4>
                            </div>
                            <div className="mb-3">

                                <input type="email" className="form-control" id="email" value={credentials.email} name='email' onChange={onChange} aria-describedby="emailHelp" placeholder='Email Address' />
                            </div>
                            <div className="mb-3">

                                <input type="password" className="form-control" id="password" value={credentials.password} onChange={onChange} name='password' placeholder='Password' />
                            </div>

                            <button className="w-100 btn btn-lg btn-primary" type="submit">Log In</button>
                            <hr className="my-4" />
                            <small className="text-body-secondary">By clicking Log in, you agree to the terms of use.</small>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login
