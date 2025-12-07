import express, { Request, Response } from "express";

const app = express();

// parser
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello from assignment 2");
});

// app.post("/users");

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found..",
    path: req.path,
  });
});

export default app;
