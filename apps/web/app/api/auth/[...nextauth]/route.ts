import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/lib/db";
import { UserModel } from "@/lib/db/models";
import bcrypt from "bcrypt";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "you@example.com" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Vui lòng nhập đầy đủ Email và Mật khẩu");
        }

        await connectDB();

        const user = await UserModel.findOne({ email: credentials.email });
        if (!user) {
          throw new Error("Không tìm thấy tài khoản");
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.passwordHash,
        );
        if (!isValid) {
          throw new Error("Sai mật khẩu");
        }

        return {
          id: (user._id as any).toString(),
          name: user.name,
          email: user.email,
          avatar: user.avatar,
        };
      },
    }),
  ],

  pages: {
    signIn: "/login",
  },

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET || "my-secret-key",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
