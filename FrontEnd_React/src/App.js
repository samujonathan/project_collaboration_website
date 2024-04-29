import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import EditProfile from './components/EditProfile'
import NavBar from './components/NavBar';
import LandingPage from './components/LandingPage';
import Projects from './components/Projects'
import GoogleSignin from './components/GoogleSignin';
import GoogleSignup from './components/GoogleSignup';
import LiveProject from './components/LiveProjects';
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});

  useEffect(() => {
    const item = JSON.parse(localStorage.getItem("user"));
    if (item?.email != user?.email) {
      setUser({
        email: item?.email,
        id: item?.id,
      });
      setIsLoggedIn(true);
    }
  }, [user, localStorage]);
  return (
  <Router>
    <div>
      <NavBar isLoggedIn={isLoggedIn} /> 
      <Routes>
        <Route path="/editprofile" element={<EditProfile />} />
        <Route exact path="/" element={<LandingPage isLoggedIn={isLoggedIn}/>} />
        <Route path="/projects" element={isLoggedIn ? <Projects/> : <Navigate to="/" />} />
        <Route path="/login" element={isLoggedIn ? <Navigate to="/" /> : <GoogleSignin/>} />
        <Route path='/signup' element={isLoggedIn ? <Navigate to="/" /> : <GoogleSignup/>} />
        <Route path='/live-projects' element={<LiveProject/>} />
      </Routes>
    </div>
  </Router>
);
}

export default App;
