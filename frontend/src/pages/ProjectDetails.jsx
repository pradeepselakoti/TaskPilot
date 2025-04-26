import React from 'react';
import { useParams } from 'react-router-dom';

const ProjectDetails = () => {
  const { id } = useParams();

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Project Details Page</h1>
      <p>This is the project page for project ID: <strong>{id}</strong></p>
    </div>
  );
};

export default ProjectDetails;
