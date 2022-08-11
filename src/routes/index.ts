import { Router } from "express";
import authRouter from './auth'
import productRouter from './product'
import userRouter from './user'
const router = Router()

router.use('/auth', authRouter)
router.use('/product', productRouter)
router.use('/user', userRouter)

export default router