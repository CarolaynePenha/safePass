import { Router } from "express";
import authRouter from "./authRouter.js";
import credentialsRouter from "./credentialsRouter.js";
import safeNoteRouter from "./safeNoteRouter.js";
import cardRouter from "./cardRouter.js";
const router = Router();

router.use(authRouter);
router.use(credentialsRouter);
router.use(safeNoteRouter);
router.use(cardRouter);

export default router;
