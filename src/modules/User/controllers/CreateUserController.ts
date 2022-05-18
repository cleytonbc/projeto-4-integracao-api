import { Request, Response } from "express";
import { CreateUserServices } from "../services/CreateUserServices";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;
    const createUserServices = new CreateUserServices();

    const user = await createUserServices.execute({ name, email, password });

    return response.status(200).json(user);
  }
}

export { CreateUserController };
