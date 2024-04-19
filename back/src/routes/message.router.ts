import { Router } from "express";
import {
  createMessage,
  findAllMessages,
} from "../controllers/message.controller";

const router = Router();

router.post("/send", createMessage);
router.get("/", findAllMessages);

export default router;
