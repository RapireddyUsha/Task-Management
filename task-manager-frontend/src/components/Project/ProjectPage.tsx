import React, { useState } from 'react';
import ProjectForm from './ProjectForm';
import ProjectList from './ProjectList';
import { Project, Team } from '../../types';

const ProjectPage: React.FC = () => {
  const [editProject, setEditProject] = useState<Project | null>(null);
  const [refresh, setRefresh] = useState(false);

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Form */}
        <div className="col-md-4 mb-4">
          <div className="card shadow-sm border-0 rounded-3">
            <div className="card-header bg-success text-white">
              <h5 className="mb-0">{editProject ? '✏️ Edit Project' : '➕ Add Project'}</h5>
            </div>
            <div className="card-body">
              <ProjectForm
                editId={editProject?._id}
                defaultValues={editProject ? {
                  name: editProject.name,
                  description: editProject.description,
                  teamMembers: (editProject.teamMembers as Team[]).map(t => t._id),
                } : undefined}
                onSuccess={() => {
                  setEditProject(null);
                  setRefresh(!refresh);
                }}
              />
            </div>
          </div>
        </div>

        {/* List */}
        <div className="col-md-8">
          <ProjectList onEdit={setEditProject} key={refresh ? 'yes' : 'no'} />
        </div>
      </div>
    </div>
  );
};

export default ProjectPage;
