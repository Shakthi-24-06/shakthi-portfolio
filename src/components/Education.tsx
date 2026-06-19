'use client';

import Image from 'next/image';
import './Education.css';

interface EducationType {
  title: string;
  institution: string;
  duration: string;
  logoSrc: string;
}

export default function Education() {
  const isProd = process.env.NODE_ENV === 'production';
  const basePath = isProd ? '/shakthi-portfolio' : '';

  const educationData: EducationType[] = [
    {
      title: "Bachelor of Computer Applications (BCA)",
      institution: "Govindammal Aditanar College for Women, Tiruchendur",
      duration: "2023 - 2026",
      logoSrc: `${basePath}/images/college-logo.png`
    },
    {
      title: "Higher Secondary Schooling",
      institution: "Elliott Tuxford Girls Higher Secondary School, Meignanapuram",
      duration: "2021 - 2023",
      logoSrc: `${basePath}/images/school-logo.png`
    }
  ];

  return (
    <section id="education" className="education-section">
      <div className="education-container">
        <h2 className="education-title">
          My <span className="highlight">Education</span>
        </h2>

        <div className="timeline-wrapper">
          <div className="timeline-center-line"></div>

          {educationData.map((edu, index) => (
            <div 
              key={index} 
              className={`timeline-item ${index % 2 === 0 ? 'left-item' : 'right-item'}`}
            >
              <div className="timeline-dot"></div>
              
              <div className="education-card">
                <div className="card-logo-area">
                  <div className="edu-logo-wrap">
                    <Image 
                      src={edu.logoSrc} 
                      alt={edu.institution}
                      width={70}
                      height={70}
                      className="edu-img"
                    />
                  </div>
                </div>
                
                <div className="card-content-area">
                  <div className="education-header">
                    <span className="edu-duration">{edu.duration}</span>
                  </div>
                  <h3 className="edu-degree">{edu.title}</h3>
                  <h4 className="edu-institution">{edu.institution}</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}