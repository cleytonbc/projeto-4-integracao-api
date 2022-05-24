import { Request, Response } from "express";
import { container } from "tsyringe";
import { AppError } from "../../../shared/errors/AppError";
import { SessionsServices } from "../services/SessionsServices";

class SessionsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password } = request.body;

    if (!email || !password) {
      throw new AppError("email e senha são obrigatórios");
    }

    const sessionsServices = container.resolve(SessionsServices);

    const token = await sessionsServices.execute({ email, password });

    return response.json(token);
  }
}

export { SessionsController };
