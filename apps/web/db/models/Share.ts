import { Schema, model, Document, models } from "mongoose";

export interface IShare extends Document {
  userId: Schema.Types.ObjectId;
  videoId: Schema.Types.ObjectId;
  sharedTo?: Schema.Types.ObjectId[];
  createdAt: Date;
}

const shareSchema = new Schema<IShare>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
    videoId: { type: Schema.Types.ObjectId, ref: "videos", required: true },
    sharedTo: [{ type: Schema.Types.ObjectId, ref: "users" }]
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

export default shareSchema;
