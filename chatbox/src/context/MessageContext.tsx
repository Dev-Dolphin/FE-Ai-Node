import React, { createContext, useState, ReactNode } from 'react';
import axios from 'axios';

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

interface MessageContextType {
  messages: Message[];
  sendMessage: (text: string) => void;
}

export const MessageContext = createContext<MessageContextType | undefined>(undefined);

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const MessageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);

  const sendMessage = async (text: string) => {
    const userMessage: Message = { text, sender: 'user' };
    setMessages(prevMessages => [...prevMessages, userMessage]);

    try {
      // This is a placeholder for your actual API call
      // const response = await api.post('/chat', { message: text });
      // const botMessage: Message = { text: response.data.reply, sender: 'bot' };

      // For now, we'll use a timeout to simulate a bot response
      setTimeout(() => {
        const botMessage: Message = { text: `Bot reply to: "${text}"`, sender: 'bot' };
        setMessages(prevMessages => [...prevMessages, botMessage]);
      }, 1000);

    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage: Message = { text: 'Error: Could not get a response.', sender: 'bot' };
      setMessages(prevMessages => [...prevMessages, errorMessage]);
    }
  };

  return (
    <MessageContext.Provider value={{ messages, sendMessage }}>
      {children}
    </MessageContext.Provider>
  );
};
