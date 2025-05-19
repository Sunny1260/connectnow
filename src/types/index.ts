export interface Chat {
  id: string;
  name: string;
  avatarUrl: string;
  lastMessage: string;
  timestamp: string;
  unreadCount?: number;
}

export interface Message {
  id: string;
  chatId: string;
  text: string;
  sender: 'me' | 'other';
  senderName: string; // Added senderName for clarity in messages
  avatarUrl?: string; // Optional avatar for message sender
  timestamp: string;
}
