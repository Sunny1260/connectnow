"use client";

import { useState } from "react";
import { UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InviteDialog } from "./invite-dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface InviteButtonProps {
  isIconOnly?: boolean;
}

export function InviteButton({ isIconOnly = false }: InviteButtonProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button 
            variant={isIconOnly ? "ghost" : "default"} 
            size={isIconOnly ? "icon" : "default"} 
            onClick={() => setIsDialogOpen(true)}
            className={isIconOnly ? "" : "bg-accent text-accent-foreground hover:bg-accent/90"}
          >
            <UserPlus className={isIconOnly ? "h-5 w-5" : "mr-2 h-4 w-4"} />
            {!isIconOnly && "Invite Friend"}
          </Button>
        </TooltipTrigger>
        {isIconOnly && (
          <TooltipContent side="bottom" className="bg-popover text-popover-foreground">
            <p>Invite Friend</p>
          </TooltipContent>
        )}
      </Tooltip>
      <InviteDialog isOpen={isDialogOpen} onOpenChange={setIsDialogOpen} />
    </>
  );
}
