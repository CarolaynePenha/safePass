import { Session } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import authRepository from "../repositories/authRepository.js";
import { CreateUser } from "../controllers/authController.js";
import {
  conflictError,
  unauthorizedError,
} from "../middlewares/handleErrorsMiddleware.js";

async function saveUser(signUpInfos: CreateUser) {
  const salt = 10;
  const passwordHash = bcrypt.hashSync(signUpInfos.password, salt);
  await userExists(signUpInfos.email, "signUp");
  await authRepository.postUserInfos({
    email: signUpInfos.email,
    password: passwordHash,
  });
}
async function userExists(email: string, type: string) {
  const user = await authRepository.findByEmail(email);
  if (type === "signUp" && user) {
    const message = "email already exists";
    throw conflictError(message);
  }
  if (type === "others" && !user) {
    const message = "email already exists";
    throw conflictError(message);
  }
  return user;
}

export type CreateSession = Omit<Session, "id" | "createdAt">;

async function createSession(signInInfos: CreateUser) {
  const user = await userExists(signInInfos.email, "others");
  validPassword(signInInfos.password, user.password);
  const token = tokenGeneration(user.id);
  await authRepository.postSessionInfos({ token, userId: user.id });
}
function validPassword(textPassword: string, hashPassword: string) {
  const validation = bcrypt.compareSync(textPassword, hashPassword);
  if (!validation) {
    const message = "Invalid email or password";
    throw unauthorizedError(message);
  }
}
function tokenGeneration(id) {
  const token = jwt.sign(
    {
      data: id,
    },
    process.env.KEY,
    { expiresIn: "1h" }
  );
  return token;
}
const authService = {
  createSession,
  saveUser,
};
export default authService;
