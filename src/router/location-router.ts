import express from "express";
import {
  getBloodBankLocations,
  addBloodBankLocation,
  updateBloodBankLocation,
  deleteBloodBankLocations,
} from "../controller/blood-bank/locations";
import { validateRequest, requireAuth } from "../middleware";
import { body } from "express-validator";

const router = express.Router();

router.get("/blood-bank/get-locations", getBloodBankLocations);

router.post(
  "/blood-bank/add-location",
  [
    body("name").notEmpty().withMessage("Please provide the name"),
    body("latitude").notEmpty().withMessage("Please provide the latitude"),
    body("longitude").notEmpty().withMessage("Please provide the longitude"),
    body("description")
      .notEmpty()
      .withMessage("Please provide the description"),
  ],
  validateRequest,
  // requireAuth,
  addBloodBankLocation
);

router.put(
  "/blood-bank/update-location/:id",
  requireAuth,
  updateBloodBankLocation
);

router.delete(
  "/blood-bank/delete-location/:id",
  requireAuth,
  deleteBloodBankLocations
);

export { router as locationRouter };
