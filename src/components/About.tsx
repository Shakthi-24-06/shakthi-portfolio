'use client';

import { useState, useEffect, useRef } from 'react';
import './About.css';

export default function About() {
  const [projects, setProjects] = useState(0);
  const [skills, setSkills] = useState(0);
  const [experience, setExperience] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          animateCount(6, setProjects, 1500);
          animateCount(10, setSkills, 1500);
          animateCount(1, setExperience, 1500);
          observer.disconnect();
        }
      },
      { 
        threshold: 0.6,
        rootMargin: "0px 0px -20px 0px"
      }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const animateCount = (target: number, setValue: React.Dispatch<React.SetStateAction<number>>, duration: number) => {
    let start = 0;
    if (target === 0) return;
    
    const stepTime = Math.max(Math.floor(duration / target), 40);
    
    const timer = setInterval(() => {
      start += 1;
      setValue(start);
      if (start >= target) {
        clearInterval(timer);
      }
    }, stepTime);
  };

  return (
    <section id="about" className="about-section" ref={sectionRef}>
      <div className="about-container">
        
        <div className="about-left-content">
          <h2 className="about-title">
            About <span className="highlight">Me</span>
          </h2>
          <p className="about-description">
            I am a driven Computer Applications student specializing in building innovative web applications. With a solid foundation in modern development frameworks and database logic, I constantly challenge myself to create solutions that solve real-world problems.
          </p>
          <p className="about-description">
            My approach combines structured logic with creative design, ensuring that every project delivers an exceptional user experience.
          </p>
        </div>

        <div className="about-right-display">
          <div className="main-stats-box">
            
            <div className="stat-card card-projects">
              <div className="stat-info">
                <span className="big-number">{projects}+</span>
                <p className="stat-label">Projects</p>
              </div>
            </div>

            <div className="stat-card card-skills">
              <div className="stat-info">
                <span className="big-number">{skills}+</span>
                <p className="stat-label">Skills</p>
              </div>
            </div>

            <div className="stat-card card-exp">
              <div className="stat-info">
                <span className="big-number">{experience}</span>
                <p className="stat-label">Year Experience</p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}