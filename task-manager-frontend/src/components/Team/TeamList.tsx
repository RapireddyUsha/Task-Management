import React, { useEffect, useState } from 'react';
import axios from '../../api/axiosInstance';
import { Team } from '../../types';

interface Props {
  onEdit: (team: Team) => void;
}

const TeamList: React.FC<Props> = ({ onEdit }) => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;

  useEffect(() => {
    axios.get('/teams', { params: { page, limit } }).then(res => {
      setTeams(res.data.teams || []);
      setTotalPages(res.data.totalPages || 1);
    });
  }, [page]);

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this team member?')) {
      await axios.delete(`/teams/${id}`);
      setTeams(prev => prev.filter(t => t._id !== id));
    }
  };

  return (
    <div className="card shadow-sm border-0 rounded-3">
      <div className="card-header bg-light">
        <h5 className="mb-0 text-primary">👥 Team Members</h5>
      </div>
      <div className="card-body">
        <table className="table table-striped table-hover table-bordered align-middle">
          <thead className="table-primary">
            <tr>
              <th style={{ borderRight: '2px solid #dee2e6' }}>#</th>
              <th style={{ borderRight: '2px solid #dee2e6' }}>Name</th>
              <th style={{ borderRight: '2px solid #dee2e6' }}>Email</th>
              <th style={{ borderRight: '2px solid #dee2e6' }}>Designation</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((t, index) => (
              <tr key={t._id}>
                <td style={{ borderRight: '2px solid #dee2e6' }}>
                  {(page - 1) * limit + index + 1}
                </td>
                <td style={{ borderRight: '2px solid #dee2e6' }}>
                  <strong>{t.name}</strong>
                </td>
                <td style={{ borderRight: '2px solid #dee2e6' }}>
                  <small className="text-muted">{t.email}</small>
                </td>
                <td style={{ borderRight: '2px solid #dee2e6' }}>
                  <span className="badge bg-info text-dark">{t.designation}</span>
                </td>
                <td className="text-center">
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => onEdit(t)}
                  >
                    ✏️ Edit
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(t._id)}
                  >
                    🗑 Delete
                  </button>
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

export default TeamList;
