"use client";

import { useState } from "react";
import { ArrowLeft, Users, Settings as SettingsIcon, MessageSquare, FileText, GraduationCap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "@tanstack/react-router";
import ChatInterface from "@/components/ChatInterface";
import NotesInterface from "@/components/NotesInterface";
import LessonsInterface from "@/components/LessonsInterface";
import MemberManagement from "@/components/MemberManagement";

interface SpaceViewProps {
  spaceId: string;
}

export default function SpaceView({ spaceId }: SpaceViewProps) {
  const [showMembers, setShowMembers] = useState(false);
  const [activeTab, setActiveTab] = useState("chat");

  // Mock space data
  const space = {
    id: spaceId,
    name: "Product Team",
    description: "Design, development, and product strategy",
    emoji: "🚀",
    memberCount: 12,
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border flex-shrink-0">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-50 dark:bg-blue-950/20 rounded-lg flex items-center justify-center text-xl">
                  {space.emoji}
                </div>
                <div>
                  <h1 className="text-lg font-semibold">{space.name}</h1>
                  <p className="text-xs text-muted-foreground hidden sm:block">
                    {space.description}
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowMembers(!showMembers)}
                className="gap-2"
              >
                <Users className="w-4 h-4" />
                <span className="hidden sm:inline">{space.memberCount}</span>
              </Button>
              <Button variant="ghost" size="icon">
                <SettingsIcon className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        <div className="flex-1 flex flex-col max-w-6xl mx-auto w-full">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
            <div className="border-b border-border px-4 sm:px-6 lg:px-8 flex-shrink-0">
              <TabsList className="bg-transparent h-12 p-0 gap-6">
                <TabsTrigger
                  value="chat"
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-foreground rounded-none px-0 pb-3 gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat</span>
                </TabsTrigger>
                <TabsTrigger
                  value="notes"
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-foreground rounded-none px-0 pb-3 gap-2"
                >
                  <FileText className="w-4 h-4" />
                  <span>Notes</span>
                </TabsTrigger>
                <TabsTrigger
                  value="lessons"
                  className="data-[state=active]:bg-transparent data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-foreground rounded-none px-0 pb-3 gap-2"
                >
                  <GraduationCap className="w-4 h-4" />
                  <span>Lessons</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-1 overflow-hidden">
              <TabsContent value="chat" className="h-full m-0 p-0">
                <ChatInterface spaceId={spaceId} />
              </TabsContent>
              
              <TabsContent value="notes" className="h-full m-0 p-0">
                <NotesInterface spaceId={spaceId} />
              </TabsContent>
              
              <TabsContent value="lessons" className="h-full m-0 p-0">
                <LessonsInterface spaceId={spaceId} />
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Members Sidebar */}
        {showMembers && (
          <div className="w-80 border-l border-border flex-shrink-0 hidden lg:block">
            <MemberManagement spaceId={spaceId} />
          </div>
        )}
      </div>
    </div>
  );
}