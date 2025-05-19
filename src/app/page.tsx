import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

export default function InboxPage() {
  return (
    <div className="flex flex-1 items-center justify-center p-4 md:p-6 bg-background">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="items-center">
          <MessageSquare className="w-12 h-12 text-primary mb-4" />
          <CardTitle className="text-2xl font-semibold text-center">Welcome to ConnectNow</CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="text-muted-foreground">
            Select a chat from the sidebar to start messaging, or invite a friend to connect!
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
