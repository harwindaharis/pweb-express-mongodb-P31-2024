// src/controllers/mechanism.controller.ts
import type { Request, Response } from 'express';
import MechanismService from '../services/mechanism.service';

export class MechanismController {
  async borrowBook(req: Request, res: Response) {
    try {
      const { id: bookId } = req.params;
      const qty = await MechanismService.borrowBook( bookId);

      if (qty !== null) {
        res.status(200).json({ status: 'success', message: 'Successfully borrow book', data: { currentQty: qty } });
      } else {
        res.status(400).json({ status: 'failed', message: 'Book is out of stock or not found' });
      }
    } catch (error) {
      res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
  }

  async returnBook(req: Request, res: Response) {
    try {
      const { id: bookId } = req.params;
    //   const userId = req.user.id;
      const qty = await MechanismService.returnBook(bookId);

      if (qty !== null) {
        res.status(200).json({ status: 'success', message: 'Successfully return book', data: { currentQty: qty } });
      } else {
        res.status(404).json({ status: 'failed', message: 'Book not found' });
      }
    } catch (error) {
      res.status(500).json({ status: 'error', message: 'Internal server error' });
    }
  }
}
