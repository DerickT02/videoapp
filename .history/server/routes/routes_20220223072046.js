import express from 'express'
import { getUsers } from './routecontroller.js'

const router = express.Router();

router.get('/users', getUsers)

export default router