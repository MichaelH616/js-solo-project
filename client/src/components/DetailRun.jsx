import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import background from '../img/pexels-ds-stories-7267588.jpg'

const DetailRun = () => {

    const [run, setRun] = useState({});
    const { id } = useParams();

    const date = new Date(run.date);
    const month = String(date.getMonth() + 1).padStart(2, 0);
    const day = String(date.getDate()).padStart(2, 0);
    const formattedDate = `${month}/${day}/${date.getFullYear()}`;

    useEffect(() => {
        axios.get(`http://localhost:8000/api/runs/${id}`)
            .then(res => {
                setRun(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    return (
        <div className="container-fluid vh-100 fw-bold" style={{ backgroundImage: `url(${background})`, backgroundSize: "cover" }}>
            <div>
                <h1 className='text-center' >Track and Run</h1>
                <Link to="/" className="nav-link text-center my-3">Return home</Link>
                {/* <li className="nav-item">
                <Link onClick={logout} className="nav-link mx-5">Logout</Link>
                </li> */}
            </div>
            <br />
            <div className='row m-5'>
                <div className="card p-5 d-flex justify-content-center align-items-center" style={{ backgroundColor: 'transparent', border:'2px solid black', borderRadius:'10px', width:'500px', margin:'0 auto' }}>
                    <div className='text-center'>
                        <h3>Route name: {run.name}</h3>
                        <h3>Date: {formattedDate}</h3>
                        <h3>Time(hh:mm:ss): {run.time}</h3>
                        <h3>Distance: {run.distance} miles</h3>
                        <br/>
                        <h2>Keep up the good work!</h2>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailRun