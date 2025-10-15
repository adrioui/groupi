"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Message {
  id: string;
  userId: string;
  userName: string;
  userAvatar: string;
  content: string;
  timestamp: Date;
}

interface ChatInterfaceProps {
  spaceId: string;
}

export default function ChatInterface({ spaceId }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      userId: "1",
      userName: "Alex Chen",
      userAvatar: "AC",
      content: "Hey everyone! Just finished the new feature designs. Would love to get your feedback.",
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: "2",
      userId: "2",
      userName: "Sarah Kim",
      userAvatar: "SK",
      content: "Looking great! The color palette really matches our brand guidelines.",
      timestamp: new Date(Date.now() - 3000000),
    },
    {
      id: "3",
      userId: "3",
      userName: "Jordan Lee",
      userAvatar: "JL",
      content: "I agree! Can we schedule a call to discuss the user flow?",
      timestamp: new Date(Date.now() - 1800000),
    },
    {
      id: "4",
      userId: "1",
      userName: "Alex Chen",
      userAvatar: "AC",
      content: "Sure! How about tomorrow at 2pm?",
      timestamp: new Date(Date.now() - 900000),
    },
  ]);

  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: Date.now().toString(),
        userId: "current",
        userName: "You",
        userAvatar: "YO",
        content: newMessage,
        timestamp: new Date(),
      };
      setMessages([...messages, message]);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    
    return date.toLocaleDateString();
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {messages.map((message, index) => {
            const showAvatar = index === 0 || messages[index - 1].userId !== message.userId;
            const isCurrentUser = message.userId === "current";

            return (
              <div
                key={message.id}
                className={`flex gap-3 ${showAvatar ? "mt-4" : "mt-1"}`}
              >
                <div className="w-8 h-8 flex-shrink-0">
                  {showAvatar && (
                    <Avatar className="w-8 h-8">
                      <AvatarFallback className="bg-secondary text-xs font-medium">
                        {message.userAvatar}
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  {showAvatar && (
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="font-semibold text-sm">
                        {message.userName}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {formatTime(message.timestamp)}
                      </span>
                    </div>
                  )}
                  <div className={`text-sm ${!showAvatar && "ml-0"}`}>
                    {message.content}
                  </div>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Message Input */}
      <div className="border-t border-border px-4 sm:px-6 lg:px-8 py-4 flex-shrink-0">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1"
            />
            <Button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              size="icon"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}