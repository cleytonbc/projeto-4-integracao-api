import { Schema, connect } from "mongoose";
import { User } from "../app/Schema";

run()
  .then(() => console.log("Connected to database"))
  .catch(err => console.log(err));

async function run() {
  await connect("mongodb://localhost:27017/test");
}
