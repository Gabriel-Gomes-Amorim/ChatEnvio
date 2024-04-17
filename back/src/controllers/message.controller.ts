import httpStatus from "http-status";

import { Request, Response } from "express";
import { Message } from "@prisma/client";
import { makeMessageService } from "../services/factories/message/make-message-service";
import { messageRegisterBodySchema } from "../schemas/messageSchema";

export async function createMessage(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const message = messageRegisterBodySchema.parse(req.body);

    const messageService = makeMessageService();

    const createMessage: Message = await messageService.create(message);

    res.status(httpStatus.CREATED).json({
      message: "Mensagem criada com sucesso!",
      createMessage,
    });
  } catch (error) {
    console.error("Erro ao criar mensagem:", error);

    res.status(httpStatus.BAD_REQUEST).json({
      message: "Erro ao criar mensagem.",
      error: error,
    });
  }
}

export async function findAllMessages(
  req: Request,
  res: Response
): Promise<void> {
  try {
    const messageService = makeMessageService();

    const messages: Message[] = await messageService.findAll();

    res.status(httpStatus.OK).json(messages);
  } catch (error) {
    console.error("Erro ao buscar mensagens:", error);

    res.status(httpStatus.BAD_REQUEST).json({
      message: "Erro ao buscar mensagens.",
      error: error,
    });
  }
}
