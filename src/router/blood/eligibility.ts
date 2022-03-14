import express from "express";
import {
  getEligibility,
  addEligibility,
  updateEligibility,
  deleteEligibility,
} from "../../controller/blood-bank/eligibility";

import { validateRequest, requireAuth } from "../../middleware";
import { body } from "express-validator";

const router = express.Router();

router.get("/eligibility", getEligibility);

router.post(
  "/eligibility",
  [
    body("title").notEmpty().withMessage("Please provide the title"),
    body("description")
      .notEmpty()
      .withMessage("Please provide the description"),
  ],
  validateRequest,
  //   requireAuth,
  addEligibility
);

router.put(
  "/eligibility/:id",
  //  requireAuth,
  updateEligibility
);

router.delete(
  "/eligibility/:id",
  // requireAuth,
  deleteEligibility
);

export { router as eligibilityRouter };
