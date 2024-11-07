import connectDB from "./db-connection";
import bookrouter from "./routes/book.route";
import authrouter from './routes/auth.route';
import express, { type Express, type Request, type Response } from "express";
import mechanismrouter from "./routes/mechanism.route";

const app = express();

app.use(express.json());
connectDB();   

app.get("/", (req: Request, res: Response) => {
  const date = new Date();
  const response = {
    status: "success",
    message: "Hello World",
    date: date,
  };  res.send(response);
});

// Route untuk autentikasi
app.use('/auth', authrouter);
app.use("/mechanism", mechanismrouter);
app.use("/book", bookrouter);
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Express is running on Port ${PORT}`);


  
});