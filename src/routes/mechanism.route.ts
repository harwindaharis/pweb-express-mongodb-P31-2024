// src/routes/mechanism.route.ts
import { Router } from 'express';
import { MechanismController } from '../controllers/mechanism.controller';
import { authMiddleware } from '../middleware/auth';

const router = Router();
const mechanismController = new MechanismController();

router.post('/borrow/:id', authMiddleware, mechanismController.borrowBook);
router.post('/return/:id', authMiddleware, mechanismController.returnBook);

export default router;
