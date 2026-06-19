'use client';

import { useState } from 'react';
import './Header.css';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="header-container">
      <div className="logo">
        <a href="#home">Shakthi</a>
      </div>
      
      <div className={`hamburger ${isMenuOpen ? 'active' : ''}`} onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>

      <nav className={`nav-menu ${isMenuOpen ? 'open' : ''}`}>
        <ul className="navbar">
          <li><a href="#home" className="nav-link" onClick={() => setIsMenuOpen(false)}>Home</a></li>
          <li><a href="#about" className="nav-link" onClick={() => setIsMenuOpen(false)}>About</a></li>
          <li><a href="#skills" className="nav-link" onClick={() => setIsMenuOpen(false)}>Skills</a></li>
          <li><a href="#projects" className="nav-link" onClick={() => setIsMenuOpen(false)}>Projects</a></li>
          <li><a href="#education" className="nav-link" onClick={() => setIsMenuOpen(false)}>Education</a></li>
        </ul>
        <div className="header-cta">
          <a href="#contact" className="contact-btn" onClick={() => setIsMenuOpen(false)}>Contact</a>
        </div>
      </nav>
    </header>
  );
}