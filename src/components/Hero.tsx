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
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <section id="home" className="hero-container">
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
          <button onClick={() => setIsModalOpen(true)} className="btn btn-secondary">
            Resume
          </button>
        </div>
      </div>

      <div className="hero-image-container">
        <div className="profile-frame">
          <img src="/your-photo.jpg" alt="Shakthi" className="profile-img" />
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={() => setIsModalOpen(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-btn" onClick={() => setIsModalOpen(false)}>✕</button>
            <img src="/resume.png" alt="Resume" className="resume-img" />
            <a href="/resume.png" download="Shakthi_Resume.png" className="btn btn-primary download-btn">
              Download Resume
            </a>
          </div>
        </div>
      )}
    </section>
  );
}