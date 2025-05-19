"use client";
import type { ReactNode } from 'react';
import Link from 'next/link';
import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarInset,
  SidebarTrigger,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { Home, MessageSquare, Settings, LogOut, Users } from 'lucide-react';
import { Logo } from '@/components/icons/logo';
import { InboxList } from '@/components/inbox/inbox-list';
import { InviteButton } from '@/components/invite/invite-button';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Separator } from '@/components/ui/separator';

export default function AppLayoutComponent({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isChatPage = pathname.startsWith('/chat/');
  
  return (
    <SidebarProvider defaultOpen={true}>
      <Sidebar collapsible="icon" variant="sidebar" className="border-r border-sidebar-border">
        <SidebarHeader className="p-4 items-center">
          <Link href="/" className="flex items-center gap-2 group-data-[collapsible=icon]:justify-center">
            <Logo className="h-8 w-8 text-sidebar-primary group-data-[collapsible=icon]:h-7 group-data-[collapsible=icon]:w-7" />
            <span className="font-semibold text-lg text-sidebar-foreground group-data-[collapsible=icon]:hidden">ConnectNow</span>
          </Link>
        </SidebarHeader>

        <SidebarContent className="p-0">
          <div className="px-3 py-2 group-data-[collapsible=icon]:px-2">
             <InviteButton isIconOnly={true} />
          </div>
          <Separator className="my-2 bg-sidebar-border group-data-[collapsible=icon]:mx-1" />
          <InboxList />
        </SidebarContent>

        <SidebarFooter className="p-2 mt-auto">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Settings" className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                <Settings />
                <span className="group-data-[collapsible=icon]:hidden">Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="Logout" className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground">
                <LogOut />
                <span className="group-data-[collapsible=icon]:hidden">Logout</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>

      <SidebarInset className="flex flex-col">
        <header className={cn(
          "sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-6 shadow-sm",
          isChatPage ? "md:hidden" : "" // Hide header on desktop for chat page, as chat header is part of chat interface
        )}>
          <div className="md:hidden"> {/* Mobile sidebar trigger */}
            <SidebarTrigger />
          </div>
          <h1 className="text-lg font-semibold text-foreground">
            {isChatPage ? "Chat" : "Inbox"}
          </h1>
          <div className="ml-auto">
            {/* Placeholder for potential header actions */}
          </div>
        </header>
        <main className="flex-1 flex flex-col overflow-auto">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
