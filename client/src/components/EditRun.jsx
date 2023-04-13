import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import background from '../img/pexels-pixabay-163444.jpg';

const EditRun = (props) => {
    const navigate = useNavigate();
    const { id } = useParams(); 
    // const { setUserInfo } = props;

    const [run, setRun] = useState({});

    const date = new Date(run.date);
    const month = String(date.getMonth() + 1).padStart(2,0);
    const day = String(date.getDate()).padStart(2,0);
    const formattedDate = `${date.getFullYear()}-${month}-${day}`;

    // const logout = () => {
    //     axios.post('http://localhost:8000/api/users/logout', {}, { withCredentials: true })
    //         .then(res => {
    //             console.log(res);
    //             setUserInfo({
    //                 firstName: "",
    //                 lastName: "",
    //                 email: "",
    //                 password: "",
    //             })
    //             navigate('/');
    //         })
    // }

    const [runNameError, setRunNameError] = useState('')
    const [runTimeError, setRunTimeError] = useState('')
    const [runDistanceError, setRunDistanceError] = useState('')
    const [runDateError, setRunDateError] = useState('')

    const handleRunName = (e) => {
        e.target.value.length < 3 ?
            setRunNameError("Name must contain 3 characters!") :
        setRun({ ...run, [e.target.name]: e.target.value });
    }

    const handleRunTime = (e) => {
        const regex = /^([01][0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/;
        regex.test(e.target.value) ? 
            setRunTimeError("") :
            setRunTimeError("Please enter a valid time in hh:mm:ss format")
        setRun({ ...run, [e.target.name]: e.target.value})

        }

    const handleRunDistance = (e) => {
        e.target.value <= 0 ?
            setRunDistanceError("Distance required") :
        setRun({ ...run, [e.target.name]: e.target.value })
    }

    const handleRunDate = (e) => {
        e.target.value === '' ?
        setRunDateError("Date Required") :
        setRun({ ...run, [e.target.name]: e.target.value})
    }

    useEffect(() => {
        axios.get(`http://localhost:8000/api/runs/${id}`)
            .then(res => {
                setRun(res.data);
            })
            .catch(err => {
                console.log(err);
            })
    }, []);

    const submitHandler = (e) => {
        e.preventDefault();
        if (!runNameError && !runTimeError && !runDistanceError && !runDateError) {
            axios.put(`http://localhost:8000/api/runs/${id}`, run)
                .then(res => {
                    console.log(res)
                    navigate(`/runs/${res.data._id}`)
                })
                .catch(err => {
                    console.log(err);
                })
        }
    }

    return (
        <div className="container-fluid vh-100 fw-bold" style={{ backgroundImage: `url(${background})`, backgroundSize: "cover" }}>
            <div>
                <h1 className='text-center fw-bold'>Track and Run</h1>
                <Link to="/" className="fw-bold nav-link text-center my-3">Return home</Link>
                            {/* <li className="nav-item">
                                <Link onClick={logout} className="nav-link mx-5">Logout</Link>
                            </li> */}
            </div>
            <div className="container text-center my-5">
                <div className="row">
                    <h4 className='my-2'>Edit your run!</h4>
                    <form action="" className="form col-4 offset-4 my-4" onSubmit={submitHandler}>
                        <div className="form-group">
                            {runNameError ? <p className='text-danger'>{runNameError}</p> : ''}
                            <label htmlFor="" className="form-label">Route Name:</label>
                            <input type="text" name="name" className="form-control" onChange={handleRunName} value={run.name}></input>
                            <br></br>
                            {runTimeError ? <p className='text-danger'>{runTimeError}</p> : ''}
                            <label htmlFor="" className="form-label">Time(hh:mm:ss):</label>
                            <input type="text" name="time" className="form-control" onChange={handleRunTime} value={run.time}></input>
                            <br></br>
                            {runDistanceError ? <p className='text-danger'>{runDistanceError}</p> : ''}
                            <label htmlFor="" className="form-label">Distance(miles):</label>
                            <input type="number" name="distance" step="0.01" className="form-control" onChange={handleRunDistance} value={run.distance}></input>
                            <br></br>
                            {runDateError ? <p className='text-danger'>{runDateError}</p> : ''}
                            <label htmlFor="" className="form-label">Date:</label>
                            <input type="date" name="date" id="date" onChange={handleRunDate} value={formattedDate} max={new Date().toISOString().split('T')[0]}></input>
                            <br></br>
                            <button className='btn btn-success my-5'>Save Changes</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default EditRun