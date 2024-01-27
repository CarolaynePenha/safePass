import { SafeNote } from "@prisma/client";
import { Request, Response } from "express";
import safeNoteService from "../services/safeNoteService.js";

export type RequestSafeNote = Omit<SafeNote, "id" | "createdAt" | "userId">;
export type CreateSafeNote = Omit<SafeNote, "id" | "createdAt">;

export async function postNote(req: Request, res: Response) {
  const notesInfos: RequestSafeNote = req.body;
  const { userId } = res.locals;
  await safeNoteService.saveNote({ ...notesInfos, userId });
  res.sendStatus(201);
}
