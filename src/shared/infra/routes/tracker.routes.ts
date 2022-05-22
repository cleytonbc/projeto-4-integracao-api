import { Router } from "express";
import { CreateTrackerController } from "../../../modules/Tracker/controllers/CreateTrackerController";
import { authenticatedUser } from "../middlewares/authenticatedUser";

const trackerRouter = Router();

const createTrackerController = new CreateTrackerController();

trackerRouter.post("/", authenticatedUser, createTrackerController.handle);

export { trackerRouter };
