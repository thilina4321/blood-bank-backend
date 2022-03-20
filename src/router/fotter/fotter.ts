import express from "express";
import {
  getFotter,
  addFotter,
  updateFotter,
  deleteFotter,
} from "../../controller/fotter/fotter";

import { validateRequest, requireAuth } from "../../middleware";
import { body } from "express-validator";

const router = express.Router();

router.get("/fotter", getFotter);

router.post(
  "/fotter",
  [
    body("title").notEmpty().withMessage("Please provide the title"),
    body("url")
      .notEmpty()
      .withMessage("Please provide the url"),
  ],
  validateRequest,
  //   requireAuth,
  addFotter
);

router.put(
  "/fotter/:id",
  //  requireAuth,
  updateFotter
);

router.delete(
  "/fotter/:id",
  // requireAuth,
  deleteFotter
);

export { router as fotterRouter };
