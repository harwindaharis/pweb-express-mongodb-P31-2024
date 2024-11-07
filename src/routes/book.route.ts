import { Router } from 'express';
import { BookController } from '../controllers/book.controller';
import { authMiddleware } from '../middleware/auth';

const router = Router();
const bookController = new BookController();

router.post('/', authMiddleware, bookController.addBook);
router.get('/', authMiddleware, bookController.getAllBooks);
router.get('/:id', bookController.getBookById);
router.patch('/:id', bookController.modifyBook);
router.delete('/:id', bookController.removeBook);

export default router;