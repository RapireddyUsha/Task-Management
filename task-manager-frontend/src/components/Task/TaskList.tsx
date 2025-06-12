import React, { useEffect, useState } from 'react';
import axios from '../../api/axiosInstance';
import { Task, Project, Team } from '../../types';

interface Props {
  onEdit: (task: Task) => void;
}

const TaskList: React.FC<Props> = ({ onEdit }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [teamMembers, setTeamMembers] = useState<Team[]>([]);
  const [filters, setFilters] = useState({
    search: '',
    status: '',
    project: '',
    member: '',
    fromDate: '',
    toDate: '',
  });

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 5;

  useEffect(() => {
    axios.get('/projects').then(res => setProjects(res.data.projects || res.data));
    axios.get('/teams').then(res => setTeamMembers(res.data.teams || res.data));
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [page]);

  const fetchTasks = async () => {
    const res = await axios.get('/tasks', { params: { ...filters, page, limit } });
    setTasks(res.data.tasks || []);
    setTotalPages(res.data.totalPages || 1);
  };

  const handleFilterApply = () => {
    setPage(1);
    fetchTasks();
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await axios.delete(`/tasks/${id}`);
      setTasks(prev => prev.filter(t => t._id !== id));
    }
  };

  return (
    <div className="card shadow-sm border-0 rounded-3">
      <div className="card-header bg-light">
        <h5 className="mb-0 text-primary">Tasks</h5>
      </div>
      <div className="card-body">
        {/* Filters */}
        <div className="row g-2 mb-3">
          <div className="col-md-6">
            <input className="form-control" placeholder="Search title/description" value={filters.search} onChange={(e) => setFilters({ ...filters, search: e.target.value })} />
          </div>
          <div className="col-md-3">
            <select className="form-control" value={filters.status} onChange={(e) => setFilters({ ...filters, status: e.target.value })}>
              <option value="">All Status</option>
              <option value="to-do">To Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div className="col-md-3 d-grid">
            <button className="btn btn-outline-primary" onClick={handleFilterApply}>Apply Filters</button>
          </div>
        </div>

        {/* Table */}
        <table className="table table-striped table-hover table-bordered align-middle">
          <thead className="table-warning">
            <tr>
              <th style={{ borderRight: '2px solid #dee2e6' }}>#</th>
              <th style={{ borderRight: '2px solid #dee2e6' }}>Title</th>
              <th style={{ borderRight: '2px solid #dee2e6' }}>Project</th>
              <th style={{ borderRight: '2px solid #dee2e6' }}>Members</th>
              <th style={{ borderRight: '2px solid #dee2e6' }}>Status</th>
              <th style={{ borderRight: '2px solid #dee2e6' }}>Deadline</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((t, index) => (
              <tr key={t._id}>
                <td style={{ borderRight: '2px solid #dee2e6' }}>{(page - 1) * limit + index + 1}</td>
                <td style={{ borderRight: '2px solid #dee2e6' }}><strong>{t.title}</strong></td>
                <td style={{ borderRight: '2px solid #dee2e6' }}>
                  {typeof t.project === 'string' ? t.project : (t.project as Project)?.name}
                </td>
                <td style={{ borderRight: '2px solid #dee2e6' }}>
                  {(t.assignedMembers as Team[]).map(m => typeof m === 'string' ? m : m.name).join(', ')}
                </td>
                <td style={{ borderRight: '2px solid #dee2e6' }}>
                  <span className="badge bg-secondary">{t.status}</span>
                </td>
                <td style={{ borderRight: '2px solid #dee2e6' }}>
                  {new Date(t.deadline).toLocaleDateString()}
                </td>
                <td className="text-center">
                  <button className="btn btn-sm btn-outline-primary me-2" onClick={() => onEdit(t)}>✏️Edit</button>
                  <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(t._id)}>🗑Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="d-flex justify-content-between align-items-center mt-3">
          <button className="btn btn-outline-secondary btn-sm" disabled={page === 1} onClick={() => setPage(p => p - 1)}>← Prev</button>
          <span className="text-muted small">Page {page} of {totalPages}</span>
          <button className="btn btn-outline-secondary btn-sm" disabled={page === totalPages} onClick={() => setPage(p => p + 1)}>Next →</button>
        </div>
      </div>
    </div>
  );
};

export default TaskList;
