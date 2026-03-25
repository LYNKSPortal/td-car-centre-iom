import { NextAuthProvider } from "@/components/providers/session-provider";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <NextAuthProvider>
      {children}
    </NextAuthProvider>
  );
}
