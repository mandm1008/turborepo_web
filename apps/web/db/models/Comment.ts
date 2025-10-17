import { Schema, Document } from "mongoose";

export interface IComment extends Document {
    videoId: Schema.Types.ObjectId;
    userId: Schema.Types.ObjectId;
    parentId?: Schema.Types.ObjectId;
    content: string;
    createdAt: Date;
    updatedAt: Date;
}

const commentSchema = new Schema<IComment>(
    {
        videoId: { type: Schema.Types.ObjectId, ref: "videos", required: true },
        userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
        parentId: { type: Schema.Types.ObjectId, ref: "comments" },
        content: { type: String, required: true }
    },
    { timestamps: true }
);

export default commentSchema;
