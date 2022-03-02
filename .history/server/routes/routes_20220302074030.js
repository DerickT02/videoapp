import express from 'express'
import { getUsers, register, login, getLogin, logout, getRooms, createRooms } from './routecontroller.js'

const router = express.Router();

router.get('/users', getUsers)
router.get('/users/login', getLogin)
router.post('/users/register', register)
router.post('/users/login', login)
router.get('/users/logout', logout)
router.get('/rooms', getRooms)
router.post('/rooms', createRooms)

export default router