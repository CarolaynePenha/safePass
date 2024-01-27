import { Router } from "express";
import authRouter from "./authRouter.js";
import credentialsRouter from "./credentialsRouter.js";
import safeNoteRouter from "./safeNoteRouter.js";
import cardRouter from "./cardRouter.js";
import wifiRouter from "./wifiRouter.js";
const router = Router();

router.use(authRouter);
router.use(credentialsRouter);
router.use(safeNoteRouter);
router.use(cardRouter);
router.use(wifiRouter);

export default router;
