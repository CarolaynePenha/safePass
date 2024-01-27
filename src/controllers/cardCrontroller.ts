import { Request, Response } from "express";
import { Card } from "@prisma/client";
import cardService from "../services/cardService.js";

export type RequestCard = Omit<Card, "id" | "createdAt" | "userId">;
export type CreateCard = Omit<Card, "id" | "createdAt">;

export async function postCard(req: Request, res: Response) {
  const cardInfos: RequestCard = req.body;
  const { userId } = res.locals;
  await cardService.saveCard({ ...cardInfos, userId });
  res.sendStatus(201);
}
export async function getCards(req: Request, res: Response) {
  const { userId } = res.locals;
  const userCards = await cardService.selectCards(userId);
  res.status(200).send(userCards);
}
export async function getCard(req: Request, res: Response) {
  const { id } = req.params;
  const { userId } = res.locals;
  const userCard = await cardService.selectCard({
    userId,
    id: Number(id),
  });
  res.status(200).send(userCard);
}
export async function deleteCard(req: Request, res: Response) {
  const { id } = req.params;
  const { userId } = res.locals;
  await cardService.deleteUserCard({
    userId,
    id: Number(id),
  });
  res.sendStatus(200);
}
