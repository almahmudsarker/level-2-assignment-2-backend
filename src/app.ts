import cors from "cors";
import express, { Request, Response } from "express";
import { ProductRoutes } from "./module/products/product.route";
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/products", ProductRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello i am a server!");
});

app.all("*", (req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    message: "Resource not found",
  });
});

export default app;
