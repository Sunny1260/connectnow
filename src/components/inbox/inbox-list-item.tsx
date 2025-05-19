"use client";

import Link from "next/link";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Chat } from "@/types";
import { SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

interface InboxListItemProps {
  chat: Chat;
}

export function InboxListItem({ chat }: InboxListItemProps) {
  const pathname = usePathname();
  const isActive = pathname === `/chat/${chat.id}`;

  return (
    <SidebarMenuItem>
      <SidebarMenuButton 
        asChild 
        isActive={isActive}
        className={cn(
          "w-full justify-start h-auto py-3 px-2",
           isActive ? "bg-sidebar-primary text-sidebar-primary-foreground" : ""
        )}
      >
        <Link href={`/chat/${chat.id}`} className="flex items-center space-x-3 w-full">
          <Avatar className="h-10 w-10">
            <AvatarImage src={chat.avatarUrl} alt={chat.name} data-ai-hint="profile avatar" />
            <AvatarFallback>{chat.name.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{chat.name}</p>
            <p className="text-xs text-sidebar-foreground/70 truncate">{chat.lastMessage}</p>
          </div>
          {chat.unreadCount && chat.unreadCount > 0 && (
            <Badge variant="default" className="bg-accent text-accent-foreground ml-auto shrink-0">
              {chat.unreadCount}
            </Badge>
          )}
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
