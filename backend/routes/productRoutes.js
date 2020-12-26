import express from 'express'
const router = express.Router()
import { getProducts, getProductById, deleteProductByAdmin, updateProductByAdmin, createProductByAdmin } from '../controllers/productController.js'
import { protect, admin } from '../middleware/authMiddleware.js'

router.route('/').get(getProducts).post(protect, admin, createProductByAdmin)
router.route('/:id').get(getProductById).delete(protect, admin, deleteProductByAdmin).put(protect, admin, updateProductByAdmin)

export default router