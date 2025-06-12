import React, { useEffect, useState } from 'react';
import axios from '../../api/axiosInstance';
import { Project, Team } from '../../types';

interface Props {
  onEdit: (p: Project) => void;
}

const ProjectList: React.FC<Props> = ({ onEdit }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;

  useEffect(() => {
    axios.get('/projects', { params: { page, limit } }).then(res => {
      setProjects(res.data.projects || []);
      setTotalPages(res.data.totalPages || 1);
    });
  }, [page]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      await axios.delete(`/projects/${id}`);
      setProjects(prev => prev.filter(p => p._id !== id));
    }
  };

  return (
    <div className="card shadow-sm border-0 rounded-3">
      <div className="card-header bg-light">
        <h5 className="mb-0 text-primary">📁 Projects</h5>
      </div>
      <div className="card-body">
        <table className="table table-striped table-hover table-bordered align-middle">
          <thead className="table-primary">
            <tr>
              <th style={{ borderRight: '2px solid #dee2e6' }}>#</th>
              <th style={{ borderRight: '2px solid #dee2e6' }}>Name</th>
              <th style={{ borderRight: '2px solid #dee2e6' }}>Description</th>
              <th style={{ borderRight: '2px solid #dee2e6' }}>Team Members</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((p, index) => (
              <tr key={p._id}>
                <td style={{ borderRight: '2px solid #dee2e6' }}>{(page - 1) * limit + index + 1}</td>
                <td style={{ borderRight: '2px solid #dee2e6' }}><strong>{p.name}</strong></td>
                <td style={{ borderRight: '2px solid #dee2e6' }}>{p.description}</td>
                <td style={{ borderRight: '2px solid #dee2e6' }}>
                  {(p.teamMembers as Team[]).map(m => m.name).join(', ')}
                </td>
                <td className="text-center">
                  <button className="btn btn-sm btn-outline-primary me-2" onClick={() => onEdit(p)}>✏️ Edit</button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(p._id)}>🗑 Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="d-flex justify-content-between align-items-center mt-3">
          <button
            className="btn btn-outline-secondary btn-sm"
            disabled={page === 1}
            onClick={() => setPage(p => p - 1)}
          >
            ← Prev
          </button>
          <span className="text-muted small">Page {page} of {totalPages}</span>
          <button
            className="btn btn-outline-secondary btn-sm"
            disabled={page === totalPages}
            onClick={() => setPage(p => p + 1)}
          >
            Next →
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectList;
