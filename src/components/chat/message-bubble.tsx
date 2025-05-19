"use client";

import type { Message } from "@/types";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

interface MessageBubbleProps {
  message: Message;
  isCurrentUser: boolean;
}

export function MessageBubble({ message, isCurrentUser }: MessageBubbleProps) {
  return (
    <div
      className={cn(
        "flex items-end space-x-2 max-w-[75%] mb-4",
        isCurrentUser ? "ml-auto flex-row-reverse space-x-reverse" : "mr-auto"
      )}
    >
      {!isCurrentUser && message.avatarUrl && (
        <Avatar className="h-8 w-8 self-start">
          <AvatarImage src={message.avatarUrl} alt={message.senderName} data-ai-hint="avatar user" />
          <AvatarFallback>{message.senderName.substring(0, 1)}</AvatarFallback>
        </Avatar>
      )}
      <Card
        className={cn(
          "rounded-xl shadow-md",
          isCurrentUser
            ? "bg-primary text-primary-foreground"
            : "bg-card text-card-foreground border"
        )}
      >
        <CardContent className="p-3">
          {!isCurrentUser && (
            <p className="text-xs font-medium mb-1 opacity-80">{message.senderName}</p>
          )}
          <p className="text-sm whitespace-pre-wrap break-words">{message.text}</p>
          <p
            className={cn(
              "text-xs mt-1 opacity-70",
              isCurrentUser ? "text-right" : "text-left"
            )}
          >
            {message.timestamp}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
