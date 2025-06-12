import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import axios from '../../api/axiosInstance';
import { Team } from '../../types';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';

const schema = z.object({
  name: z.string().min(1, 'Project name is required'),
  description: z.string().min(1, 'Description is required'),
  teamMembers: z.array(z.string()).min(1, 'Select at least one member'),
});

const ProjectForm: React.FC<{
  onSuccess: () => void;
  editId?: string;
  defaultValues?: any;
}> = ({ onSuccess, editId, defaultValues }) => {
  const [teams, setTeams] = useState<Team[]>([]);

  useEffect(() => {
    axios.get('/teams').then(res => setTeams(res.data.teams || res.data));
  }, []);

  const formik = useFormik({
    initialValues: {
      name: defaultValues?.name || '',
      description: defaultValues?.description || '',
      teamMembers: defaultValues?.teamMembers || [],
    },
    validationSchema: toFormikValidationSchema(schema),
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      try {
        if (editId) {
          await axios.put(`/projects/${editId}`, values);
        } else {
          await axios.post('/projects', values);
        }
        resetForm();
        onSuccess();
      } catch (error) {
        console.error('ProjectForm Error:', error);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      {/* Name Field */}
      <div className="mb-3">
        <label className="form-label">Project Name</label>
        <input
          name="name"
          className="form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.touched.name && typeof formik.errors.name === 'string' && (
          <div className="text-danger small mt-1">{formik.errors.name}</div>
        )}
      </div>

      {/* Description Field */}
      <div className="mb-3">
        <label className="form-label">Description</label>
        <textarea
          name="description"
          className="form-control"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
        />
        {formik.touched.description && typeof formik.errors.description === 'string' && (
          <div className="text-danger small mt-1">{formik.errors.description}</div>
        )}
      </div>

      {/* Team Members Field */}
      <div className="mb-3">
        <label className="form-label">Team Members</label>
        <select
          multiple
          name="teamMembers"
          className="form-control"
          value={formik.values.teamMembers}
          onBlur={formik.handleBlur}
          onChange={e =>
            formik.setFieldValue(
              'teamMembers',
              Array.from(e.target.selectedOptions).map(o => o.value)
            )
          }
        >
          {teams.map(t => (
            <option key={t._id} value={t._id}>
              {t.name}
            </option>
          ))}
        </select>
        {formik.touched.teamMembers && typeof formik.errors.teamMembers === 'string' && (
          <div className="text-danger small mt-1">{formik.errors.teamMembers}</div>
        )}
      </div>

      <button type="submit" className="btn btn-success w-100">
        {editId ? 'Update Project' : 'Add Project'}
      </button>
    </form>
  );
};

export default ProjectForm;
