import { Request, Response, Router } from "express";

const usersRouter = Router();

usersRouter.get("/", (request: Request, response: Response): Response => {
  return response.json({ message: "ok" });
});

export { usersRouter };
