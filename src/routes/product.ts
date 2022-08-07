import { Router } from "express";
import {addProduct, getAllProduct, updateProduct} from '../controllers/Products'
import {uploadImage} from '../helpers/upload'

const router = Router()

router.post('/add', uploadImage.single('images'), addProduct)
router.get('/all', getAllProduct)
router.patch('/update', updateProduct)
export default router