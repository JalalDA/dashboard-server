import {verifyToken} from '../middlewares/verifytoken'
import { getAllUsers } from '../controllers/Users'
import { Router } from 'express'

const router = Router()

router.get('/all', verifyToken, getAllUsers)

export default router