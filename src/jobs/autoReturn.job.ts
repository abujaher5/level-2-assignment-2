import cron from "node-cron";
import { autoReturnExpiredBookings } from "../modules/booking/booking.service";

cron.schedule("0 0 * * *", async () => {
  try {
    const total = await autoReturnExpiredBookings();
  } catch (error) {}
});
