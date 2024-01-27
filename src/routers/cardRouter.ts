import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import tokenValidation from "../middlewares/tokenValidation.js";
import cardSchema from "../schemas/cardSchema.js";
import {
  deleteCard,
  getCard,
  getCards,
  postCard,
} from "../controllers/cardCrontroller.js";

const cardRouter = Router();

cardRouter.post("/card", validateSchema(cardSchema), tokenValidation, postCard);
cardRouter.get("/card", tokenValidation, getCards);
cardRouter.get("/card/:id", tokenValidation, getCard);
cardRouter.delete("/card/:id", tokenValidation, deleteCard);

export default cardRouter;
