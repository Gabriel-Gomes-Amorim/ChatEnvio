import { Message, Prisma } from "@prisma/client";

export abstract class MessageRepository {
  abstract create(message: Prisma.MessageCreateInput): Promise<Message>;

  abstract findAll(): Promise<Message[]>;
}
