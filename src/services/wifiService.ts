import Cryptr from "cryptr";
import { Wifi } from "@prisma/client";
import { notFoundError } from "../middlewares/handleErrorsMiddleware.js";
import { CredentialIds } from "./credentialService.js";
import { CreateWifi } from "../controllers/wifiController.js";
import wifiRepositorie from "../repositories/wifiRepositoriy.js";

async function saveWifi(wifiInfos: CreateWifi) {
  const cryptr = new Cryptr(process.env.CRYPTR_SECRET_KEY);
  const hashPassword = cryptr.encrypt(wifiInfos.password);
  await wifiRepositorie.postWifi({
    ...wifiInfos,
    password: hashPassword,
  });
}
async function selectWifis(userId: number) {
  const userWifis = await wifiRepositorie.findWifis(userId);
  return decrypt(userWifis);
}
async function selectWifi(ids: CredentialIds) {
  const wifi = await findUserWifi(ids);
  const userWifi = decrypt(wifi);
  return userWifi;
}
async function findUserWifi(ids: CredentialIds) {
  const wifi = await wifiRepositorie.findWifi(ids);
  if (!wifi[0]) {
    const message = "Invalid wi-fi id";
    throw notFoundError(message);
  }
  return wifi;
}

function decrypt(userWifi: Wifi[]) {
  const cryptr = new Cryptr(process.env.CRYPTR_SECRET_KEY);
  const wifiDecrypt = userWifi.map((userWifi: Wifi) => {
    const password = cryptr.decrypt(userWifi.password);
    const data = { ...userWifi, password };
    return data;
  });
  return wifiDecrypt;
}

async function deleteUserWifi(ids: CredentialIds) {
  await findUserWifi(ids);
  wifiRepositorie.deleteWifi(ids);
}

const wifiService = {
  saveWifi,
  selectWifis,
  selectWifi,
  deleteUserWifi,
};

export default wifiService;
