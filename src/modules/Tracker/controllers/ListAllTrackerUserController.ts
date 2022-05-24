import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListAllTrackerUserServices } from "../services/ListAllTrackerUserServices";

class ListAllTrackerUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const userId = request.user.id;

    const listAllTrackerUserServices = container.resolve(
      ListAllTrackerUserServices,
    );

    const trackers = await listAllTrackerUserServices.execute(userId);

    return response.json(trackers);
  }
}
export { ListAllTrackerUserController };
