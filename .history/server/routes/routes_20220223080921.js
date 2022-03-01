import express from 'express'
import { getUsers, register } from './routecontroller.js'

const router = express.Router();

router.get('/users', getUsers)
router.post('/users/register', register)

export default router