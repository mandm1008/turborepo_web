import { Schema, model, Document, models } from "mongoose";

export interface INotification extends Document {
    userId: Schema.Types.ObjectId;
    senderId: Schema.Types.ObjectId;
    type: "like" | "comment" | "follow" | "share";
    videoId?: Schema.Types.ObjectId;
    isRead: boolean;
    createdAt: Date;
}

const notificationSchema = new Schema<INotification>(
    {
        userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
        senderId: { type: Schema.Types.ObjectId, ref: "users", required: true },
        type: { type: String, enum: ["like", "comment", "follow", "share"], required: true },
        videoId: { type: Schema.Types.ObjectId, ref: "videos" },
        isRead: { type: Boolean, default: false }
    },
    { timestamps: { createdAt: true, updatedAt: false } }
);

export default notificationSchema;
