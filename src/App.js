
import React, { useState } from 'react';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Addblood from './AddBlood/Addblood';
import CreateDonor from './CreateDonor/Createdonor';
import Login from './Login/Login';
import RequestBlood from './RequestBlood/Requestblood';


const App = () => {
  const [userId, setUserId] = useState(null);

  const handleLogin = (userId) => {
    setUserId(userId);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={userId ? <Navigate to="/add-blood" /> : <Login onLogin={handleLogin} />} />
        <Route path="/create" element={userId ? <CreateDonor userId={userId} /> : <Navigate to="/login" />} />

        <Route path="/login" element={userId ? <Navigate to="/add-blood" /> : <Login onLogin={handleLogin} />} />
        <Route path="/add-blood" element={userId ? <Addblood userId={userId} /> : <Navigate to="/login" />} />

        <Route path="/request-blood" element={<RequestBlood/>} />
      </Routes>

    </Router>
  );
};

export default App;


