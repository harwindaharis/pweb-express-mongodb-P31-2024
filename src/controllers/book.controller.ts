import type { Request, Response } from "express";
import BookService from "../services/book.service";

export class BookController {
	async addBook(req: Request, res: Response) {
		try {
			const book = await BookService.addBook(req.body);

			// res.status(201).json(book);

			// sama aja kaya sblmnya, tp ini sesuai response formatnya
			res.status(201).json({ status: "success", message: "Successfully add book", data: book });
		} catch (error) {
			if (error instanceof Error) {
				res.status(400).json({ status: "failed", message: error.message });
			} else {
				res.status(400).json({ status: "error", message: "Unknown error" });
			}
		}
	}

	async getAllBooks(req: Request, res: Response) {
		try {
			const books = await BookService.getAllBooks();
			res.status(201).json({ status: "success", message: "Successfully get all books", data: books });
		} catch (error: any) {
			if (error instanceof Error) {
				res.status(400).json({ status: "failed", message: error.message });
			} else {
				res.status(400).json({ status: "error", message: "Unknown error" });
			}
		}
	}

	async getBookById(req: Request, res: Response) {
		try {
			const book = await BookService.getBookById(req.params.id);
			if (!book) {
				res.status(404).json({ message: "Book not found" });
				return;
			}

			res.status(201).json({ status: "success", message: "Successfully get book by ID", data: book });
		} catch (error) {
			if (error instanceof Error) {
				res.status(500).json({ status: "failed", message: error.message });
			} else {
				res.status(500).json({ status: "error", message: "Unknown error" });
			}
		}
	}

	async modifyBook(req: Request, res: Response) {
		try {
			const book = await BookService.modifyBook(req.params.id, req.body);

			res.status(201).json({ status: "success", message: "Successfully modify book by ID", data: book });
		} catch (error) {
			if (error instanceof Error && error.message.includes("Invalid book ID format")) {
				res.status(400).json({ status: "failed", message: error.message });
			} else if (error instanceof Error && error.message.includes("not found")) {
				res.status(404).json({ status: "failed", message: error.message });
			} else {
				res.status(500).json({ status: "error", message: "Internal server error" });
			}
		}
	}

	async removeBook(req: Request, res: Response) {
		try {
			const book = await BookService.removeBook(req.params.id);
			res.json({ status: "success", message: "Book deleted successfully" });
		} catch (error) {
			if (error instanceof Error && error.message.includes("Invalid book ID format")) {
				res.status(400).json({ status: "failed", message: error.message });
			} else if (error instanceof Error && error.message.includes("not found")) {
				res.status(404).json({ status: "failed", message: error.message });
			} else {
				res.status(500).json({ status: "error", message: "Internal server error" });
			}
		}
	}
}
