import "dotenv/config";
import express from "express";
import "express-async-errors";
import cors from "cors";
import { authRouter } from "./router/auth-router";
import { locationRouter } from "./router/location-router";
import { faqRouter } from "./router/home/faq-router";
import { NotFoundError } from "@ticketsz/common";
import { ErrorHandling, basicAuth } from "./middleware";
import { currentUser } from "./middleware/current-user";
const app = express();

app.use(express.json());
app.use(cors());
app.use(currentUser);

app.use(basicAuth);
app.use(authRouter);
app.use(locationRouter);
app.use(faqRouter);
app.all("*", () => {
  throw new NotFoundError();
});
app.use(ErrorHandling);

export { app };
