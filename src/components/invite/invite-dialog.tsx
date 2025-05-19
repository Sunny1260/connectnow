"use client";

import { useState, useEffect } from 'react';
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from '@/hooks/use-toast';

interface InviteDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function InviteDialog({ isOpen, onOpenChange }: InviteDialogProps) {
  const [inviteLink, setInviteLink] = useState("");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (isOpen) {
      // Mock link generation
      const uniqueId = Math.random().toString(36).substring(2, 10);
      if (typeof window !== 'undefined') {
        setInviteLink(`${window.location.origin}/join/${uniqueId}`);
      } else {
        setInviteLink(`https://connectnow.example.com/join/${uniqueId}`);
      }
      setCopied(false);
    }
  }, [isOpen]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(inviteLink);
      setCopied(true);
      toast({ title: "Copied!", description: "Invite link copied to clipboard." });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({ variant: "destructive", title: "Failed to copy", description: "Could not copy link to clipboard." });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md bg-card text-card-foreground">
        <DialogHeader>
          <DialogTitle>Share Invite Link</DialogTitle>
          <DialogDescription>
            Share this link with someone to start a new chat.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col space-y-2">
          <Label htmlFor="inviteLink" className="sr-only">
            Invite Link
          </Label>
          <div className="flex items-center space-x-2">
            <Input id="inviteLink" value={inviteLink} readOnly className="flex-1"/>
            <Button type="button" size="icon" variant="outline" onClick={handleCopy} aria-label="Copy invite link">
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>
        <DialogFooter className="sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
