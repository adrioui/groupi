"use client";

import { useState } from "react";
import { Plus, Users, Hash, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "@tanstack/react-router";

interface Space {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  emoji: string;
  color: string;
}

export default function HomePage() {
  const [spaces, setSpaces] = useState<Space[]>([
    {
      id: "1",
      name: "Product Team",
      description: "Design, development, and product strategy",
      memberCount: 12,
      emoji: "🚀",
      color: "bg-blue-50 dark:bg-blue-950/20",
    },
    {
      id: "2",
      name: "Book Club",
      description: "Monthly readings and discussions",
      memberCount: 8,
      emoji: "📚",
      color: "bg-purple-50 dark:bg-purple-950/20",
    },
    {
      id: "3",
      name: "Fitness Challenge",
      description: "Weekly workouts and nutrition tips",
      memberCount: 15,
      emoji: "💪",
      color: "bg-green-50 dark:bg-green-950/20",
    },
  ]);

  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newSpace, setNewSpace] = useState({
    name: "",
    description: "",
    emoji: "🌟",
  });

  const handleCreateSpace = () => {
    if (newSpace.name.trim()) {
      const colors = [
        "bg-blue-50 dark:bg-blue-950/20",
        "bg-purple-50 dark:bg-purple-950/20",
        "bg-green-50 dark:bg-green-950/20",
        "bg-orange-50 dark:bg-orange-950/20",
        "bg-pink-50 dark:bg-pink-950/20",
      ];
      
      const space: Space = {
        id: Date.now().toString(),
        name: newSpace.name,
        description: newSpace.description,
        memberCount: 1,
        emoji: newSpace.emoji,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
      
      setSpaces([...spaces, space]);
      setNewSpace({ name: "", description: "", emoji: "🌟" });
      setIsCreateOpen(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-foreground rounded-lg flex items-center justify-center">
                <Hash className="w-5 h-5 text-background" />
              </div>
              <h1 className="text-xl font-semibold tracking-tight">Spaces</h1>
            </div>
            
            <Link to="/profile">
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Create New Space Button */}
        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <button className="w-full mb-6 p-8 border-2 border-dashed border-border hover:border-foreground/20 rounded-lg transition-colors group">
              <div className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-secondary group-hover:bg-foreground/5 flex items-center justify-center transition-colors">
                  <Plus className="w-6 h-6 text-muted-foreground" />
                </div>
                <div className="text-center">
                  <h3 className="font-medium text-foreground">Create a new space</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Start collaborating with your team
                  </p>
                </div>
              </div>
            </button>
          </DialogTrigger>
          
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Create New Space</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="emoji">Emoji</Label>
                <Input
                  id="emoji"
                  value={newSpace.emoji}
                  onChange={(e) => setNewSpace({ ...newSpace, emoji: e.target.value })}
                  placeholder="🌟"
                  maxLength={2}
                  className="text-2xl text-center"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="name">Space Name</Label>
                <Input
                  id="name"
                  value={newSpace.name}
                  onChange={(e) => setNewSpace({ ...newSpace, name: e.target.value })}
                  placeholder="e.g., Product Team"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={newSpace.description}
                  onChange={(e) => setNewSpace({ ...newSpace, description: e.target.value })}
                  placeholder="What's this space about?"
                />
              </div>
            </div>
            
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setIsCreateOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1"
                onClick={handleCreateSpace}
                disabled={!newSpace.name.trim()}
              >
                Create Space
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        {/* Spaces Grid */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {spaces.map((space) => (
            <Link
              key={space.id}
              to="/space/$id"
              params={{ id: space.id }}
              className="group"
            >
              <div className="border border-border rounded-lg p-6 hover:border-foreground/20 transition-all hover:shadow-sm">
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 rounded-lg ${space.color} flex items-center justify-center text-2xl`}>
                    {space.emoji}
                  </div>
                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>{space.memberCount}</span>
                  </div>
                </div>
                
                <h3 className="font-semibold text-lg mb-1 group-hover:text-foreground/80 transition-colors">
                  {space.name}
                </h3>
                <p className="text-sm text-muted-foreground line-clamp-2">
                  {space.description}
                </p>
              </div>
            </Link>
          ))}
        </div>

        {spaces.length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 rounded-full bg-secondary mx-auto mb-4 flex items-center justify-center">
              <Hash className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">No spaces yet</h3>
            <p className="text-muted-foreground mb-6">
              Create your first space to start collaborating
            </p>
          </div>
        )}
      </main>
    </div>
  );
}