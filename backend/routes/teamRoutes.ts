import express from 'express';
import Team from '../models/teamModel';
import { teamSchema } from '../validations/teamValidation';

const router = express.Router();

// GET (with pagination)
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 5;
  const skip = (page - 1) * limit;

  const [teams, count] = await Promise.all([
    Team.find().skip(skip).limit(limit),
    Team.countDocuments()
  ]);

  const totalPages = Math.ceil(count / limit);
  res.json({ teams, totalPages });
});

// POST
router.post('/', async (req, res) => {
  try {
    const parsed = teamSchema.parse(req.body);
    const team = await Team.create(parsed);
    res.status(201).json(team);
  } catch (err: any) {
    res.status(400).json({ error: err.errors || err.message });
  }
});

// PUT (update)
router.put('/:id', async (req, res) => {
  try {
    const parsed = teamSchema.parse(req.body);
    const updated = await Team.findByIdAndUpdate(req.params.id, parsed, { new: true });
    res.json(updated);
  } catch (err: any) {
    res.status(400).json({ error: err.errors || err.message });
  }
});

// DELETE
router.delete('/:id', async (req, res) => {
  await Team.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted successfully' });
});

export default router;
