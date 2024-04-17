import PrismaMessageRepository from "../../../repositories/message/prisma/prisma.repository";
import MessageService from "../../message.service";

export function makeMessageService() {
  const messageRepository = new PrismaMessageRepository();
  const messageService = new MessageService(messageRepository);

  return messageService;
}
