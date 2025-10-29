// TEMP MOCK BACKEND (no DB)
import { Request, Response } from "express";

let movies: any[] = [
  { id: 1, title: "Inception", type: "Movie", director: "Christopher Nolan", budget: "$160M" },
  { id: 2, title: "Breaking Bad", type: "TV Show", director: "Vince Gilligan", budget: "$3M/ep" }
];
let idCounter = 3;

export async function createMovie(req: Request, res: Response) {
  const movie = { id: idCounter++, ...req.body };
  movies.push(movie);
  res.json(movie);
}

export async function listMovies(req: Request, res: Response) {
  res.json(movies);
}

export async function getMovie(req: Request, res: Response) {
  const id = Number(req.params.id);
  const movie = movies.find(m => m.id === id);
  if (!movie) return res.status(404).json({ message: "Not found" });
  res.json(movie);
}

export async function updateMovie(req: Request, res: Response) {
  const id = Number(req.params.id);
  const idx = movies.findIndex(m => m.id === id);
  if (idx === -1) return res.status(404).json({ message: "Not found" });
  movies[idx] = { ...movies[idx], ...req.body };
  res.json(movies[idx]);
}

export async function deleteMovie(req: Request, res: Response) {
  const id = Number(req.params.id);
  movies = movies.filter(m => m.id !== id);
  res.json({ success: true });
}
