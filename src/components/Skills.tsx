'use client';

<<<<<<< HEAD
import Image from 'next/image';

=======
>>>>>>> master
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
      imgSrc: '/shakthi-portfolio/skills/html.png'
=======
      imgSrc: `${basePath}/skills/html.png`
>>>>>>> master
    },
    { 
      name: 'CSS3', 
      level: 'Advanced', 
      color: '#264de4',
<<<<<<< HEAD
      imgSrc: '/shakthi-portfolio/skills/css.png'
=======
      imgSrc: `${basePath}/skills/css.png`
>>>>>>> master
    },
    { 
      name: 'JavaScript', 
      level: 'Intermediate', 
      color: '#f7df1e',
<<<<<<< HEAD
      imgSrc: '/shakthi-portfolio/skills/js.png'
=======
      imgSrc: `${basePath}/skills/js.png`
>>>>>>> master
    },
    { 
      name: 'React', 
      level: 'Intermediate', 
      color: '#61dafb',
<<<<<<< HEAD
      imgSrc: '/shakthi-portfolio/skills/react.png'
=======
      imgSrc: `${basePath}/skills/react.png`
    },
    { 
      name: 'Python', 
      level: 'Intermediate', 
      color: '#3776ab',
      imgSrc: `${basePath}/skills/python.png`
>>>>>>> master
    },
    { 
      name: 'SQL', 
      level: 'Intermediate', 
      color: '#4479a1',
<<<<<<< HEAD
      imgSrc: '/shakthi-portfolio/skills/sql.png'
=======
      imgSrc: `${basePath}/skills/sql.png`
>>>>>>> master
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