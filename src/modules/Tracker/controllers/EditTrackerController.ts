import { Request, Response } from "express";
import { container } from "tsyringe";
import { EditTrackerService } from "../services/EditTrackerServices";

class EditTrackerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const userId = request.user.id;
    const { code, description } = request.body;

    if (!code || !description) {
      return response
        .status(400)
        .json({ message: "Campos obrigatórios não informado" });
    }
    const editTrackerService = container.resolve(EditTrackerService);

    await editTrackerService.execute(
      id,
      code.toUpperCase(),
      description,
      userId,
    );

    return response.status(200).send();
  }
}

export { EditTrackerController };
