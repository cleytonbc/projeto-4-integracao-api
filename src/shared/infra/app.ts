import "dotenv/config";
import express from "express";

import { router } from "./routes";

const app = express();

import "../database";

app.use(express.json());

app.use(router);

export { app };
