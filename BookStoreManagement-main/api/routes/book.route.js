import express from 'express';
import { createBook, getAllBooks, getBookById, updateBookById, deleteBookById, addReview,searchBooksByTitle } from '../controllers/book.controller.js';
import upload from "../middleware/upload.js";
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post('/', upload.single('image'), createBook);
router.get('/', getAllBooks);
router.get('/:id', getBookById);
router.put('/:id', updateBookById);
router.delete('/:id', deleteBookById);

// Review routes
router.post('/:id/reviews',verifyToken, addReview);
router.get('/search', searchBooksByTitle);

export default router;
