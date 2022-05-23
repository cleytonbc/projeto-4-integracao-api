import { Request, Response } from "express";
import { DeleteTrackerServices } from "../services/DeleteTrackerServices";

class DeleteTrackerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const userId = request.user.id;

    const deletetrackerServices = new DeleteTrackerServices();

    await deletetrackerServices.execute(id, userId);

    return response.status(200).send();
  }
}

export { DeleteTrackerController };
