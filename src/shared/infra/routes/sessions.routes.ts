import { Router } from "express";
import { SessionsController } from "../../../modules/User/controllers/SessionsController";

const sessionsRouter = Router();

const sessionsUserController = new SessionsController();

sessionsRouter.post("/", sessionsUserController.handle);

export { sessionsRouter };
