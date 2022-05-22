import { Request, Response } from "express";
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

    const createTrackerService = new CreateTrackerService();
    const track = await createTrackerService.execute(
      code.toUpperCase(),
      userId,
    );

    return response.json(track);
  }
}

export { CreateTrackerController };