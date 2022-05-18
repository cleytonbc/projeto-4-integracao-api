import "dotenv/config";
import express from "express";
import { router } from "./routes";

const app = express();

const port = process.env.PORT || "3000";

import "./database";

app.use(express.json());

app.use(router);

app.listen(port, () => console.log(`API running on localhost:${port}`));
