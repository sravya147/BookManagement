import express from 'express'
import { createBook,getAllBooks,getBookById,updateBookById,deleteBookById } from '../controllers/book.controller.js';



const router = express.Router();

router.post('/',createBook);
router.get('/',getAllBooks);
router.get('/:id',getBookById);
router.post('/:id',updateBookById);
router.delete('/:id',deleteBookById);





export default router
