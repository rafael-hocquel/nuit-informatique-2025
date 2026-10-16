import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../../app/globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function ChatBrutiLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex size-full">
      <SidebarProvider>
        <AppSidebar />
        <main>
          <div className="flex justify-center items-center size-full left-1/2 -translate-x-1/2 md:-translate-x-[43%] absolute">
            {children}
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
}
