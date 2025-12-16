import { Request, Response } from "express";
import { bookingServices } from "./booking.service";

const createBooking = async (req: Request, res: Response) => {
  try {
    const result = await bookingServices.createBooking(req.body);

    if (!result || result.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Vehicle not found..",
      });
    }

    res.status(201).json({
      success: true,
      message: "Booking created successfully.",
      data: result[0],
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getBookings = async (req: Request, res: Response) => {
  try {
    const loggedInUser = req.user!;

    if (loggedInUser.role === "admin") {
      const result = await bookingServices.getBookings();
      return res.status(200).json({
        success: true,
        message: "Bookings retrieved successfully.",
        data: result.rows,
      });
    }

    const result = await bookingServices.getBookingsByCustomerId(
      loggedInUser.id
    );

    return res.status(200).json({
      success: true,
      message: "Bookings retrieved successfully.",
      data: result.rows,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      details: error,
    });
  }
};

const updateBookingStatus = async (req: Request, res: Response) => {
  const bookingId = req.params.bookingId;

  const { status } = req.body;

  const user = req.user!;
  const customer_id = user.id;

  try {
    if (user.role === "customer") {
      if (status !== "cancelled") {
        return res.status(400).json({
          success: false,
          message: "Customer Can cancel booking",
        });
      }

      const result = await bookingServices.cancelOwnBooking(
        bookingId as string,
        customer_id
      );

      return res.status(200).json({
        success: true,
        message: "Booking cancelled successfully.",
        data: result.rows,
      });
    }

    if (user.role === "admin") {
      const result = await bookingServices.markBookingAsReturned(
        bookingId as string
      );

      return res.status(200).json({
        success: true,
        message: "Booking marked as returned.Vehicle is now available.",
        data: result.rows[0],
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message,
      details: error,
    });
  }
};

export const bookingControllers = {
  createBooking,
  getBookings,
  updateBookingStatus,
};
