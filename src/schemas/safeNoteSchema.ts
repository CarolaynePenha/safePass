import joi from "joi";
import { RequestSafeNote } from "../controllers/safeNoteCrontroller.js";

const safeNoteSchema = joi.object<RequestSafeNote>({
  title: joi.string().max(50).required(),
  note: joi.string().max(1000).required(),
});

export default safeNoteSchema;
