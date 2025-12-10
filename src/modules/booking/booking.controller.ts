import { Request, Response } from "express";
import { bookingServices } from "./booking.service";

const createBooking = async (req: Request, res: Response) => {
  try {
    const result = await bookingServices.createBooking(req.body);
    // console.log(result.rows[0]);
    // console.log(result.rows);
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
    // console.log(result);
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const getBookings = async (req: Request, res: Response) => {
  try {
    const result = await bookingServices.getBookings();
    res.status(200).json({
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

const updateBooking = async (req: Request, res: Response) => {
  const bookingId = req.params.bookingId;

  try {
    const result = await bookingServices.updateBooking(
      req.body,
      bookingId as string
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "Booking not found.",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Booking Updated Successfully..",
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
  updateBooking,
};
