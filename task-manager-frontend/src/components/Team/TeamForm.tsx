import React from 'react';
import { useFormik } from 'formik';
import axios from '../../api/axiosInstance';
import { z } from 'zod';
import { toFormikValidationSchema } from 'zod-formik-adapter';

const schema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email'),
  designation: z.string().min(1, 'Designation is required'),
});

const TeamForm: React.FC<{
  onSuccess: () => void;
  editId?: string;
  defaultValues?: any;
}> = ({ onSuccess, editId, defaultValues }) => {
  const formik = useFormik({
    initialValues: {
      name: defaultValues?.name || '',
      email: defaultValues?.email || '',
      designation: defaultValues?.designation || '',
    },
    validationSchema: toFormikValidationSchema(schema),
    enableReinitialize: true,
    onSubmit: async (values, { resetForm }) => {
      try {
        if (editId) {
          await axios.put(`/teams/${editId}`, values);
        } else {
          await axios.post('/teams', values);
        }
        resetForm();
        onSuccess();
      } catch (error) {
        console.error('TeamForm Error:', error);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Name</label>
        <input
          name="name"
          className="form-control"
          onChange={formik.handleChange}
          value={formik.values.name}
        />
        {typeof formik.errors.name === 'string' && <div className="text-danger">{formik.errors.name}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Email</label>
        <input
          name="email"
          className="form-control"
          onChange={formik.handleChange}
          value={formik.values.email}
        />
        {typeof formik.errors.email === 'string' && <div className="text-danger">{formik.errors.email}</div>}
      </div>

      <div className="mb-3">
        <label className="form-label">Designation</label>
        <input
          name="designation"
          className="form-control"
          onChange={formik.handleChange}
          value={formik.values.designation}
        />
        {typeof formik.errors.designation === 'string' && (
          <div className="text-danger">{formik.errors.designation}</div>
        )}
      </div>

      <button type="submit" className="btn btn-success w-100">
        {editId ? 'Update Team Member' : 'Add Team Member'}
      </button>
    </form>
  );
};

export default TeamForm;
