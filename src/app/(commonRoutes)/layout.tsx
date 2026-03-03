import { Footer } from "@/components/shared/Footer";
import { Navbar } from "@/components/shared/Navbar";
import { getCurrentUser } from "@/services/utils";

export default async function CommonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const currentUser = await getCurrentUser();

  return (
    <main className="flex min-h-screen flex-col">
      <Navbar currentUser={currentUser} />
      <main className="">{children}</main>
      <Footer />
    </main>
  );
}
