import { prisma } from "../config/database.js";
import { CreateWifi } from "../controllers/wifiController.js";
import { CredentialIds } from "../services/credentialService.js";

async function postWifi(wifiInfos: CreateWifi) {
  await prisma.wifi.create({ data: wifiInfos });
}

async function findWifis(userId: number) {
  return await prisma.wifi.findMany({ where: { userId } });
}
async function findWifi({ id, userId }: CredentialIds) {
  const wifi = await prisma.wifi.findFirst({
    where: { id, userId },
  });
  return [wifi];
}
async function deleteWifi({ id, userId }: CredentialIds) {
  await prisma.wifi.delete({
    where: { id, userId },
  });
}

const wifiRepositorie = {
  postWifi,
  findWifis,
  findWifi,
  deleteWifi,
};

export default wifiRepositorie;
