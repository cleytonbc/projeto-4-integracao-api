import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateTrackerService } from "../services/CreateTrackerServices";

class CreateTrackerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;
    const { code, description } = request.body;
    if (!code || !description) {
      return response
        .status(400)
        .json({ error: true, message: "Código ou descrição não informado" });
    }

    const createTrackerService = container.resolve(CreateTrackerService);
    const track = await createTrackerService.execute(
      code.toUpperCase(),
      description,
      userId,
    );

    return response.status(201).send();
  }
}

export { CreateTrackerController };
