"use client";

import { useState, useEffect, useRef } from "react";
import type { Message, Chat } from "@/types";
import { MOCK_MESSAGES, getCurrentUser } from "@/lib/mock-data";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Paperclip } from "lucide-react";
import { MessageBubble } from "./message-bubble";
import { CallButtons } from "./call-buttons";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { SidebarTrigger } from "@/components/ui/sidebar";


interface ChatInterfaceProps {
  chatId: string;
  chatPartner: Chat | undefined;
}

export function ChatInterface({ chatId, chatPartner }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const currentUser = getCurrentUser();

  useEffect(() => {
    setIsLoading(true);
    // Simulate fetching messages
    setTimeout(() => {
      setMessages(MOCK_MESSAGES[chatId] || []);
      setIsLoading(false);
    }, 500);
  }, [chatId]);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (scrollAreaRef.current) {
      const scrollViewport = scrollAreaRef.current.querySelector('div[data-radix-scroll-area-viewport]');
      if(scrollViewport) {
        scrollViewport.scrollTop = scrollViewport.scrollHeight;
      }
    }
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    const message: Message = {
      id: `m-${Date.now()}`,
      chatId,
      text: newMessage,
      sender: 'me',
      senderName: currentUser.name,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };
    setMessages((prevMessages) => [...prevMessages, message]);
    setNewMessage("");

    // Simulate a reply for demo purposes
    if (chatPartner) {
      setTimeout(() => {
        const reply: Message = {
          id: `m-${Date.now() + 1}`,
          chatId,
          text: `Thanks for your message! I'll get back to you.`,
          sender: 'other',
          senderName: chatPartner.name,
          avatarUrl: chatPartner.avatarUrl,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };
        setMessages((prevMessages) => [...prevMessages, reply]);
      }, 1500);
    }
  };

  if (isLoading || !chatPartner) {
    return (
      <div className="flex flex-col h-full p-4">
        <div className="flex items-center p-4 border-b">
          <Skeleton className="h-10 w-10 rounded-full" />
          <div className="ml-3">
            <Skeleton className="h-4 w-32 mb-1" />
            <Skeleton className="h-3 w-20" />
          </div>
          <div className="ml-auto flex space-x-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </div>
        <div className="flex-1 p-4 space-y-4">
          <Skeleton className="h-16 w-3/4 rounded-lg" />
          <Skeleton className="h-12 w-1/2 ml-auto rounded-lg" />
          <Skeleton className="h-20 w-2/3 rounded-lg" />
        </div>
        <div className="p-4 border-t flex items-center space-x-2">
          <Skeleton className="h-10 flex-1 rounded-md" />
          <Skeleton className="h-10 w-10 rounded-md" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Chat Header */}
      <div className="flex items-center p-3 border-b border-border shadow-sm">
        <div className="md:hidden mr-2">
             <SidebarTrigger />
        </div>
        <Avatar className="h-10 w-10">
          <AvatarImage src={chatPartner.avatarUrl} alt={chatPartner.name} data-ai-hint="user avatar"/>
          <AvatarFallback>{chatPartner.name.substring(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div className="ml-3">
          <h2 className="text-base font-semibold text-foreground">{chatPartner.name}</h2>
          <p className="text-xs text-muted-foreground">Online</p> {/* Placeholder status */}
        </div>
        <div className="ml-auto">
          <CallButtons onVideoCall={() => {}} onVoiceCall={() => {}} />
        </div>
      </div>

      {/* Messages Area */}
      <ScrollArea className="flex-1" ref={scrollAreaRef}>
        <div className="p-4 space-y-2">
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} isCurrentUser={msg.sender === 'me'} />
          ))}
        </div>
      </ScrollArea>

      {/* Message Input */}
      <div className="border-t border-border p-3 bg-card shadow-sm">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" type="button" aria-label="Attach file">
            <Paperclip className="h-5 w-5 text-muted-foreground" />
          </Button>
          <Input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type a message..."
            className="flex-1 bg-input text-foreground placeholder:text-muted-foreground"
            aria-label="Message input"
          />
          <Button type="submit" size="icon" className="bg-accent text-accent-foreground hover:bg-accent/90" aria-label="Send message">
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}
