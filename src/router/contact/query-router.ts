import express from "express";

import {
  getContactQuery,
  addContactQuery,
  deleteContactQuuery,
} from "../../controller/contact/query";

import { validateRequest, requireAuth } from "../../middleware";
import { body } from "express-validator";

const router = express.Router();

router.get("/contact-query", validateRequest, getContactQuery);

router.post(
  "/contact-query",
  [
    body("fullName").notEmpty().withMessage("Please provide the full Name"),
    body("message")
      .notEmpty()
      .withMessage("Please provide the message"),
    body("email").notEmpty().withMessage("Please provide the email"),
    body("phoneNumber")
      .notEmpty()
      .withMessage("Please provide the phone number"),
  ],
  validateRequest,
  //   requireAuth,
  addContactQuery
);


router.delete(
  "/contact-query/:id",
  //  requireAuth,
  deleteContactQuuery
);

export { router as contactQueryRouter };
