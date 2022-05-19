import { Router } from "express";
import { ListProfileController } from "../../../modules/User/controllers/ListProfileController";
import { UpdateProfileController } from "../../../modules/User/controllers/UpdateProfileController";
import { authenticatedUser } from "../middlewares/authenticatedUser";

const profileRouter = Router();

const listProfileController = new ListProfileController();
const updateProfileController = new UpdateProfileController();

profileRouter.get("/", authenticatedUser, listProfileController.handle);
profileRouter.post("/", authenticatedUser, updateProfileController.handle);

export { profileRouter };
