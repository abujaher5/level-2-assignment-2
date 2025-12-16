import { Request, Response } from "express";
import { vehicleServices } from "./vehicle.service";

const entryVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.entryVehicle(req.body);
    res.status(201).json({
      success: true,
      message: "Vehicle created successfully.",
      data: result.rows[0],
    });
  } catch (error: any) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getVehicles = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.getVehicles();
    const daily_rent_price = Number(result.rows[0].daily_rent_price);

    if (result.rows.length === 0) {
      res.status(200).json({
        success: true,
        message: "No vehicles found.",
        data: result.rows,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Vehicles retrieved successfully.",
        data: result.rows,
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
const getSingleVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.getSingleVehicle(
      req.params.vehicleId as string
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "Vehicle not found.",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Vehicle retrieved successfully..",
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

const updateVehicle = async (req: Request, res: Response) => {
  const vehicleId = req.params.vehicleId;

  try {
    const result = await vehicleServices.updateVehicle(
      req.body,
      vehicleId as string
    );

    if (result.rows.length === 0) {
      res.status(404).json({
        success: false,
        message: "Vehicle not found.",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Vehicle Updated Successfully..",
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

const deleteVehicle = async (req: Request, res: Response) => {
  try {
    const result = await vehicleServices.deleteVehicle(req.params.vehicleId!);

    if (result.rowCount === 0) {
      res.status(404).json({
        success: false,
        message: "Vehicle booking status is active.",
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Vehicle Deleted Successfully..",
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

export const vehicleControllers = {
  entryVehicle,
  getVehicles,
  getSingleVehicle,
  updateVehicle,
  deleteVehicle,
};
