import { CreateSafeNote } from "../controllers/safeNoteCrontroller.js";
import { conflictError } from "../middlewares/handleErrorsMiddleware.js";
import safeNoteRepository from "../repositories/safeNoteRepository.js";

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
const safeNoteService = {
  saveNote,
};
export default safeNoteService;
