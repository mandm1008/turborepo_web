import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/fakebook";

if (!MONGODB_URI) {
    throw new Error("❌ Missing MONGODB_URI in environment variables");
}

let cached = (global as any).mongoose || { conn: null, promise: null };

export default async function connectDB() {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        cached.promise = mongoose
            .connect(MONGODB_URI, { bufferCommands: false })
            .then((mongoose) => mongoose);
    }

    cached.conn = await cached.promise;
    (global as any).mongoose = cached;
    return cached.conn;
}
