import { Schema, model, Document, models } from "mongoose";

export interface IFollow extends Document {
    followerId: Schema.Types.ObjectId;
    followingId: Schema.Types.ObjectId;
    createdAt: Date;
}

const followSchema = new Schema<IFollow>(
    {
        followerId: { type: Schema.Types.ObjectId, ref: "users", required: true },
        followingId: { type: Schema.Types.ObjectId, ref: "users", required: true }
    },
    { timestamps: { createdAt: true, updatedAt: false } }
);

followSchema.index({ followerId: 1, followingId: 1 }, { unique: true });

export default followSchema;
