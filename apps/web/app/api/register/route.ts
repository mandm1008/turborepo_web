import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { connectDB } from "@/lib/db";
import { UserModel } from "@/lib/db/models";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Thiếu thông tin bắt buộc" },
        { status: 400 },
      );
    }

    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { message: "Email đã được đăng ký" },
        { status: 400 },
      );
    }

    const passwordHash = await hash(password, 10);

    const newUser = await UserModel.create({
      name,
      email,
      passwordHash,
      avatar: `https://i.pravatar.cc/150?u=${email}`,
    });

    return NextResponse.json(
      { message: "Đăng ký thành công", userId: newUser._id },
      { status: 201 },
    );
  } catch (error: any) {
    console.error("Register error:", error);
    return NextResponse.json(
      { message: "Lỗi server: " + error.message },
      { status: 500 },
    );
  }
}
