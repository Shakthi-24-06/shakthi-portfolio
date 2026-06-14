'use client';

import { useState, useEffect } from 'react';
import './Hero.css';

export default function Hero() {
  const roles = [
    { text: "Web Developer", color: "#a343e7" },
    { text: "UI/UX Designer", color: "#ec4899" },
    { text: "Full Stack Developer", color: "#22c55e" }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % roles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <section className="hero-container">
      <div className="bg-glow-aura"></div>

      <div className="hero-content">
        <h1 className="hero-title">
          Hi, I am <span className="highlight">Shakthi</span>
        </h1>
        
        <div className="role-switcher-container">
          <p 
            className="dynamic-role" 
            style={{ color: roles[currentIndex].color }}
            key={currentIndex}
          >
            ✦ {roles[currentIndex].text}
          </p>
        </div>

        <div className="hero-buttons">
          <a href="#contact" className="btn btn-primary">Hire Me</a>
          <a href="/resume.pdf" download className="btn btn-secondary">
            Resume <span>↓</span>
          </a>
        </div>
      </div>

      <div className="hero-image-container">
        <div className="profile-frame">
          <div className="profile-placeholder">Photo</div>
        </div>
      </div>
    </section>
  );
}