import { prisma } from "../config/database.js";
import { CreateUser } from "../controllers/authController.js";
import { CreateSession } from "../services/authService.js";

async function findByEmail(email: string) {
  return await prisma.user.findUnique({ where: { email } });
}
async function postUserInfos(signUpInfos: CreateUser) {
  await prisma.user.create({ data: signUpInfos });
}
async function postSessionInfos(sessionInfos: CreateSession) {
  await prisma.session.create({ data: sessionInfos });
}
async function getSession(token: string) {
  return await prisma.session.findUnique({ where: { token } });
}

const authRepository = {
  findByEmail,
  postUserInfos,
  postSessionInfos,
  getSession,
};

export default authRepository;
