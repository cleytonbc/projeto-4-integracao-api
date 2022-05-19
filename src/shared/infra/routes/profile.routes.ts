import { Router } from "express";
import { ListProfileController } from "../../../modules/User/controllers/ListProfileController";
import { authenticatedUser } from "../middlewares/authenticatedUser";

const profileRouter = Router();

const listProfileController = new ListProfileController();

profileRouter.get("/", authenticatedUser, listProfileController.handle);

export { profileRouter };
