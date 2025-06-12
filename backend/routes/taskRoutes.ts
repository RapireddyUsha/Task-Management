import express from 'express';
import Task from '../models/taskModel';
import { taskSchema } from '../validations/taskValidation';

const router = express.Router();

router.get('/', async (req, res) => {
  const page = parseInt(req.query.page as string) || 1;
  const limit = parseInt(req.query.limit as string) || 5;
  const skip = (page - 1) * limit;

  const { search = '', status = '', project = '', member = '', fromDate = '', toDate = '' } = req.query;

  const query: any = {
    ...(search && {
      $or: [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
      ],
    }),
    ...(status && { status }),
    ...(project && { project }),
    ...(member && { assignedMembers: member }),
  };

  if (fromDate && toDate) {
    query.deadline = {
      $gte: new Date(fromDate as string),
      $lte: new Date(toDate as string),
    };
  }

  const [tasks, count] = await Promise.all([
    Task.find(query)
      .populate('project', 'name')
      .populate('assignedMembers', 'name')
      .skip(skip)
      .limit(limit),
    Task.countDocuments(query),
  ]);

  const totalPages = Math.ceil(count / limit);
  res.json({ tasks, totalPages });
});

router.post('/', async (req, res) => {
  try {
    const parsed = taskSchema.parse(req.body);
    const task = await Task.create(parsed);
    res.status(201).json(task);
  } catch (err: any) {
    res.status(400).json({ error: err.errors || err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const parsed = taskSchema.parse(req.body);
    const task = await Task.findByIdAndUpdate(req.params.id, parsed, { new: true });
    res.json(task);
  } catch (err: any) {
    res.status(400).json({ error: err.errors || err.message });
  }
});

router.delete('/:id', async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted successfully' });
});

export default router;
