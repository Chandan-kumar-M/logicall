import { z } from 'zod'

export const movieCreateSchema = z.object({
  title: z.string().min(1),
  type: z.enum(['Movie','TV Show']),
  director: z.string().min(1),
  budget: z.string().optional(),
  location: z.string().optional(),
  duration: z.string().optional(),
  year: z.string().optional(),
})

export const movieUpdateSchema = movieCreateSchema.partial()
