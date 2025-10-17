import { Schema, Document } from "mongoose";

export interface IVideo extends Document {
    userId: Schema.Types.ObjectId;
    videoUrl: string;
    caption?: string;
    tags: string[];
    visibility: "public" | "friends" | "private";
    likesCount: number;
    commentsCount: number;
    sharesCount: number;
    createdAt: Date;
    updatedAt: Date;
}

const videoSchema = new Schema<IVideo>(
    {
        userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
        videoUrl: { type: String, required: true },
        caption: { type: String },
        tags: [{ type: String }],
        visibility: {
            type: String,
            enum: ["public", "friends", "private"],
            default: "public",
        },

        // 🧩 Thêm các trường đếm để không cần aggregate mỗi lần
        likesCount: { type: Number, default: 0 },
        commentsCount: { type: Number, default: 0 },
        sharesCount: { type: Number, default: 0 },
    },
    { timestamps: true }
);

videoSchema.index({ userId: 1, createdAt: -1 });

export default videoSchema;
