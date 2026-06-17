'use client';

import { useState } from 'react';
import './Projects.css';

interface ProjectType {
  title: string;
  shortDescription: string;
  longDescription: string;
  tags: string[];
  link: string;
}

export default function Projects() {
  const [activeProject, setActiveProject] = useState<ProjectType | null>(null);

  const projectsData: ProjectType[] = [
    {
      title: "Leaf Disease Detection",
      shortDescription: "An innovative computer vision application built to detect and analyze plant leaf diseases using image processing.",
      longDescription: "This project focuses on identifying agricultural plant leaf diseases at an early stage. Developed using Python and OpenCV, the application handles image preprocessing, converts frames into HSV color space, and applies specific pixel-counting masks to isolate infected zones. It provides an efficient method for evaluating crop health and minimizing potential yield loss.",
      tags: ["Python", "OpenCV", "Image Processing"],
      link: "#"
    },
    {
      title: "AI Interface Clone",
      shortDescription: "A clean, modern local web application replicating a popular conversational AI interface with real-time responsive text layouts.",
      longDescription: "This project is a highly responsive web interface designed to mirror modern conversational AI platforms. Built using clean HTML5, advanced CSS flexbox/grid mechanics, and native JavaScript, it features dynamic input auto-resizing, interactive sidebar toggles, and smooth focus states to deliver a seamless user experience.",
      tags: ["HTML5", "CSS3", "JavaScript"],
      link: "#"
    },
    {
      title: "Student Performance Analyzer",
      shortDescription: "A logic-driven database automation project designed to analyze student marks, calculate ranks, and generate academic insights.",
      longDescription: "A back-end database management system that automates the tracking and evaluation of academic data. Leveraging SQL and PL/SQL stored procedures, the system automates mark aggregation, percentage calculations, grade distributions, and final rank generation while strictly maintaining data integrity through relational tables.",
      tags: ["SQL", "PL/SQL", "Database Logic"],
      link: "#"
    }
  ];

  return (
    <section id="projects" className="projects-section">
      <div className="projects-container">
        <h2 className="projects-title">
          My <span className="highlight">Projects</span>
        </h2>
        
        <div className="projects-grid">
          {projectsData.map((project, index) => (
            <div key={index} className="project-card">
              <div className="project-header">
                <h3>{project.title}</h3>
                <p className="project-description">{project.shortDescription}</p>
              </div>
              
              <div className="project-tags">
                {project.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="tag">{tag}</span>
                ))}
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
            <button className="popup-close-btn" onClick={() => setActiveProject(null)}>
              &times;
            </button>
            <div className="popup-header">
              <h3>{activeProject.title}</h3>
              <div className="popup-tags">
                {activeProject.tags.map((tag, tagIndex) => (
                  <span key={tagIndex} className="tag">{tag}</span>
                ))}
              </div>
            </div>
            <div className="popup-body">
              <p>{activeProject.longDescription}</p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}