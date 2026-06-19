'use client';

import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const isProd = process.env.NODE_ENV === 'production';
  const basePath = isProd ? '/shakthi-portfolio' : '';

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
              <a href="https://github.com/Shakthi-24-06" target="_blank" rel="noreferrer" className="social-circle" title="GitHub">
                <img src={`${basePath}/icons/github.png`} alt="GitHub" className="footer-social-icon" />
              </a>
              <a href="https://linkedin.com/" target="_blank" rel="noreferrer" className="social-circle" title="LinkedIn">
                <img src={`${basePath}/icons/linkedin1.png`} alt="LinkedIn" className="footer-social-icon" />
              </a>
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