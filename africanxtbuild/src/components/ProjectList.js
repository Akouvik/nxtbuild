import React from 'react';
import './ProjectList.css';

const ProjectList = ({ projects }) => {
  return (
    <div className="project-list-container">
      {projects.map((project, index) => (
        <a key={index} href={project.link} className="project-card">
          <img
            src={project.image}
            alt={project.name}
            className="project-image"
          />
          <div className="project-info">
            <h3 className="project-name">{project.name}</h3>
            <p className="project-company">{project.company}</p>
            <p className="project-description">{project.description}</p>
          </div>
        </a>
      ))}
    </div>
  );
};

export default ProjectList;
