import { prisma } from "../config/database.js";
import { CreateSafeNote } from "../controllers/safeNoteCrontroller.js";
import { CredentialIds } from "../services/credentialService.js";

async function findByTitleAndUserId(title: string, userId: number) {
  return await prisma.safeNote.findUnique({
    where: {
      userId_title: {
        title,
        userId,
      },
    },
  });
}
async function postNote(noteInfos: CreateSafeNote) {
  await prisma.safeNote.create({ data: noteInfos });
}

async function findNotes(userId: number) {
  return await prisma.safeNote.findMany({ where: { userId } });
}
async function findNote({ id, userId }: CredentialIds) {
  const note = await prisma.safeNote.findFirst({
    where: { id, userId },
  });
  return [note];
}
async function deleteNote({ id, userId }: CredentialIds) {
  await prisma.safeNote.delete({
    where: { id, userId },
  });
}

const safeNoteRepository = {
  findByTitleAndUserId,
  postNote,
  findNotes,
  findNote,
  deleteNote,
};

export default safeNoteRepository;
