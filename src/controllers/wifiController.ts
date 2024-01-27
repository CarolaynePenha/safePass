import { Wifi } from "@prisma/client";
import { Request, Response } from "express";
import wifiService from "../services/wifiService.js";

export type RequestWifi = Omit<Wifi, "id" | "createdAt" | "userId">;
export type CreateWifi = Omit<Wifi, "id" | "createdAt">;

export async function postWifi(req: Request, res: Response) {
  const wifiInfos: RequestWifi = req.body;
  const { userId } = res.locals;
  await wifiService.saveWifi({ ...wifiInfos, userId });
  res.sendStatus(201);
}
export async function getWifis(req: Request, res: Response) {
  const { userId } = res.locals;
  const userWifis = await wifiService.selectWifis(userId);
  res.status(200).send(userWifis);
}
export async function getWifi(req: Request, res: Response) {
  const { id } = req.params;
  const { userId } = res.locals;
  const userWifi = await wifiService.selectWifi({
    userId,
    id: Number(id),
  });
  res.status(200).send(userWifi);
}
export async function deleteWifi(req: Request, res: Response) {
  const { id } = req.params;
  const { userId } = res.locals;
  await wifiService.deleteUserWifi({
    userId,
    id: Number(id),
  });
  res.sendStatus(200);
}
