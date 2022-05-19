import { Request, Response } from "express";
import { UpdateProfileServices } from "../services/UpdateProfileServices";
class UpdateProfileController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.user;
    const { name, email, oldPassword, password } = request.body;

    const updateProfileServices = new UpdateProfileServices();

    const user = await updateProfileServices.execute({
      id,
      name,
      email,
      oldPassword,
      password,
    });

    return response.json(user);
  }
}

export { UpdateProfileController };
