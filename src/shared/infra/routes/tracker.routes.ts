import { Router } from "express";
import { CreateTrackerController } from "../../../modules/Tracker/controllers/CreateTrackerController";
import { ListAllTrackerUserController } from "../../../modules/Tracker/controllers/ListAllTrackerUserController";
import { authenticatedUser } from "../middlewares/authenticatedUser";

const trackerRouter = Router();

const createTrackerController = new CreateTrackerController();
const listAllTrackerUserController = new ListAllTrackerUserController();

trackerRouter.post("/", authenticatedUser, createTrackerController.handle);
trackerRouter.get("/", authenticatedUser, listAllTrackerUserController.handle);

export { trackerRouter };
