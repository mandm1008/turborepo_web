import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { connectDB } from "@/db";
import { UserModel, VideoModel } from "@/db/models";

interface RawVideo {
  id: string;
  user: {
    name: string;
    avatar: string;
  };
  videoUrl: string;
  caption: string;
  likes: number;
  comments: number;
  shares: number;
}

export async function seed() {
  await connectDB();

  const filePath = path.join(process.cwd(), "data", "videos.json");
  const raw = fs.readFileSync(filePath, "utf-8");
  const videos: RawVideo[] = JSON.parse(raw);

  console.log(`🚀 Importing ${videos.length} videos...`);

  // Hash mật khẩu "123456"
  const passwordHash = await bcrypt.hash("123456", 10);

  for (const v of videos) {
    try {
      const random = Math.floor(Math.random() * 10000);
      const slugName = v.user.name
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/\s+/g, ".");
      const email = `${slugName}${random}@example.com`;

      let user = await UserModel.findOne({ name: v.user.name });
      if (!user) {
        user = await UserModel.create({
          name: v.user.name,
          avatar: v.user.avatar,
          email,
          passwordHash,
        });
      }

      const exists = await VideoModel.findOne({ videoUrl: v.videoUrl });
      if (exists) continue;

      await VideoModel.create({
        userId: user._id,
        videoUrl: v.videoUrl,
        caption: v.caption,
        tags: [],
        likes: v.likes,
        commentsCount: v.comments,
        shares: v.shares,
      });

      console.log(`✅ Added video by ${v.user.name}`);
    } catch (err) {
      console.error(`❌ Error importing ${v.user.name}:`, err);
    }
  }

  console.log("🎉 Seeding done!");
  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
