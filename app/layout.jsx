import { Open_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { UserProvider } from "@/components/providers/UserProvider";
import { DocsProvider } from "@/components/providers/DocsProvider";

const open_sans = Open_Sans({ subsets: ["latin"] });

export const metadata = {
  title: "Page Picker",
  description: "Page Picker for Vidyalai",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <UserProvider>
        <DocsProvider>
          <html lang="en" suppressHydrationWarning>
            <body className={open_sans.className}>{children}</body>
          </html>
        </DocsProvider>
      </UserProvider>
    </ClerkProvider>
  );
}
