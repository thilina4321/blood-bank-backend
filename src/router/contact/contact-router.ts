import express from "express";

import {
  getContactDetails,
  addContactDetails,
  updateContactDetails,
  deleteContactDetails,
} from "../../controller/contact/contact";

import { validateRequest, requireAuth } from "../../middleware";
import { body } from "express-validator";

const router = express.Router();

router.get("/contact-details", validateRequest, getContactDetails);

router.post(
  "/contact-details",
  [
    body("title").notEmpty().withMessage("Please provide the title"),
    body("description")
      .notEmpty()
      .withMessage("Please provide the description"),
    body("email").notEmpty().withMessage("Please provide the email"),
    body("phoneNumber")
      .notEmpty()
      .withMessage("Please provide the phone number"),
    body("fax").notEmpty().withMessage("Please provide the fax"),
  ],
  validateRequest,
  //   requireAuth,
  addContactDetails
);

router.put(
  "/contact-details/:id",
  //  requireAuth,
  updateContactDetails
);

router.delete(
  "/contact-details/:id",
  //  requireAuth,
  deleteContactDetails
);

export { router as contactRouter };
