import express from "express";
import {
  getYouMayLike,
  getSingleYouMayLike,
  addYouMayLike,
  updateYouMayLike,
  deleteYouMayLike,
} from "../../controller/home/youMayLike";

import { validateRequest, requireAuth } from "../../middleware";
import { body } from "express-validator";

const router = express.Router();

router.get("/you-may-like", getYouMayLike);
router.get("/you-may-like/:title", getSingleYouMayLike);

router.post(
  "/you-may-like",
  [
    body("title").notEmpty().withMessage("Please provide the title"),
    body("imageUrl")
      .notEmpty()
      .withMessage("Please provide the image url"),
  ],
  validateRequest,
  //   requireAuth,
  addYouMayLike
);

router.put(
  "/you-may-like/:id",
  //  requireAuth,
  updateYouMayLike
);

router.delete(
  "/you-may-like/:id",
  // requireAuth,
  deleteYouMayLike
);

export { router as youMayLikeRouter };
