import { Schema, Document } from "mongoose";

export interface ILike extends Document {
  userId: Schema.Types.ObjectId;
  videoId: Schema.Types.ObjectId;
  createdAt: Date;
}

const likeSchema = new Schema<ILike>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
    videoId: { type: Schema.Types.ObjectId, ref: "videos", required: true },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

likeSchema.index({ userId: 1, videoId: 1 }, { unique: true });

export default likeSchema;
