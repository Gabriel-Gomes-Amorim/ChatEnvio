import { Message } from "@prisma/client";
import { MessageRepository } from "../repositories/message/message.repository";
import { broadcast } from "..";

interface createMessageDTO {
  fromMe: boolean;
  senderName: string;
  text: string;
}

export default class MessageService {
  constructor(private messageRepository: MessageRepository) {}

  async create(message: createMessageDTO): Promise<Message> {
    const createMessage: Message = await this.messageRepository.create({
      fromMe: message.fromMe,
      senderName: message.senderName,
      text: message.text,
    });

    broadcast(createMessage);

    return {
      ...createMessage,
    };
  }

  async findAll(): Promise<Message[]> {
    return await this.messageRepository.findAll();
  }
}
