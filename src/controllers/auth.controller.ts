// src/controllers/auth.controller.ts
import type { Request, Response } from "express";
import AuthService from "../services/auth.service";

export class AuthController {
	async register(req: Request, res: Response) {
		try {
			const { username, password, email } = req.body;
			const user = await AuthService.register(username, password, email);
			res.status(201).json({ status: "success", message: "User registered successfully", data: user });
		} catch (error) {
			res.status(400).json({ status: "failed", message: "Registration failed" });
		}
	}

	async login(req: Request, res: Response) {
		try {
			const { username, password, email } = req.body;
			const userData = await AuthService.login(username, password, email);
			if (userData.error === "User not found") {
				res.status(404).json({ status: "failed", message: "User not registered" });
			} else if (userData.error === "Invalid password") {
				res.status(401).json({ status: "failed", message: "Invalid credentials" });
			} else {
				res.status(200).json({ status: "success", message: "Login successful", data: userData });
			}
		} catch (error) {
			res.status(500).json({ status: "error", message: "Invalid credentials" });
		}
	}
}
