import { Request, Response } from "express";
import { Credential } from "@prisma/client";
import credentialService from "../services/credentialService.js";
import credentialsRepository from "../repositories/credentialReporitory.js";

export type RequestCredential = Omit<Credential, "id" | "createdAt" | "userId">;
export type CreateCredential = Omit<Credential, "id" | "createdAt">;

export async function postCredential(req: Request, res: Response) {
  const credentialInfos: RequestCredential = req.body;
  const { userId } = res.locals;
  await credentialService.saveCredential({ ...credentialInfos, userId });
  res.sendStatus(201);
}

export async function getCredentials(req: Request, res: Response) {
  const { userId } = res.locals;
  const userCredentials = await credentialService.selectCredentials(userId);
  res.status(200).send(userCredentials);
}
export async function getCredential(req: Request, res: Response) {
  const { id } = req.params;
  const { userId } = res.locals;
  const userCredential = await credentialService.selectCredential({
    userId,
    id: Number(id),
  });
  res.status(200).send(userCredential);
}
