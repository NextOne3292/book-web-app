import { Hono } from 'hono'
import {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  getSellerBooks,
  deleteBook,
  
} from '../controllers/book.controller'
import { protect } from '../middleware/auth.middleware'

const bookRouter = new Hono()

bookRouter.post('/', protect, createBook)
bookRouter.get('/seller/my-books', protect, getSellerBooks)
bookRouter.get('/', getAllBooks)
bookRouter.get('/:id', getBookById)
bookRouter.put('/:id', protect, updateBook)
bookRouter.delete('/:id', protect, deleteBook)

export default bookRouter