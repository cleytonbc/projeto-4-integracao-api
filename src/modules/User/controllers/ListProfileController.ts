import { Request, Response } from "express";
import { ListProfileServices } from "../services/ListProfileServices";
class ListProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;

    const listProfileServices = new ListProfileServices();

    const user = await listProfileServices.execute(id);

    return response.json(user);
  }
}

export { ListProfileController };
