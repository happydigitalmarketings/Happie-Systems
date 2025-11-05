import express from 'express';
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct } from '../controllers/productController.js';
import multer from 'multer';

// Configure multer to store files in memory
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const router = express.Router();
router.post('/products', upload.single('imageFile'), createProduct);
router.get('/products', getProducts);
router.get('/products/:id', getProductById);
router.put('/products/:id', upload.single('imageFile'), updateProduct);
router.delete('/products/:id', deleteProduct);

export default router;




