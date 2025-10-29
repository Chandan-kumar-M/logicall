import { Router } from 'express'
import * as ctrl from '../controllers/movies'

const router = Router()
router.post('/', ctrl.createMovie)
router.get('/', ctrl.listMovies)
router.get('/:id', ctrl.getMovie)
router.put('/:id', ctrl.updateMovie)
router.delete('/:id', ctrl.deleteMovie)

export default router
