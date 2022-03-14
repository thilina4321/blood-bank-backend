import express from "express";

import {
  getDoctorsNotes,
  addDoctorsNotes,
  updateDoctorNote,
  deleteDoctorNote,
} from "../../controller/about/doctors-notes";

import { validateRequest, requireAuth } from "../../middleware";
import { body } from "express-validator";

const router = express.Router();

router.get("/blood-bank/doctors-notes", getDoctorsNotes);

router.post(
  "/blood-bank/doctors-notes",
  [
    body("name").notEmpty().withMessage("Please provide the name"),
    body("note").notEmpty().withMessage("Please provide the note"),
    body("position")
      .notEmpty()
      .withMessage("Please provide the position"),
  ],
  validateRequest,
  // requireAuth,
  addDoctorsNotes
);

router.put("/blood-bank/doctors-notes/:id", requireAuth, updateDoctorNote);

router.delete("/blood-bank/doctors-notes/:id", requireAuth, deleteDoctorNote);

export { router as doctorNotesRoutes };
