'use client';

import Image from 'next/image';

import './Skills.css';


export default function Skills() {
  const skillsData = [
    { 
      name: 'HTML5', 
      level: 'Advanced', 
      color: '#e34c26',
      imgSrc: '/shakthi-portfolio/images/skills/html.png'
    },
    { 
      name: 'CSS3', 
      level: 'Advanced', 
      color: '#264de4',
      imgSrc: '/shakthi-portfolio/images/skills/css.png'
    },
    { 
      name: 'JavaScript', 
      level: 'Intermediate', 
      color: '#f7df1e',
      imgSrc: '/shakthi-portfolio/images/skills/js.png'
    },
    { 
      name: 'React', 
      level: 'Intermediate', 
      color: '#61dafb',
      imgSrc: '/shakthi-portfolio/images/skills/react.png'
    },
    { 
      name: 'SQL', 
      level: 'Intermediate', 
      color: '#4479a1',
      imgSrc: '/shakthi-portfolio/images/skills/sql.png'
    }
  ];

  return (
    <section id="skills" className="skills-section">
      <div className="skills-bg-gradient-mesh"></div>
      
      <div className="skills-container">
        <h2 className="skills-title">
          My <span className="highlight">Skills</span>
        </h2>
        
        <div className="skills-grid">
          {skillsData.map((skill, index) => (
            <div 
              key={index} 
              className="skill-card" 
              style={{ '--hover-color': skill.color } as React.CSSProperties}
            >
              <div className="skill-logo-wrap">
                <img src={skill.imgSrc} alt={`${skill.name} logo`} className="skill-img" />
              </div>
              <div className="skill-info">
                <h3>{skill.name}</h3>
                <span className="skill-level">{skill.level}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}