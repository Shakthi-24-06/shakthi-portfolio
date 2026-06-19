'use client';

import './Skills.css';

export default function Skills() {
  const isProd = process.env.NODE_ENV === 'production';
  const basePath = isProd ? '/shakthi-portfolio' : '';

  const skillsData = [
    { 
      name: 'HTML5', 
      level: 'Advanced', 
      color: '#e34c26',
<<<<<<< HEAD
      imgSrc: `${basePath}/skills/html.png`
=======
      imgSrc: '/shakthi-portfolio/skills/html.png'
>>>>>>> 8c157f3140b7e52ffc8ad75c2cdcb597fd65fe92
    },
    { 
      name: 'CSS3', 
      level: 'Advanced', 
      color: '#264de4',
<<<<<<< HEAD
      imgSrc: `${basePath}/skills/css.png`
=======
      imgSrc: '/shakthi-portfolio/skills/css.png'
>>>>>>> 8c157f3140b7e52ffc8ad75c2cdcb597fd65fe92
    },
    { 
      name: 'JavaScript', 
      level: 'Intermediate', 
      color: '#f7df1e',
<<<<<<< HEAD
      imgSrc: `${basePath}/skills/js.png`
=======
      imgSrc: '/shakthi-portfolio/skills/js.png'
>>>>>>> 8c157f3140b7e52ffc8ad75c2cdcb597fd65fe92
    },
    { 
      name: 'React', 
      level: 'Intermediate', 
      color: '#61dafb',
<<<<<<< HEAD
      imgSrc: `${basePath}/skills/react.png`
=======
      imgSrc: '/shakthi-portfolio/skills/react.png'
>>>>>>> 8c157f3140b7e52ffc8ad75c2cdcb597fd65fe92
    },
    { 
      name: 'SQL', 
      level: 'Intermediate', 
      color: '#4479a1',
<<<<<<< HEAD
      imgSrc: `${basePath}/skills/sql.png`
=======
      imgSrc: '/shakthi-portfolio/skills/sql.png'
>>>>>>> 8c157f3140b7e52ffc8ad75c2cdcb597fd65fe92
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
