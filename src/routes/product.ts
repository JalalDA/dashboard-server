import { Router } from "express";
import {addProduct, getAllProduct, updateProduct, getProductById, deleteProduct} from '../controllers/Products'
import {uploadImage} from '../helpers/upload'

const router = Router()

router.post('/add', uploadImage.single('images'), addProduct)
router.get('/all', getAllProduct)
router.get('/:id', getProductById)
router.patch('/update/:id', uploadImage.single('images'), updateProduct)
router.patch('/delete/:id', deleteProduct)
export default router