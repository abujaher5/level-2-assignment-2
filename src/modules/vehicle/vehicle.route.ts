import { Router } from "express";
import { vehicleControllers } from "./vehicle.controller";
import auth from "../../middleware/auth";
import logger from "../../middleware/logger";

const router = Router();

router.get("/", logger, vehicleControllers.getVehicles);
router.get("/:vehicleId", logger, vehicleControllers.getSingleVehicle);
router.post("/", auth("admin"), logger, vehicleControllers.entryVehicle);
router.put("/:vehicleId", auth("admin"), vehicleControllers.updateVehicle);
router.delete("/:vehicleId", auth("admin"), vehicleControllers.deleteVehicle);

export const vehicleRoutes = router;
