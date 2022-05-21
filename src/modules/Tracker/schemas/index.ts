import { model } from "mongoose";

import { ITracker } from "./ITracker";
import { trackerSchema } from "./TrackerSchema";

const Tracker = model<ITracker>("Tracker", trackerSchema);

export { Tracker };
