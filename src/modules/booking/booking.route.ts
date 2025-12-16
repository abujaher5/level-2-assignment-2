import { Router } from "express";
import { bookingControllers } from "./booking.controller";
import auth from "../../middleware/auth";
import logger from "../../middleware/logger";

const router = Router();

router.post(
  "/",
  logger,
  auth("admin", "customer"),
  bookingControllers.createBooking
);
router.get("/", auth("admin", "customer"), bookingControllers.getBookings);
router.put(
  "/:bookingId",
  auth("admin", "customer"),
  bookingControllers.updateBookingStatus
);

export const bookingRoutes = router;
