import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import axios from '../../api/axiosInstance';
import { Project, Team } from '../../types';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';

const schema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  deadline: z.string().min(1, 'Deadline is required'),
  project: z.string().min(1, 'Project is required'),
  assignedMembers: z.array(z.string()).min(1, 'Assign at least one member'),
  status: z.enum(['to-do', 'in-progress', 'done', 'cancelled']),
});

const TaskForm: React.FC<{
  onSuccess: () => void;
  editId?: string;
  defaultValues?: any;
}> = ({ onSuccess, editId, defaultValues }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [teamMembers, setTeamMembers] = useState<Team[]>([]);

  useEffect(() => {
    axios.get('/projects').then(res => setProjects(res.data.projects || res.data));
    axios.get('/teams').then(res => setTeamMembers(res.data.teams || res.data));
  }, []);

  const formik = useFormik({
    initialValues: {
      title: defaultValues?.title ?? '',
      description: defaultValues?.description ?? '',
      deadline: defaultValues?.deadline ?? '',
      project: defaultValues?.project ?? '',
      assignedMembers: defaultValues?.assignedMembers ?? [],
      status: defaultValues?.status ?? 'to-do',
    },
    validationSchema: toFormikValidationSchema(schema),
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      if (editId) {
        await axios.put(`/tasks/${editId}`, values);
      } else {
        await axios.post('/tasks', values);
      }
      resetForm();
      onSuccess();
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Title</label>
        <input name="title" className="form-control" onChange={formik.handleChange} value={formik.values.title} />
        {typeof formik.errors.title === 'string' && <div className="text-danger">{formik.errors.title}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea name="description" className="form-control" onChange={formik.handleChange} value={formik.values.description} />
        {typeof formik.errors.description === 'string' && <div className="text-danger">{formik.errors.description}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Deadline</label>
        <input type="date" name="deadline" className="form-control" onChange={formik.handleChange} value={formik.values.deadline} />
        {typeof formik.errors.deadline === 'string' && <div className="text-danger">{formik.errors.deadline}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Project</label>
        <select name="project" className="form-control" onChange={formik.handleChange} value={formik.values.project}>
          <option value="">Select Project</option>
          {projects.map(p => (
            <option key={p._id} value={p._id}>{p.name}</option>
          ))}
        </select>
        {typeof formik.errors.project === 'string' && <div className="text-danger">{formik.errors.project}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Assigned Members</label>
        <select
          multiple
          name="assignedMembers"
          className="form-control"
          value={formik.values.assignedMembers}
          onChange={e => {
            const selected = Array.from(e.target.selectedOptions).map(o => o.value);
            formik.setFieldValue('assignedMembers', selected);
          }}
        >
          {teamMembers.map(m => (
            <option key={m._id} value={m._id}>{m.name}</option>
          ))}
        </select>
        {typeof formik.errors.assignedMembers === 'string' && <div className="text-danger">{formik.errors.assignedMembers}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Status</label>
        <select name="status" className="form-control" onChange={formik.handleChange} value={formik.values.status}>
          <option value="to-do">To Do</option>
          <option value="in-progress">In Progress</option>
          <option value="done">Done</option>
          <option value="cancelled">Cancelled</option>
        </select>
        {typeof formik.errors.status === 'string' && <div className="text-danger">{formik.errors.status}</div>}
      </div>

      <button type="submit" className="btn btn-warning w-100">
        {editId ? 'Update Task' : 'Add Task'}
      </button>
    </form>
  );
};

export default TaskForm;
