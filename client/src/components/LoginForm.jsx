import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import background from '../img/sporlab-XiZ7pRvCzro-unsplash.jpg';

const LoginForm = (props) => {
    const navigate = useNavigate();
    const {userInfo, setUserInfo} = props;

    const changeHandler = (e) => {
        setUserInfo({ ...userInfo, [e.target.name]: e.target.value })
    }

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/api/users/login', userInfo, { withCredentials: true })
            .then(res => {
                console.log(res);
                navigate('/dashboard');
            })
            .catch(err => console.log(err));
    }

    return (
        <div className="container-fluid vh-100 d-flex justify-content-center align-items-center" style={{ backgroundImage: `url(${background})`, backgroundSize: "cover" }}>
            <div className='row'>
                <div className='w-100'>
                    <div className="card p-5" style={{ backgroundColor: 'transparent' }}>
                        <form onSubmit={submitHandler}>
                            <h2 className='text-center'>Track and Run</h2>
                            <div className='form-group'>
                                <label className="form-label fw-bold">Email:</label>
                                <input type="text" className="form-control" name="email" value={userInfo.email} onChange={changeHandler} placeholder='Enter email'/>
                            </div>
                            <br/>
                            <div className='form-group'>
                                <label className="form-label fw-bold">Password:</label>
                                <input type="password" className="form-control" name="password" value={userInfo.password} onChange={changeHandler} placeholder='Password'/>
                            </div>
                            <div className='my-5'>
                                <Link to={`/register`} className="btn btn-primary mx-5">Create Account</Link>
                                <button type="submit" className='btn btn-primary mx-5'>Sign in</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default LoginForm