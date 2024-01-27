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
export async function getNotes(req: Request, res: Response) {
  const { userId } = res.locals;
  const userNotes = await safeNoteService.selectNotes(userId);
  res.status(200).send(userNotes);
}
export async function getNote(req: Request, res: Response) {
  const { id } = req.params;
  const { userId } = res.locals;
  const userNote = await safeNoteService.selectNote({
    userId,
    id: Number(id),
  });
  res.status(200).send(userNote);
}
export async function deleteNote(req: Request, res: Response) {
  const { id } = req.params;
  const { userId } = res.locals;
  await safeNoteService.deleteUserNote({
    userId,
    id: Number(id),
  });
  res.sendStatus(200);
}
