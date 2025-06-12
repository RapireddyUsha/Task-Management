import { z } from 'zod';

export const teamSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  designation: z.string().min(1)
});
