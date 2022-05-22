import { Request, Response } from "express";
import { ListTrackerCodeServices } from "../services/ListTrackerCodeServices copy";

class ListTrackerCodeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { code } = request.params;
    const userId = request.user.id;

    const listTrackerCodeServices = new ListTrackerCodeServices();

    const tracker = await listTrackerCodeServices.execute(code, userId);

    return response.json(tracker);
  }
}
export { ListTrackerCodeController };
