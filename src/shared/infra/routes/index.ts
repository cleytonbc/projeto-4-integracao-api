import { Router } from "express";
import { profileRouter } from "./profile.routes";
import { sessionsRouter } from "./sessions.routes";
import { usersRouter } from "./users.routes";

const router = Router();

router.use("/users", usersRouter);
router.use("/sessions", sessionsRouter);
router.use("/profile", profileRouter);

export { router };
