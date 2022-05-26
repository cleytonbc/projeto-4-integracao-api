import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateTrackerService } from "../services/CreateTrackerServices";

class CreateTrackerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;
    const { code } = request.body;
    if (!code) {
      return response
        .status(400)
        .json({ error: true, message: "Código não informado" });
    }

    const createTrackerService = container.resolve(CreateTrackerService);
    const track = await createTrackerService.execute(
      code.toUpperCase(),
      userId,
    );

    return response.status(201).send();
  }
}

export { CreateTrackerController };
