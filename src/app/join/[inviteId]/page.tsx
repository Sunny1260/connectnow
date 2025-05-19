
"use client";

import { useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { MOCK_CHATS, MOCK_MESSAGES } from '@/lib/mock-data';
import type { Chat } from '@/types';
import { useToast } from '@/hooks/use-toast';
import type { Metadata } from 'next';

// It's good practice to ensure params are typed if you use them in generateMetadata or elsewhere server-side
type JoinChatPageProps = {
  params: { inviteId: string };
};

// Optional: Metadata for the page
export async function generateMetadata({ params }: JoinChatPageProps): Promise<Metadata> {
  return {
    title: `Join Chat Invite | ConnectNow`,
    description: `Join ConnectNow using invite link ${params.inviteId}`,
  };
}

export default function JoinChatPage() {
  const router = useRouter();
  const params = useParams();
  const inviteId = params.inviteId as string;

  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleJoinChat = () => {
    if (!name.trim()) {
      toast({
        title: "Name Required",
        description: "Please enter your name to join the chat.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate API call / processing delay
    setTimeout(() => {
      const newChatId = `chat-${Date.now()}`; 
      
      const newChatPartner: Chat = {
        id: newChatId,
        name: name.trim(),
        avatarUrl: `https://placehold.co/100x100.png`,
        lastMessage: 'Say hello!',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        unreadCount: 0,
      };

      // This mutation is for prototype purposes and only affects the current client session.
      // In a real app, this would involve backend calls and proper state management.
      MOCK_CHATS.push(newChatPartner);
      MOCK_MESSAGES[newChatId] = [];

      toast({
        title: "Chat Created!",
        description: `You've joined as ${newChatPartner.name}. You can now select this chat from the sidebar.`,
      });

      // Redirect to the new chat page
      router.push(`/chat/${newChatId}`);
      // No need to setIsSubmitting(false) due to navigation
    }, 1000);
  };

  return (
    <div className="flex flex-1 items-center justify-center p-4 md:p-6 bg-background">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center">Join ConnectNow</CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            Welcome! Please enter your name to create your chat profile.
            {inviteId && <span className="block text-xs mt-1">(Invite Code: {inviteId})</span>}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Your Display Name</Label>
            <Input
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isSubmitting}
              aria-required="true"
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleJoinChat} className="w-full bg-accent text-accent-foreground hover:bg-accent/90" disabled={isSubmitting}>
            {isSubmitting ? 'Joining...' : 'Join and Start Chatting'}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
