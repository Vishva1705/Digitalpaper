import React, { useState, useEffect } from "react";
import axios from 'axios';
import Aos from 'aos';
import $ from "jquery";
import './Navbar.css'
import { NavLink, Link } from 'react-router-dom'
import { FiMenu, FiX } from "react-icons/fi"
import { Container } from 'react-bootstrap'
import logo from './Assest/logo.png'
import Page1 from './Assest/Page1.jpg'
import Page2 from './Assest/Page2.jpg'
import Page3 from './Assest/Page3.jpg'
import Page4 from './Assest/Page4.jpg'
import Page5 from './Assest/Page5.jpg'
import Page6 from './Assest/Page6.jpg'
import Page7 from './Assest/Page7.jpg'
import Page8 from './Assest/Page8.jpg'
import './Styles/Home.css'
import Sharing from "../Sharing";
import { BrowserRouter, Routes, Route,useNavigate,useHistory,Switch} from 'react-router-dom'



const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(false)

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar)
  }

  return (
    <>

      <nav className="navbar">
        <div className="container">
          <div className="logo">
            <img src={logo} style={{ height: '30px' }}  ></img>
          </div>
          <div className="menu-icon" onClick={handleShowNavbar}>
            <FiMenu />
          </div>
          <div className={`nav-elements  ${showNavbar && 'active'}`}>
            <ul>
              {/* <li> <span></span>
                <input type="date" id="Date" onChange={(e) => setSelectedDate(e.target.value)}
                  min="2023-01-01" max={defaultValue} defaultValue={defaultValue} onSelect={news}
                  style={{ border: 'none', boxShadow: 'none', background: 'none' }} />
              </li> */}
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/Shop">Shop</NavLink>
              </li>
              <li>
                <NavLink to="/about">About</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Contact</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
        
       
    </>

  )
}

export default Navbar