import { Request, Response } from "express";
import { container } from "tsyringe";
import { EditTrackerService } from "../services/EditTrackerServices";

class EditTrackerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const userId = request.user.id;
    const { code } = request.body;

    if (!code) {
      return response.status(400).json({ message: "Código não informado" });
    }
    const editTrackerService = container.resolve(EditTrackerService);

    const tracker = await editTrackerService.execute(
      id,
      code.toUpperCase(),
      userId,
    );

    return response.json(tracker);
  }
}

export { EditTrackerController };
