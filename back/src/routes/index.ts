import { Router } from "express";
import messageRouter from "./message.router";

const router = Router();

router.use("/message", messageRouter);

export default router;
