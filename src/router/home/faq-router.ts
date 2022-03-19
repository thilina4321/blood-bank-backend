import express from "express";

import {
  getHomeFaqs,
  addHomeFaqs,
  updateHomeFaq,
  deleteHomeFaq,
  getSingleFaq,
} from "../../controller/home/faq";

import { validateRequest, requireAuth } from "../../middleware";
import { body } from "express-validator";

const router = express.Router();

router.get("/home/faqs", validateRequest, getHomeFaqs);
router.get("/home/faqs/:question", getSingleFaq);

router.post(
  "/home/faqs",
  [
    body("question").notEmpty().withMessage("Please provide the question"),
    body("answer").notEmpty().withMessage("Please provide the answer"),
  ],
  validateRequest,
  //   requireAuth,
  addHomeFaqs
);

router.put(
  "/home/faqs/:id",
  //  requireAuth,
  updateHomeFaq
);

router.delete(
  "/home/faqs/:id",
  //  requireAuth,
  deleteHomeFaq
);

export { router as faqRouter };
