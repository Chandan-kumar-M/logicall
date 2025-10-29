import express from 'express'
import cors from 'cors'
import moviesRouter from './routes/movies'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/movies', moviesRouter)

const PORT = process.env.PORT || 4000
app.listen(PORT, ()=> console.log(`Server running at http://localhost:${PORT}`))
