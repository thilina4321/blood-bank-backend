import express from "express";

import {
  getHomeFaqs,
  addHomeFaqs,
  updateHomeFaq,
  deleteHomeFaq,
} from "../../controller/home/faq";

import { validateRequest, requireAuth } from "../../middleware";
import { body } from "express-validator";

const router = express.Router();

router.get("/home/get-faqs", validateRequest, getHomeFaqs);

router.post(
  "/home/add-faq",
  [
    body("question").notEmpty().withMessage("Please provide the question"),
    body("answer").notEmpty().withMessage("Please provide the answer"),
  ],
  validateRequest,
//   requireAuth,
  addHomeFaqs
);

router.put("/home/update-faq/:id",
//  requireAuth, 
 updateHomeFaq);

router.delete("/home/delete-faq/:id",
//  requireAuth,
  deleteHomeFaq);

export { router as faqRouter };
