import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import tokenValidation from "../middlewares/tokenValidation.js";
import safeNoteSchema from "../schemas/safeNoteSchema.js";
import {
  deleteNote,
  getNote,
  getNotes,
  postNote,
} from "../controllers/safeNoteCrontroller.js";

const safeNoteRouter = Router();

safeNoteRouter.post(
  "/safeNote",
  validateSchema(safeNoteSchema),
  tokenValidation,
  postNote
);
safeNoteRouter.get("/safeNote", tokenValidation, getNotes);
safeNoteRouter.get("/safeNote/:id", tokenValidation, getNote);
safeNoteRouter.delete("/safeNote/:id", tokenValidation, deleteNote);

export default safeNoteRouter;
