import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';
import RegisterForm from './components/RegisterForm';
import Dashboard from './components/Dashboard';
import LoginForm from './components/LoginForm';
import AddRun from './components/AddRun';
import EditRun from './components/EditRun';
import DetailRun from './components/DetailRun';

function App() {

  const [ allRuns, setAllRuns ] = useState([]);
  // const [ userInfo, setUserInfo] = useState([]);
  //   const [ userInfo, setUserInfo ] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     password: "",
//     confirmPassword: ""
// })

  return (
    <div>
      <Routes>
        {/* <Route path="/register" element={<RegisterForm userInfo={userInfo} setUserInfo={setUserInfo}/>} />
        <Route path="/" default element={<LoginForm userInfo={userInfo} setUserInfo={setUserInfo}/>} /> */}
        <Route path="/" default element={<Dashboard allRuns={allRuns} setAllRuns={setAllRuns}/>} />
        <Route path="/runs/add" element={<AddRun allRuns={allRuns} setAllRuns={setAllRuns}/>}/>
        <Route path="/runs/edit/:id" element={<EditRun/>}/>
        <Route path="/runs/:id" element={<DetailRun/>}/>
        <Route path="*" element={<h1>404 - Page Not Found</h1>}/>
      </Routes>
    </div>
  );
}

export default App;
