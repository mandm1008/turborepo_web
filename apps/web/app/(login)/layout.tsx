export default function LoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="bg-black flex items-center justify-center min-h-screen">
            {children}
        </div>
    );
}
