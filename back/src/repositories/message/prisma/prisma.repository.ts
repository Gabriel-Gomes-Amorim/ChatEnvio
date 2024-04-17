import { Message, Prisma, PrismaClient } from "@prisma/client";
import { MessageRepository } from "../message.repository";

export default class PrismaMessageRepository implements MessageRepository {
  private prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async create(message: Prisma.MessageCreateInput): Promise<Message> {
    return await this.prisma.message.create({
      data: message,
    });
  }

  async findAll(): Promise<Message[]> {
    return await this.prisma.message.findMany();
  }
}
