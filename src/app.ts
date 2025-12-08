import express, { Request, Response } from "express";
import initialDB from "./config/database";
import { userRoutes } from "./modules/user/user.route";

const app = express();

// parser
app.use(express.json());

// database initialize
initialDB();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from room rental system..");
});

// user crud
app.use("/api/v1/users", userRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found..",
    path: req.path,
  });
});

export default app;
