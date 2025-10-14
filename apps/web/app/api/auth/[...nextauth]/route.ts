import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                // Danh sách user tĩnh (static)
                const users = [
                    { id: "1", name: "Admin", email: "admin@example.com", password: "123456" },
                    { id: "2", name: "Nguyễn Văn A", email: "user@example.com", password: "abc123" },
                ];

                const user = users.find(
                    (u) =>
                        u.email === credentials?.email &&
                        u.password === credentials?.password
                );

                if (user) return user;
                return null; // nếu sai thông tin
            },
        }),
    ],

    pages: {
        signIn: "/login", // dùng trang /login của bạn
    },

    session: {
        strategy: "jwt",
    },

    secret: process.env.NEXTAUTH_SECRET || "my-secret-key",
});

export { handler as GET, handler as POST };
