import Cryptr from "cryptr";
import { CreateCredential } from "../controllers/credentialsController.js";
import {
  conflictError,
  notFoundError,
} from "../middlewares/handleErrorsMiddleware.js";
import credentialsRepository from "../repositories/credentialReporitory.js";
import { number } from "joi";

async function saveCredential(credentialInfos: CreateCredential) {
  await checkTitleIsUnique(credentialInfos.title, credentialInfos.userId);
  const cryptr = new Cryptr(process.env.CRYPTR_SECRET_KEY);
  const hashPassword = cryptr.encrypt(credentialInfos.password);
  await credentialsRepository.postCredential({
    ...credentialInfos,
    password: hashPassword,
  });
}
async function checkTitleIsUnique(title: string, userId: number) {
  const credential = await credentialsRepository.findByTitleAndUserId(
    title,
    userId
  );
  if (credential) {
    const message = " There is already a credential with that title";
    throw conflictError(message);
  }
}
export interface CredentialIds {
  userId: number;
  id: number;
}
async function selectCredentials(userId: number) {
  return await credentialsRepository.findCredentials(userId);
}
async function selectCredential(ids: CredentialIds) {
  const credential = await credentialsRepository.findCredential(ids);
  if (!credential.length) {
    const message = "Invalid credential id";
    throw notFoundError(message);
  }
  return credential;
}
const credentialService = {
  saveCredential,
  selectCredentials,
  selectCredential,
};

export default credentialService;
