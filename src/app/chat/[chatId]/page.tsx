import { ChatInterface } from '@/components/chat/chat-interface';
import { MOCK_CHATS } from '@/lib/mock-data';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';
import type { Metadata, ResolvingMetadata } from 'next'

type Props = {
  params: { chatId: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const chatId = params.chatId;
  const chatPartner = MOCK_CHATS.find(chat => chat.id === chatId);
  const previousTitle = (await parent).title?.absolute || 'ConnectNow';
 
  return {
    title: chatPartner ? `Chat with ${chatPartner.name} | ${previousTitle}` : `Chat | ${previousTitle}`,
  }
}

export default function ChatPage({ params }: { params: { chatId: string } }) {
  const { chatId } = params;
  const chatPartner = MOCK_CHATS.find(chat => chat.id === chatId);

  if (!chatPartner) {
    return (
      <div className="flex flex-1 items-center justify-center p-6">
        <Alert variant="destructive" className="max-w-md">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Chat Not Found</AlertTitle>
          <AlertDescription>
            The chat you are looking for does not exist or you do not have permission to access it.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return <ChatInterface chatId={chatId} chatPartner={chatPartner} />;
}

// This function is needed for static generation if you have a fixed number of chats
// For a dynamic app, this might be omitted or adapted.
export async function generateStaticParams() {
  return MOCK_CHATS.map(chat => ({
    chatId: chat.id,
  }));
}
