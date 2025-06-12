import { z } from 'zod';

export const taskSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  deadline: z.string().min(1), // ISO string format
  project: z.string().min(1),
  assignedMembers: z.array(z.string().min(1)),
  status: z.enum(['to-do', 'in-progress', 'done', 'cancelled'])
});
