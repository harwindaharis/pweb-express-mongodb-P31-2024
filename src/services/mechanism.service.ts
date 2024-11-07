// src/services/mechanism.service.ts
import Book from '../models/book.model';

export class MechanismService {
  async borrowBook(bookId: string): Promise<number | null> {
    const book = await Book.findById(bookId);
    if (book && book.qty > 1) {
      book.qty -= 1;
      await book.save();
      return book.qty;
    }
    return null;
  }

  async returnBook(bookId: string): Promise<number | null> {
      const book = await Book.findById(bookId);
    if (book) {
    if (book.qty >= book.initialQty) {
        throw new Error("Book cannot be returned");
      }
    
      book.qty += 1;
      await book.save();
      return book.qty;
    }
    return null;

  }
}

export default new MechanismService();
