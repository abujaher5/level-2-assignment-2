import express from "express";
import { userControllers } from "./user.controller";
import auth from "../../middleware/auth";
import logger from "../../middleware/logger";

const router = express.Router();

router.get("/", logger, auth("admin"), userControllers.getUser);

router.put(
  "/:userId",
  logger,
  auth("admin", "customer"),
  userControllers.updateUserInfo
);

router.delete("/:userId", logger, auth("admin"), userControllers.deleteUser);

export const userRoutes = router;
