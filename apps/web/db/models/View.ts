import { Schema, model, Document, models } from "mongoose";

export interface IView extends Document {
    videoId: Schema.Types.ObjectId;
    userId?: Schema.Types.ObjectId;
    watchedAt: Date;
    duration?: number;
}

const viewSchema = new Schema<IView>(
    {
        videoId: { type: Schema.Types.ObjectId, ref: "videos", required: true },
        userId: { type: Schema.Types.ObjectId, ref: "users" },
        watchedAt: { type: Date, default: Date.now },
        duration: Number
    },
    { timestamps: false }
);

export default viewSchema;
