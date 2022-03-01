import express from 'express'
import { getUsers, register, login, getLogin, logout } from './routecontroller.js'

const router = express.Router();

router.get('/users', getUsers)
router.get('/users/login', getLogin)
router.post('/users/register', register)
router.post('/users/login', login)
router.get('/users/logout', logout)

export default router