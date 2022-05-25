import "dotenv/config";
import "reflect-metadata";

import "../infra/database";

import "../container";

import Queue from "./queue";
import { initial } from "./initial/addUpdateTracker";

Queue.process();

initial();
