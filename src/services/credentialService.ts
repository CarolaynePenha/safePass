import Cryptr from "cryptr";
import { Credential } from "@prisma/client";
import {
  conflictError,
  notFoundError,
} from "../middlewares/handleErrorsMiddleware.js";
import { CreateCredential } from "../controllers/credentialsController.js";
import credentialsRepository from "../repositories/credentialReporitory.js";

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
  const userCredentials = await credentialsRepository.findCredentials(userId);
  return decrypt(userCredentials);
}
async function selectCredential(ids: CredentialIds) {
  const credential = await findUserCredential(ids);
  const userCredential = decrypt(credential);
  return userCredential;
}
async function findUserCredential(ids: CredentialIds) {
  const credential = await credentialsRepository.findCredential(ids);
  if (!credential[0]) {
    const message = "Invalid credential id";
    throw notFoundError(message);
  }
  return credential;
}

function decrypt(userCredentials: Credential[]) {
  const cryptr = new Cryptr(process.env.CRYPTR_SECRET_KEY);
  const CredentialsDecrypt = userCredentials.map(
    (userCredential: Credential) => {
      const password = cryptr.decrypt(userCredential.password);
      const data = { ...userCredential, password };
      return data;
    }
  );
  return CredentialsDecrypt;
}

async function deleteUserCredential(ids: CredentialIds) {
  await findUserCredential(ids);
  await credentialsRepository.deleteCredential(ids);
}

const credentialService = {
  saveCredential,
  selectCredentials,
  selectCredential,
  deleteUserCredential,
};

export default credentialService;
