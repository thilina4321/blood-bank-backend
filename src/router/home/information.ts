import express from "express";
import {
  getHomeInformation,
  addHomeInformation,
  updateHomeInformation,
  deleteHomeInformation,
} from "../../controller/home/information";

import { validateRequest, requireAuth } from "../../middleware";
import { body } from "express-validator";

const router = express.Router();

router.get("/home-information", getHomeInformation);

router.post(
  "/home-information",
  [
    body("title").notEmpty().withMessage("Please provide the title"),
    body("description")
      .notEmpty()
      .withMessage("Please provide the description"),
  ],
  validateRequest,
  //   requireAuth,
  addHomeInformation
);

router.put(
  "/home-information/:id",
  //  requireAuth,
  updateHomeInformation
);

router.delete(
  "/home-information/:id",
  // requireAuth,
  deleteHomeInformation
);

export { router as homeInformationRouter };
