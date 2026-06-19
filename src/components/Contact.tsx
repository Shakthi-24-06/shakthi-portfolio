'use client';

import { useState, FormEvent } from 'react';
import './Contact.css';

export default function Contact() {
  const isProd = process.env.NODE_ENV === 'production';
  const basePath = isProd ? '/shakthi-portfolio' : '';

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Add your form submission logic here
    alert('Thank you for reaching out!');
    setIsSubmitting(false);
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        <h2 className="contact-title">Get In <span className="highlight">Touch</span></h2>
        <p className="contact-subtitle">Have a project in mind or just want to say hi? Feel free to drop a message!</p>

        <div className="contact-content">
          <div className="contact-info">
            <div className="info-card">
              <div className="info-icon">📧</div>
              <div className="info-details">
                <h3>Email</h3>
                <a href="mailto:sshakthi1024@gmail.com">sshakthi1024@gmail.com</a>
              </div>
            </div>

            <div className="info-card">
              <div className="info-icon">📍</div>
              <div className="info-details">
                <h3>Location</h3>
                <p>Tamil Nadu, India</p>
              </div>
            </div>

            <div className="social-links-container">
              <h3>Follow Me</h3>
              <div className="social-icon-grid">
                <a href="#" target="_blank" rel="noreferrer" className="btn-social">
                  <img src={`${basePath}/icons/linkedin.png`} alt="LinkedIn" className="social-icon" />
                  LinkedIn
                </a>
                <a href="https://github.com/Shakthi-24-06" target="_blank" rel="noreferrer" className="btn-social">
                  <img src={`${basePath}/icons/github.png`} alt="GitHub" className="social-icon" />
                  GitHub
                </a>
              </div>
            </div>
          </div>

          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" required value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Enter your name" disabled={isSubmitting} />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" required value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} placeholder="Enter your email" disabled={isSubmitting} />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" rows={5} required value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} placeholder="Type your message here..." disabled={isSubmitting}></textarea>
            </div>
            <button type="submit" className="contact-submit-btn" disabled={isSubmitting}>
              {isSubmitting ? 'Sending...' : 'Send Message'} <span>→</span>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}