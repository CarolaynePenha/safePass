import { prisma } from "../config/database.js";
import { CreateCard } from "../controllers/cardCrontroller.js";
import { CredentialIds } from "../services/credentialService.js";

async function findByTitleAndUserId(title: string, userId: number) {
  return await prisma.card.findUnique({
    where: {
      userId_title: {
        title,
        userId,
      },
    },
  });
}
async function postCard(cardInfos: CreateCard) {
  await prisma.card.create({ data: cardInfos });
}

async function findCards(userId: number) {
  return await prisma.card.findMany({ where: { userId } });
}
async function findCard({ id, userId }: CredentialIds) {
  const card = await prisma.card.findFirst({
    where: { id, userId },
  });
  return [card];
}
async function deleteCard({ id, userId }: CredentialIds) {
  await prisma.card.delete({
    where: { id, userId },
  });
}

const cardRepository = {
  findByTitleAndUserId,
  postCard,
  findCards,
  findCard,
  deleteCard,
};

export default cardRepository;
