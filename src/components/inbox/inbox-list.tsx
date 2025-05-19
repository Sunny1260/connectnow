"use client";

import { MOCK_CHATS } from "@/lib/mock-data";
import { InboxListItem } from "./inbox-list-item";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SidebarMenu } from "@/components/ui/sidebar";

export function InboxList() {
  const chats = MOCK_CHATS;

  return (
    <ScrollArea className="flex-1">
      <SidebarMenu>
        {chats.length > 0 ? (
          chats.map((chat) => <InboxListItem key={chat.id} chat={chat} />)
        ) : (
          <div className="p-4 text-center text-sidebar-foreground/70">
            No chats yet.
          </div>
        )}
      </SidebarMenu>
    </ScrollArea>
  );
}
