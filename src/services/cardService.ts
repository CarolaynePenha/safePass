import Cryptr from "cryptr";
import { Card } from "@prisma/client";
import {
  conflictError,
  notFoundError,
} from "../middlewares/handleErrorsMiddleware.js";
import { CreateCard } from "../controllers/cardCrontroller.js";
import cardRepository from "../repositories/cardRepository.js";
import { CredentialIds } from "./credentialService.js";

async function saveCard(cardInfos: CreateCard) {
  await checkTitleIsUnique(cardInfos.title, cardInfos.userId);
  const cryptr = new Cryptr(process.env.CRYPTR_SECRET_KEY);
  const hashPassword = cryptr.encrypt(cardInfos.password);
  const hashCvv = cryptr.encrypt(cardInfos.securityCode);
  await cardRepository.postCard({
    ...cardInfos,
    password: hashPassword,
    securityCode: hashCvv,
  });
}
async function checkTitleIsUnique(title: string, userId: number) {
  const card = await cardRepository.findByTitleAndUserId(title, userId);
  if (card) {
    const message = " There is already a card with that title";
    throw conflictError(message);
  }
}
async function selectCards(userId: number) {
  const userCards = await cardRepository.findCards(userId);
  return decrypt(userCards);
}
async function selectCard(ids: CredentialIds) {
  const card = await findUserCard(ids);
  const userCard = decrypt(card);
  return userCard;
}
async function findUserCard(ids: CredentialIds) {
  const card = await cardRepository.findCard(ids);
  if (!card[0]) {
    const message = "Invalid card id";
    throw notFoundError(message);
  }
  return card;
}

function decrypt(userCards: Card[]) {
  const cryptr = new Cryptr(process.env.CRYPTR_SECRET_KEY);
  const cardDecrypt = userCards.map((userCard: Card) => {
    const password = cryptr.decrypt(userCard.password);
    const securityCode = cryptr.decrypt(userCard.securityCode);
    const data = { ...userCard, password, securityCode };
    return data;
  });
  return cardDecrypt;
}

async function deleteUserCard(ids: CredentialIds) {
  await findUserCard(ids);
  await cardRepository.deleteCard(ids);
}

const cardService = {
  saveCard,
  selectCards,
  selectCard,
  deleteUserCard,
};

export default cardService;
