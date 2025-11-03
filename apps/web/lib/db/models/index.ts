import { Schema, models, Model, model } from "mongoose";
import commentSchema from "./Comment";
import followSchema from "./Follow";
import likeSchema from "./Like";
import messageSchema from "./Message";
import notificationSchema from "./Notification";
import shareSchema from "./Share";
import userSchema from "./User";
import videoSchema from "./Video";
import viewSchema from "./View";

function getModel<T>(name: string, schema: Schema<T>) {
  return (models[name] as Model<T>) || model<T>(name, schema);
}

export const CommentModel = getModel("comments", commentSchema);
export const FollowModel = getModel("follows", followSchema);
export const LikeModel = getModel("likes", likeSchema);
export const MessageModel = getModel("messages", messageSchema);
export const NotificationModel = getModel("notifications", notificationSchema);
export const ShareModel = getModel("shares", shareSchema);
export const UserModel = getModel("users", userSchema);
export const VideoModel = getModel("videos", videoSchema);
export const ViewModel = getModel("views", viewSchema);
