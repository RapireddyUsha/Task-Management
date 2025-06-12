import express from 'express';
import Project from '../models/projectModel';
import { projectSchema } from '../validations/projectValidation';

const router = express.Router();

// GET with pagination
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 5;
  const skip = (page - 1) * limit;

  const [projects, count] = await Promise.all([
    Project.find().populate('teamMembers', 'name').skip(skip).limit(limit),
    Project.countDocuments()
  ]);

  const totalPages = Math.ceil(count / limit);
  res.json({ projects, totalPages });
});

// POST
router.post('/', async (req, res) => {
  try {
    const parsed = projectSchema.parse(req.body);
    const project = await Project.create(parsed);
    res.status(201).json(project);
  } catch (err: any) {
    res.status(400).json({ error: err.errors || err.message });
  }
});

// PUT
router.put('/:id', async (req, res) => {
  try {
    const parsed = projectSchema.parse(req.body);
    const updated = await Project.findByIdAndUpdate(req.params.id, parsed, { new: true });
    res.json(updated);
  } catch (err: any) {
    res.status(400).json({ error: err.errors || err.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  await Project.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted successfully' });
});

export default router;
