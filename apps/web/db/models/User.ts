import { Schema, model, Document, models, Model } from "mongoose";

export interface IUser extends Document {
    name: string;
    email: string;
    passwordHash: string;
    avatar?: string;
    bio?: string;
    friends: Schema.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

const userSchema = new Schema<IUser>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        passwordHash: { type: String, required: true },
        avatar: String,
        bio: String,
        friends: [{ type: Schema.Types.ObjectId, ref: "users" }]
    },
    { timestamps: true }
);

export default userSchema;
