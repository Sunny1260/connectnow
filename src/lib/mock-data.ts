import type { Chat, Message } from '@/types';

// Changed from const to let to allow mutation for prototype purposes
export let MOCK_CHATS: Chat[] = [
  {
    id: '1',
    name: 'Alice Wonderland',
    avatarUrl: 'https://placehold.co/100x100.png',
    lastMessage: 'Sounds good! Let’s connect tomorrow.',
    timestamp: '10:30 AM',
    unreadCount: 2,
  },
  {
    id: '2',
    name: 'Bob The Builder',
    avatarUrl: 'https://placehold.co/100x100.png',
    lastMessage: 'Can we fix it? Yes, we can!',
    timestamp: 'Yesterday',
  },
  {
    id: '3',
    name: 'Charlie Chaplin',
    avatarUrl: 'https://placehold.co/100x100.png',
    lastMessage: 'A day without laughter is a day wasted.',
    timestamp: 'Mon',
  },
  {
    id: '4',
    name: 'Diana Prince',
    avatarUrl: 'https://placehold.co/100x100.png',
    lastMessage: 'Wondering about the new project update.',
    timestamp: 'Sun',
    unreadCount: 5,
  },
];

// Changed from const to let to allow mutation for prototype purposes
export let MOCK_MESSAGES: { [chatId: string]: Message[] } = {
  '1': [
    { id: 'm1-1', chatId: '1', text: 'Hey Alice, how are you?', sender: 'me', senderName: 'Me', timestamp: '10:00 AM' },
    { id: 'm1-2', chatId: '1', text: 'Hi! I am good, thanks for asking. How about you?', sender: 'other', senderName: 'Alice Wonderland', avatarUrl: 'https://placehold.co/100x100.png', timestamp: '10:01 AM' },
    { id: 'm1-3', chatId: '1', text: 'Doing great! Working on the new ConnectNow features.', sender: 'me', senderName: 'Me', timestamp: '10:02 AM' },
    { id: 'm1-4', chatId: '1', text: 'Oh, that sounds exciting! What are you working on?', sender: 'other', senderName: 'Alice Wonderland', avatarUrl: 'https://placehold.co/100x100.png', timestamp: '10:03 AM' },
    { id: 'm1-5', chatId: '1', text: 'Mainly the video call integration. It is challenging but fun!', sender: 'me', senderName: 'Me', timestamp: '10:05 AM' },
    { id: 'm1-6', chatId: '1', text: 'Sounds good! Let’s connect tomorrow.', sender: 'other', senderName: 'Alice Wonderland', avatarUrl: 'https://placehold.co/100x100.png', timestamp: '10:30 AM' },
  ],
  '2': [
    { id: 'm2-1', chatId: '2', text: 'Hey Bob, got a minute?', sender: 'me', senderName: 'Me', timestamp: 'Yesterday' },
    { id: 'm2-2', chatId: '2', text: 'Sure, what’s up?', sender: 'other', senderName: 'Bob The Builder', avatarUrl: 'https://placehold.co/100x100.png', timestamp: 'Yesterday' },
    { id: 'm2-3', chatId: '2', text: 'Can we fix it? Yes, we can!', sender: 'other', senderName: 'Bob The Builder', avatarUrl: 'https://placehold.co/100x100.png', timestamp: 'Yesterday' },
  ],
  '3': [
    { id: 'm3-1', chatId: '3', text: 'A day without laughter is a day wasted.', sender: 'other', senderName: 'Charlie Chaplin', avatarUrl: 'https://placehold.co/100x100.png', timestamp: 'Mon' },
  ],
  '4': [
     { id: 'm4-1', chatId: '4', text: 'Hello Diana, any updates on the project?', sender: 'me', senderName: 'Me', timestamp: 'Sun' },
     { id: 'm4-2', chatId: '4', text: 'Hi! Just compiling the notes. Will share soon.', sender: 'other', senderName: 'Diana Prince', avatarUrl: 'https://placehold.co/100x100.png', timestamp: 'Sun' },
     { id: 'm4-3', chatId: '4', text: 'Great, looking forward to it.', sender: 'me', senderName: 'Me', timestamp: 'Sun' },
     { id: 'm4-4', chatId: '4', text: 'Wondering about the new project update.', sender: 'other', senderName: 'Diana Prince', avatarUrl: 'https://placehold.co/100x100.png', timestamp: 'Sun' },
  ]
};

export const getCurrentUser = () => ({
  id: 'currentUser',
  name: 'Me',
  avatarUrl: 'https://placehold.co/100x100.png'
});