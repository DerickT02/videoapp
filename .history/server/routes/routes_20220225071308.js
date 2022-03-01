import express from 'express'
import { getUsers, register, login, getLogin } from './routecontroller.js'

const router = express.Router();

router.get('/users', getUsers)
router.get('/users/login', getLogin)
router.post('/users/register', register)
router.post('/users/login', login)

export default router