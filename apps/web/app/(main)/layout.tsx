import { Header, Footer } from '@repo/ui/layouts';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <>
        <Header type="full" />
        <div className="pt-16">
          {children}
        </div>
        <Footer />
      </>
  );
}
