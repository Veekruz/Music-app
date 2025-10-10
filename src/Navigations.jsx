import React from 'react'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import MusicList from './Music';
import About from './About';
import Contact from './Contact';
import './Navigation.css'

const Navigations = () => {
  return (
    <BrowserRouter>
        <div className="header">
            <h1>Get Muxic</h1>
            <nav>
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/contact">Contact</NavLink>
            </nav>
        </div>

        <Routes>
            <Route path="/" element={<MusicList />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
        </Routes>
    </BrowserRouter>
  );
}

export default Navigations