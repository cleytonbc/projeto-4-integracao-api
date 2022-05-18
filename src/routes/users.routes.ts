import { Request, Response, Router } from "express";
import { CreateUserController } from "../app/controllers/CreateUserController";

const usersRouter = Router();

const createUserController = new CreateUserController();

usersRouter.get("/", (request: Request, response: Response): Response => {
  return response.json({ message: "ok" });
});
usersRouter.post("/", createUserController.handle);

export { usersRouter };
