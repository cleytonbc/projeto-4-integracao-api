import { Router } from "express";
import { profileRouter } from "./profile.routes";
import { sessionsRouter } from "./sessions.routes";
import { trackerRouter } from "./tracker.routes";
import { usersRouter } from "./users.routes";

const router = Router();

router.use("/users", usersRouter);
router.use("/sessions", sessionsRouter);
router.use("/profile", profileRouter);
router.use("/trackers", trackerRouter);

export { router };
