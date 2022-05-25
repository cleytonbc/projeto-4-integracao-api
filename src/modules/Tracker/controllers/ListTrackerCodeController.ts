import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListTrackerCodeServices } from "../services/ListCodeTrackerServices";

class ListTrackerCodeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { code } = request.params;
    const userId = request.user.id;

    const listTrackerCodeServices = container.resolve(ListTrackerCodeServices);

    const tracker = await listTrackerCodeServices.execute(code, userId);

    return response.json(tracker);
  }
}
export { ListTrackerCodeController };
