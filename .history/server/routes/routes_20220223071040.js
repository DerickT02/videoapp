import express from 'express'
import { getUsers } from './routecontroller'

const router = express.Router();

router.get('/users', getUsers)

export default router