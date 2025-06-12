import { z } from 'zod';

export const projectSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  teamMembers: z.array(z.string().min(1)),
});
