import { Router } from "express";
import { vehicleControllers } from "./vehicle.controller";

const router = Router();

router.get("/", vehicleControllers.getVehicles);
router.get("/:vehicleId", vehicleControllers.getSingleVehicle);
router.post("/", vehicleControllers.entryVehicle);
router.put("/:vehicleId", vehicleControllers.updateVehicle);
router.delete("/:vehicleId", vehicleControllers.deleteVehicle);

export const vehicleRoutes = router;
