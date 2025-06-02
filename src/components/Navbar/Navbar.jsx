import React from 'react'
import './Navbar.css'
import DarkMode from '../DarkMode/DarkMode'
import Fire from '../../assets/fire.png'
import Star from '../../assets/glowing-star.png'
import Party from '../../assets/partying-face.png'

const Navbar = () => {
  return (
    <nav className="navbar">
        <h1>Movie Hunter</h1>
        <div className="navbar-links">
            <DarkMode />
            <a href="#popular">Popular <img className="navbar-emoji" src={Fire} alt='fire emoji' /></a>
            <a href="#top_rated">Top Rated <img className="navbar-emoji" src={Star} alt='star emoji' /></a>
            <a href="#upcoming">Upcoming <img className="navbar-emoji" src={Party} alt='party emoji' /></a>
        </div>
    </nav>
  )
}

export default Navbar
