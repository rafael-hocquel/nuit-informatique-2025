"use client";
import { MessageSquareText, Settings, Sun } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { useRouter } from "next/navigation";

// Menu items.
const items = [
  {
    title: "Chat #1",
    url: "#",
    icon: MessageSquareText,
  },
  {
    title: "Uniquement",
    url: "#",
    icon: MessageSquareText,
  },
  {
    title: "De la",
    url: "#",
    icon: MessageSquareText,
  },
  {
    title: "Décoration",
    url: "#",
    icon: MessageSquareText,
  },
  {
    title: "Flemme de",
    url: "#",
    icon: MessageSquareText,
  },
  {
    title: "Tout stocker",
    url: "#",
    icon: MessageSquareText,
  },
];

const settings = [
  {
    title: "Retour au site",
    url: "#",
    icon: Settings,
  },
];

export function AppSidebar() {
  const router = useRouter();
  return (
    <Sidebar>
      {/* Logo */}
      <div className="flex justify-start items-center">
        <div className="relative overflow-hidden flex justify-center items-center size-20 translate-y-1.5">
          <Image
            src="/chatbruti-logo-transparent.png"
            objectFit="cover"
            fill
            alt="ChatBruti Logo"
          />
        </div>

        <h1 className="font-bold text-xl">ChatBruti</h1>
      </div>
      <SidebarContent className="-translate-y-5 ml-2 flex justify-between">
        <SidebarGroup>
          <SidebarGroupLabel className="font-normal text-md -translate-x-3">
            Chats
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Settings */}
        <SidebarGroup>
          <SidebarGroupLabel className="font-normal text-md -translate-x-3">
            Paramètres
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {settings.map((item) => (
                <SidebarMenuItem
                  key={item.title}
                  onClick={() => router.push("/")}
                >
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
