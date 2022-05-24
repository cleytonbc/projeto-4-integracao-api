import { Request, Response } from "express";
import { container } from "tsyringe";
import { DeleteTrackerServices } from "../services/DeleteTrackerServices";

class DeleteTrackerController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const userId = request.user.id;

    const deletetrackerServices = container.resolve(DeleteTrackerServices);

    await deletetrackerServices.execute(id, userId);

    return response.status(200).send();
  }
}

export { DeleteTrackerController };
