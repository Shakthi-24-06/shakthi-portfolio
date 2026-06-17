'use client';

import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer-section">
      <div className="footer-container">
        
        <div className="footer-main-grid">
          <div className="footer-brand-column">
            <h2 className="footer-name">Shakthi</h2>
            <p className="footer-description">
              A driven developer building innovative web applications with modern design and clean code logic.
            </p>
          </div>

          <div className="footer-links-column">
            <h3>Quicklinks</h3>
            <ul>
              <li><a href="#about">About</a></li>
              <li><a href="#project">Project</a></li>
              <li><a href="#skills">Skills</a></li>
              <li><a href="#education">Education</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-connect-column">
            <h3>Connect</h3>
            <div className="footer-social-row">
              <a href="#" className="social-circle" target="_blank" rel="noreferrer" title="GitHub">gh</a>
              <a href="#" className="social-circle" target="_blank" rel="noreferrer" title="LinkedIn">in</a>
            </div>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <p>© {currentYear} Shakthi's Portfolio. All Rights Reserved.</p>
        </div>

      </div>
    </footer>
  );
}