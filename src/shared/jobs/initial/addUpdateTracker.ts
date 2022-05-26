import Queue from "../queue";

export async function initial() {
  await Queue.add("UpdateTrackers", {});
}
