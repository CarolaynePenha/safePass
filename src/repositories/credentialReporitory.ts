import { prisma } from "../config/database.js";
import { CreateCredential } from "../controllers/credentialsController.js";
import { CredentialIds } from "../services/credentialService.js";

async function findByTitleAndUserId(title: string, userId: number) {
  return await prisma.credential.findUnique({
    where: {
      userId_title: {
        title,
        userId,
      },
    },
  });
}
async function postCredential(credentialInfos: CreateCredential) {
  console.log("credentialInfos: ", credentialInfos);
  await prisma.credential.create({ data: credentialInfos });
}

async function findCredentials(userId: number) {
  return await prisma.credential.findMany({ where: { userId } });
}
async function findCredential({ id, userId }: CredentialIds) {
  return await prisma.credential.findMany({ where: { id, userId } });
}

const credentialsRepository = {
  findByTitleAndUserId,
  postCredential,
  findCredentials,
  findCredential,
};

export default credentialsRepository;
