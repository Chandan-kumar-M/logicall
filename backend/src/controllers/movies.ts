import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { movieCreateSchema, movieUpdateSchema } from '../validators/movie'

const prisma = new PrismaClient()

export async function createMovie(req: Request, res: Response){
  const parsed = movieCreateSchema.safeParse(req.body)
  if(!parsed.success) return res.status(400).json({ message: parsed.error.errors.map(e=>e.message).join(', ')})
  const movie = await prisma.movie.create({ data: parsed.data })
  res.json(movie)
}

export async function listMovies(req: Request, res: Response){
  const page = Number(req.query.page || 0)
  const limit = Number(req.query.limit || 10)
  const items = await prisma.movie.findMany({
    skip: page * limit,
    take: limit,
    orderBy: { id: 'asc' }
  })
  res.json(items)
}

export async function getMovie(req: Request, res: Response){
  const id = Number(req.params.id)
  const movie = await prisma.movie.findUnique({ where: { id }})
  if(!movie) return res.status(404).json({ message: 'Not found' })
  res.json(movie)
}

export async function updateMovie(req: Request, res: Response){
  const id = Number(req.params.id)
  const parsed = movieUpdateSchema.safeParse(req.body)
  if(!parsed.success) return res.status(400).json({ message: parsed.error.errors.map(e=>e.message).join(', ')})
  const movie = await prisma.movie.update({ where: { id }, data: parsed.data })
  res.json(movie)
}

export async function deleteMovie(req: Request, res: Response){
  const id = Number(req.params.id)
  await prisma.movie.delete({ where: { id }})
  res.json({ success: true })
}
