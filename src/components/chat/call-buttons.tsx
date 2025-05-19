"use client";

import { Phone, Video, MicOff, VideoOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

interface CallButtonsProps {
  onVideoCall: () => void;
  onVoiceCall: () => void;
}

export function CallButtons({ onVideoCall, onVoiceCall }: CallButtonsProps) {
  const { toast } = useToast();

  const handleVideoCallClick = () => {
    toast({ title: "Starting Video Call...", description: "This feature is coming soon!" });
    onVideoCall();
  };

  const handleVoiceCallClick = () => {
    toast({ title: "Starting Voice Call...", description: "This feature is coming soon!" });
    onVoiceCall();
  };

  return (
    <div className="flex space-x-2">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" onClick={handleVideoCallClick} aria-label="Start video call">
            <Video className="h-5 w-5 text-foreground" />
          </Button>
        </TooltipTrigger>
        <TooltipContent className="bg-popover text-popover-foreground">
          <p>Video Call</p>
        </TooltipContent>
      </Tooltip>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="ghost" size="icon" onClick={handleVoiceCallClick} aria-label="Start voice call">
            <Phone className="h-5 w-5 text-foreground" />
          </Button>
        </TooltipTrigger>
        <TooltipContent className="bg-popover text-popover-foreground">
          <p>Voice Call</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
}
