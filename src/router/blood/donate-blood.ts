import express from "express";
import {
  getDonateBlood,
  addDonateBlood,
  updateDonateBlood,
  deleteDonateBlood,
} from "../../controller/blood-bank/donate-blood";

import { validateRequest, requireAuth } from "../../middleware";
import { body } from "express-validator";

const router = express.Router();

router.get("/donate-blood", getDonateBlood);

router.post(
  "/donate-blood",
  [
    body("title").notEmpty().withMessage("Please provide the title"),
    body("description")
      .notEmpty()
      .withMessage("Please provide the description"),
  ],
  validateRequest,
  //   requireAuth,
  addDonateBlood
);

router.put(
  "/donate-blood/:id",
  //  requireAuth,
  updateDonateBlood
);

router.delete(
  "/donate-blood/:id",
  // requireAuth,
  deleteDonateBlood
);

export { router as donateBloodRouter };
