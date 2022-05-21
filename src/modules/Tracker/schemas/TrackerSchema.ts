import { Schema } from "mongoose";
import { v4 as uuidV4 } from "uuid";
import { ITracker } from "./ITracker";

const trackerSchema = new Schema<ITracker>({
  _id: { type: String, default: uuidV4 },
  code: { type: String, required: true },
  service: { type: String, required: true },
  amount: { type: Number, required: true },
  userId: { type: String, required: true },
  isDelivery: { type: Boolean, required: true },
  lastUpdate: { type: Date, required: true },
  events: [
    {
      date: {
        type: String,
        required: false,
      },
      hour: {
        type: String,
        required: false,
      },
      locality: {
        type: String,
        required: false,
      },
      status: {
        type: String,
        required: false,
      },
      subStatus: [
        {
          type: String,
          required: false,
        },
      ],
    },
  ],
});

export { trackerSchema };
