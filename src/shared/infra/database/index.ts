import { Schema, connect } from "mongoose";

run()
  .then(() => console.log("Connected to database"))
  .catch(err => console.log(err));

async function run() {
  await connect(process.env.MONGO_URL);
}
