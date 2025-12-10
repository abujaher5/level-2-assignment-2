import express, { Request, Response } from "express";
import initialDB from "./config/database";
import { userRoutes } from "./modules/user/user.route";
import { vehicleRoutes } from "./modules/vehicle/vehicle.route";
import { bookingRoutes } from "./modules/booking/booking.route";

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

// vehicle crud
app.use("/api/v1/vehicles", vehicleRoutes);

// booking crud
app.use("/api/v1/bookings", bookingRoutes);

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route Not Found..",
    path: req.path,
  });
});

export default app;
