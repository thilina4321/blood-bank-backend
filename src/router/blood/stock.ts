import express from "express";
import {
  getBloodStocks,
  addBloodStocks,
  updateBloodStocks,
  deleteBloodStocks,
  getOneBloodStocks
} from "../../controller/blood-bank/stocks";
import { validateRequest, requireAuth } from "../../middleware";
import { body } from "express-validator";

const router = express.Router();

router.get("/blood-bank/get-stocks", getBloodStocks);
router.get("/blood-bank/get-one-stock/:id", getOneBloodStocks);

router.post(
  "/blood-bank/add-stock",
  [
    body("type").notEmpty().withMessage("Please provide the type"),
    body("amount").notEmpty().withMessage("Please provide the amount"),
    body("neededAmount")
      .notEmpty()
      .withMessage("Please provide the neededAmount"),
  ],
  validateRequest,
  requireAuth,
  addBloodStocks
);

router.put("/blood-bank/update-stock/:id", requireAuth, updateBloodStocks);

router.delete("/blood-bank/delete-stock/:id", requireAuth, deleteBloodStocks);

export { router as stockRouter };
