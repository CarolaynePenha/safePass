import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import tokenValidation from "../middlewares/tokenValidation.js";
import {
  getCredential,
  getCredentials,
  postCredential,
} from "../controllers/credentialsController.js";
import credentialSchema from "../schemas/credentialSchema.js";

const credentialsRouter = Router();

credentialsRouter.post(
  "/credentials",
  validateSchema(credentialSchema),
  tokenValidation,
  postCredential
);
credentialsRouter.get("/credentials", tokenValidation, getCredentials);
credentialsRouter.get("/credentials/:id", tokenValidation, getCredential);

export default credentialsRouter;
