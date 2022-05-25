import QueueBull, { Job } from "bull";
import { redisConfig } from "../../../config/redis";

import * as jobs from "../process";

const queues = Object.values(jobs).map(job => ({
  bull: new QueueBull(job.key, { redis: redisConfig }),
  name: job.key,
  handle: job.handle,
  options: job.options,
}));

export default {
  queues,
  add(name: string, data: any) {
    const queue = this.queues.find((queue: Job) => queue.name === name);

    return queue.bull.add(data, queue.options);
  },

  async process() {
    await this.queues.forEach(queue => {
      queue.bull.process(queue.handle);

      queue.bull.on("completed", (job: Job, result: any) => {
        console.log(`Job ${queue.name} completed with result ${result}`);
      });

      queue.bull.on("failed", (job: Job, err: Error) => {
        console.log("Job executado", queue.name, job.data);
        console.log(err);
      });
    });
  },
};
