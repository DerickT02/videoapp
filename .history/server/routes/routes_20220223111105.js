import express from 'express'
import { getUsers, register, login } from './routecontroller.js'

const router = express.Router();

router.get('/users', getUsers)
router.post('/users/register', register)
router.post('/users/login', login)

export default router