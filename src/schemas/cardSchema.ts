import joi from "joi";
import { RequestCard } from "../controllers/cardCrontroller.js";

const cardSchema = joi.object<RequestCard>({
  title: joi.string().required(),
  cardNumber: joi.string().required(),
  type: joi.string().valid("credit", "debit", "both").required(),
  cardholderName: joi.string().required(),
  securityCode: joi
    .string()
    .pattern(/^\d{3}$/)
    .required(),
  expirationDate: joi.string().required(),
  password: joi.string().required(),
  virtual: joi.boolean().required(),
});
export default cardSchema;
