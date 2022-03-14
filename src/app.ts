import "dotenv/config";
import express from "express";
import "express-async-errors";
import cors from "cors";
import { NotFoundError } from "@ticketsz/common";
import { ErrorHandling, basicAuth } from "./middleware";
import { currentUser } from "./middleware/current-user";
import dotenv from "dotenv";
dotenv.config();
const app = express();

// rooutes
import { authRouter } from "./router/auth-router";
import { locationRouter } from "./router/location-router";
import { faqRouter } from "./router/home/faq-router";
import { stockRouter } from "./router/blood/stock";
import { doctorNotesRoutes } from "./router/about/doctor-note";
import { contactRouter } from "./router/contact/contact-router";

app.use(express.json());
app.use(cors());
app.use(currentUser);

app.use(basicAuth);

// router
app.use(authRouter);
app.use(locationRouter);
app.use(faqRouter);
app.use(stockRouter);
app.use(doctorNotesRoutes);
app.use(contactRouter);

app.all("*", () => {
  throw new NotFoundError();
});
app.use(ErrorHandling);

export { app };

console.log("testing...");
