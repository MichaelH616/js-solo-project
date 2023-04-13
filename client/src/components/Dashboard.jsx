import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import background from '../img/andrea-leopardi-QVD3Xht9txA-unsplash.jpg';

const Dashboard = (props) => {

    const [weatherData, setWeatherData] = useState([]);

    const { allRuns, setAllRuns } = props;
    // const { userInfo, setUserInfo } = props

    const { id } = useParams();

    const totalDistance = allRuns.reduce((sum, run) => {
        return sum + run.distance;
    }, 0);

    const shortTotalDistance = totalDistance.toFixed(2);

    const averageDistance = (totalDistance / allRuns.length).toFixed(2);

    const milesAroundEarth = (24901 - totalDistance).toFixed(2);

    const milesToMoon = (238855 - totalDistance).toFixed(2);

    const milesMarathon = (26.2 - totalDistance).toFixed(2);

    const miles5k = (3.10 - totalDistance).toFixed(2);

    const miles10k = (6.2 - totalDistance).toFixed(2);

    const milesHalfMarathon = (13.1 - totalDistance).toFixed(2);

    // const navigate = useNavigate();

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

    // const handleLocation = (e) => {
    //     setLocation(e.target.value);
    // }

    useEffect(() => {
        axios.get(`https://api.weatherapi.com/v1/current.json?key=a8727f9889114bb9ae8235534231204&q=Irvine&aqi=yes`)
            .then((res) => {
                setWeatherData(res.data);
                console.log(weatherData)
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    const removeFromDOM = id => {
        axios.delete(`http://localhost:8000/api/runs/${id}`)
            .then((res) => {
                console.log(res.data)
                setAllRuns(allRuns.filter(run => run._id !== id));
            })
            .catch((err) => {
                console.log(err);
            })

    }

    useEffect(() => {
        axios.get('http://localhost:8000/api/runs')
            .then((res) => {
                setAllRuns(res.data);
            })
            .catch((err) => {
                console.log(err);
            })
    }, [])

    // useEffect(() => {
    //     axios.get(`http://localhost:8000/api/users/${userInfo._id}`, { withCredentials: true })
    //         .then((res) => {
    //             setUserInfo(res.data);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         })
    // }, [])

    return (
        <div className="container-fluid vh-100 fw-bold" style={{ backgroundImage: `url(${background})`, backgroundSize: "cover" }}>
            <div>
                <h1 className=" text-center">Track and Run</h1>
            </div>
            <nav className="navbar navbar-expand-lg mx-5 justify-content-center">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <Link to="/" className="nav-link mx-5">Home</Link>
                    </li>
                    {/* <li className="nav-item">
                                <Link onClick={logout} className="nav-link mx-5">Logout</Link>
                            </li> */}
                </ul>
                {/* </div> */}
            </nav>
            <div className='d-flex justify-content-center mt-3'>
                <h3> Current weather at: {weatherData.location?.name}, {weatherData.location?.region}</h3>
            </div>
            <div className='d-flex justify-content-center'>
                    <img src={weatherData.current?.condition.icon} alt="Current weather icon" />
                    <h4 className='my-3'>{weatherData.current?.temp_f}°F</h4>
                    <h4 className='my-3 mx-5'>UV Index: {weatherData.current?.uv}</h4>
            </div>
            <div className='container'>
                <table className='table table-hover my-4'>
                    <thead>
                        <tr>
                            <th scope='col'>Route Name</th>
                            <th scope='col'>Date</th>
                            <th scope='col'>Time(hh:mm:ss)</th>
                            <th scope='col'>Distance(miles)</th>
                            <th scope='col'>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allRuns.map((run) => {
                                const date = new Date(run.date);
                                const formattedDate = `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
                                return (
                                    <tr key={run._id}>
                                        <td>
                                            <Link to={`/runs/${run._id}`} className="text-dark">{run.name}</Link>
                                        </td>
                                        <td>{formattedDate}</td>
                                        <td>{run.time}</td>
                                        <td>{run.distance}</td>
                                        <td>
                                            <Link to={`/runs/edit/${run._id}`} className='btn border btn-primary'>Edit</Link>
                                            <button className='btn border btn-danger' onClick={(e) => { removeFromDOM(run._id) }}>Delete</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <Link to="/runs/add" className="fs-5 fw-bold btn border-black btn-success">Log a run</Link>
                <div className='d-flex justify-content-center my-2'>
                    <h4 className='mx-5'>Total Distance: {shortTotalDistance} miles</h4>
                    <h4 className='mx-5'>Average Distance: {averageDistance} miles</h4>
                </div>
                <div className="card p-3" style={{ backgroundColor: 'rgb(88,187,211)', border:'2px solid black', borderRadius:'10px', width:'500px', margin: '0 auto'}}>
                    <h4>Goals:</h4>
                    <h5>5k Distance: {  miles5k < 0 ? 'Complete!' : `${miles5k} miles left` } </h5>
                    <h5>10k Distance: {miles10k < 0 ? 'Complete!' : `${miles10k} miles left` } </h5>
                    <h5>Half Marathon Distance: {milesHalfMarathon < 0 ? 'Complete!' : `${milesHalfMarathon} miles left` } </h5>
                    <h5>Marathon Distance: {milesMarathon < 0 ? 'Complete!' : `${milesMarathon} miles left` } </h5>
                    <h5>Lap around the world: {milesAroundEarth < 0 ? 'Complete!' : `${milesAroundEarth} miles left` }</h5>
                    <h5>To the moon: {milesToMoon < 0 ? 'Complete!' : `${milesToMoon} miles left` }</h5>
                </div>
            </div>
        </div >
    )
}

export default Dashboard
