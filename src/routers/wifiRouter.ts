import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema.js";
import tokenValidation from "../middlewares/tokenValidation.js";
import wifiSchema from "../schemas/wifiSchema.js";
import {
  deleteWifi,
  getWifi,
  getWifis,
  postWifi,
} from "../controllers/wifiController.js";

const wifiRouter = Router();

wifiRouter.post("/wifi", validateSchema(wifiSchema), tokenValidation, postWifi);
wifiRouter.get("/wifi", tokenValidation, getWifis);
wifiRouter.get("/wifi/:id", tokenValidation, getWifi);
wifiRouter.delete("/wifi/:id", tokenValidation, deleteWifi);

export default wifiRouter;
