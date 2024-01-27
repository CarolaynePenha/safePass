import joi from "joi";
import { RequestWifi } from "../controllers/wifiController.js";

const wifiSchema = joi.object<RequestWifi>({
  networkTitle: joi.string().max(50).required(),
  networkName: joi.string().max(100).required(),
  password: joi.string().max(100).required(),
});

export default wifiSchema;
