import { Schema, model, Document, models } from "mongoose";

export interface IMessage extends Document {
    senderId: Schema.Types.ObjectId;
    receiverId: Schema.Types.ObjectId;
    content: string;
    attachments: string[];
    createdAt: Date;
    seenAt?: Date;
}

const messageSchema = new Schema<IMessage>(
    {
        senderId: { type: Schema.Types.ObjectId, ref: "users", required: true },
        receiverId: { type: Schema.Types.ObjectId, ref: "users", required: true },
        content: { type: String, required: true },
        attachments: [String],
        seenAt: Date
    },
    { timestamps: { createdAt: true, updatedAt: false } }
);

export default messageSchema;
