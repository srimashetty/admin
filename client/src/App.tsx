import React from 'react';
import './App.css';
import {BrowserRouter,Routes, Route} from 'react-router-dom';
import Report from "./pages/Report";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Signup";
import { useState, useEffect } from "react";
import {Link} from 'react-router-dom';
import {Navbar, Nav} from "rsuite";
import AuthService from "./services/auth.service";
// import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  const logOut = () => {
    AuthService.logout();
  };

  return (
    <div>
    <BrowserRouter>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <div className="navbar-nav mr-auto">

          {currentUser && (
            <li className="nav-item">
              <Link to={"/"}>
                <a className = "nav-link">
                  Dashboard
                </a>
              </Link>
            </li>
          )}

          {currentUser && (
            <li className="nav-item">
              <Link to={"/report"} >
                <a className = "nav-link">
                   Report
                </a>
              </Link>
            </li>
          )}

        </div>

        {currentUser ? (
          <div className="navbar-nav ms-auto">
            <li className="nav-item">
              <a href="/login" className="nav-link" onClick={logOut}>
                Logout
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link to={"/login"}>
                <a className = "nav-link">
                  Login
                </a>
              </Link>
            </li>

            <li className="nav-item">
              <Link to={"/signup"}>
                <a className = "nav-link">
                  Sign up
                </a>
              </Link>
            </li>
          </div>
        )}
      </nav>

      <div className="container mt-3">
         <Routes>
           <Route path="/" element={<Dashboard/>}/>
           <Route path="/login" element={<Login/>}/>
           <Route path="/signup" element={<Register/>}/>
           <Route path = "/report" element={<Report/>}/>
         </Routes>
      </div>
      </BrowserRouter>
    </div>
  );
}

export default App;