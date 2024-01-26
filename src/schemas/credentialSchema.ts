import joi from "joi";
import { RequestCredential } from "../controllers/credentialsController.js";

const credentialSchema = joi.object<RequestCredential>({
  title: joi.string().required(),
  userName: joi.string().required(),
  url: joi.string().uri().required(),
  password: joi.string().required(),
});

export default credentialSchema;
