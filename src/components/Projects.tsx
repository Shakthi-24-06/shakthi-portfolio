'use client';

import { useState } from 'react';
import './Projects.css';

interface ProjectType {
  title: string;
  shortDescription: string;
  longDescription: string;
  tags: string[];
  githubLink: string;
  demoLink: string;
}

export default function Projects() {
  const [activeProject, setActiveProject] = useState<ProjectType | null>(null);

  const projectsData: ProjectType[] = [
    {
      title: "Leaf Disease Detection",
      shortDescription: "An innovative computer vision application built to detect and analyze plant leaf diseases.",
      longDescription: "This project focuses on identifying agricultural plant leaf diseases at an early stage. Developed using Python and OpenCV, it handles image preprocessing, color space conversion, and pixel-counting masks to isolate infected zones.",
      tags: ["Python", "OpenCV", "Image Processing"],
      githubLink: "https://github.com/Shakthi-24-06/leaf-detection",
      demoLink: "#"
    },
    {
      title: "AI Interface Clone",
      shortDescription: "A clean, modern local web application replicating a popular conversational AI interface.",
      longDescription: "A highly responsive web interface featuring dynamic input auto-resizing, interactive sidebar toggles, and smooth state transitions using modern CSS and native JavaScript.",
      tags: ["HTML5", "CSS3", "JavaScript"],
      githubLink: "https://github.com/Shakthi-24-06/ai-interface",
      demoLink: "#"
    },
    {
      title: "Student Performance Analyzer",
      shortDescription: "A logic-driven database automation project designed to analyze academic data.",
      longDescription: "A back-end system that automates mark aggregation, percentage calculations, and rank generation using SQL and PL/SQL stored procedures, ensuring data integrity.",
      tags: ["SQL", "PL/SQL", "Database Logic"],
      githubLink: "https://github.com/Shakthi-24-06/student-analyzer",
      demoLink: "#"
    }
  ];

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <h2 className="projects-title">My <span className="highlight">Projects</span></h2>
        
        <div className="projects-grid">
          {projectsData.map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-header">
                <h3>{project.title}</h3>
                <p className="project-description">{project.shortDescription}</p>
              </div>
              <div className="project-tags">
                {project.tags.map((tag, tIdx) => <span key={tIdx} className="tag">{tag}</span>)}
              </div>
              <button onClick={() => setActiveProject(project)} className="project-link-btn">
                View Details <span>→</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {activeProject && (
        <div className="popup-overlay" onClick={() => setActiveProject(null)}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <button className="popup-close-btn" onClick={() => setActiveProject(null)}>&times;</button>
            <div className="popup-header">
              <h3>{activeProject.title}</h3>
              <div className="popup-tags">
                {activeProject.tags.map((tag, tIdx) => <span key={tIdx} className="tag">{tag}</span>)}
              </div>
            </div>
            <div className="popup-body">
              <p>{activeProject.longDescription}</p>
              <div className="popup-actions">
                <a href={activeProject.githubLink} target="_blank" rel="noopener noreferrer" className="action-btn github-btn">GitHub</a>
                <a href={activeProject.demoLink} target="_blank" rel="noopener noreferrer" className="action-btn demo-btn">View Demo</a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}