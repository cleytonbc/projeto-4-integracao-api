import { Router } from "express";
import { CreateTrackerController } from "../../../modules/Tracker/controllers/CreateTrackerController";
import { EditTrackerController } from "../../../modules/Tracker/controllers/EditTrackerController";
import { ListAllTrackerUserController } from "../../../modules/Tracker/controllers/ListAllTrackerUserController";
import { ListTrackerCodeController } from "../../../modules/Tracker/controllers/ListTrackerCodeController";
import { authenticatedUser } from "../middlewares/authenticatedUser";

const trackerRouter = Router();

const createTrackerController = new CreateTrackerController();
const listAllTrackerUserController = new ListAllTrackerUserController();
const listTrackerCodeController = new ListTrackerCodeController();
const editTrackerController = new EditTrackerController();

trackerRouter.post("/", authenticatedUser, createTrackerController.handle);
trackerRouter.put("/:id", authenticatedUser, editTrackerController.handle);
trackerRouter.get("/", authenticatedUser, listAllTrackerUserController.handle);
trackerRouter.get(
  "/:code",
  authenticatedUser,
  listTrackerCodeController.handle,
);

export { trackerRouter };
