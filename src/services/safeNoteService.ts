import { CreateSafeNote } from "../controllers/safeNoteCrontroller.js";
import {
  conflictError,
  notFoundError,
} from "../middlewares/handleErrorsMiddleware.js";
import safeNoteRepository from "../repositories/safeNoteRepository.js";
import { CredentialIds } from "./credentialService.js";

async function saveNote(noteInfos: CreateSafeNote) {
  await checkTitleIsUnique(noteInfos.title, noteInfos.userId);
  await safeNoteRepository.postNote(noteInfos);
}
async function checkTitleIsUnique(title: string, userId: number) {
  const note = await safeNoteRepository.findByTitleAndUserId(title, userId);
  if (note) {
    const message = " There is already a safe note with that title";
    throw conflictError(message);
  }
}
async function selectNotes(userId: number) {
  return await safeNoteRepository.findNotes(userId);
}

async function selectNote(ids: CredentialIds) {
  const credential = await safeNoteRepository.findNote(ids);
  if (!credential[0]) {
    const message = "Invalid safe note id";
    throw notFoundError(message);
  }
  return credential;
}

async function deleteUserNote(ids: CredentialIds) {
  await selectNote(ids);
  safeNoteRepository.deleteNote(ids);
}
const safeNoteService = {
  saveNote,
  selectNotes,
  selectNote,
  deleteUserNote,
};
export default safeNoteService;
