import './App.css';
import React, { useState } from 'react';
import Body from './page/Body/Body';
import CreateEvent from './page/CreateEvent/CreateEvent';
import Login from './page/Login/Login';
import Header from './component/navbar/navbar';
import ViewDetail from './page/Details/viewDetals';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
// import { UserContext } from './context/context';

function App() {
  // const [token, setToken] = useState();
  // console.log("token", token)
  // localStorage.setItem("username", null);
  return (
    <div className="App">
        <Router>
          {/* <UserContext.Provider value={[token, setToken]}> */}
          <Header></Header>
          <Routes>
            <Route path='/' element={<Body />} />
            <Route path='/createEvent' element={<CreateEvent />} />
            <Route path='/login' element={<Login />} />
            <Route path='/view' element={<ViewDetail />} />
          </Routes>
          {/* </UserContext.Provider> */}
        </Router>
   </div>
  );
}

export default App;
