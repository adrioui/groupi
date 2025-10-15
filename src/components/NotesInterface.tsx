"use client";

import { useState } from "react";
import { Plus, GripVertical, Link as LinkIcon, CheckSquare, Type, MoreVertical, Trash2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type BlockType = "text" | "todo" | "link";

interface Block {
  id: string;
  type: BlockType;
  content: string;
  checked?: boolean;
  url?: string;
  createdBy: string;
  createdAt: Date;
}

interface NotesInterfaceProps {
  spaceId: string;
}

export default function NotesInterface({ spaceId }: NotesInterfaceProps) {
  const [blocks, setBlocks] = useState<Block[]>([
    {
      id: "1",
      type: "text",
      content: "Project Goals for Q1",
      createdBy: "AC",
      createdAt: new Date(Date.now() - 86400000),
    },
    {
      id: "2",
      type: "todo",
      content: "Complete user research",
      checked: true,
      createdBy: "SK",
      createdAt: new Date(Date.now() - 72000000),
    },
    {
      id: "3",
      type: "todo",
      content: "Design new onboarding flow",
      checked: false,
      createdBy: "JL",
      createdAt: new Date(Date.now() - 36000000),
    },
    {
      id: "4",
      type: "link",
      content: "Figma Mockups",
      url: "https://figma.com/example",
      createdBy: "AC",
      createdAt: new Date(Date.now() - 18000000),
    },
    {
      id: "5",
      type: "text",
      content: "Next sprint planning meeting scheduled for Friday at 3pm. Please review the backlog before the meeting.",
      createdBy: "SK",
      createdAt: new Date(Date.now() - 7200000),
    },
  ]);

  const [isAddMenuOpen, setIsAddMenuOpen] = useState(false);
  const [isAssignOpen, setIsAssignOpen] = useState(false);
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null);

  const addBlock = (type: BlockType) => {
    const newBlock: Block = {
      id: Date.now().toString(),
      type,
      content: "",
      checked: type === "todo" ? false : undefined,
      createdBy: "YO",
      createdAt: new Date(),
    };
    setBlocks([...blocks, newBlock]);
    setIsAddMenuOpen(false);
  };

  const updateBlock = (id: string, updates: Partial<Block>) => {
    setBlocks(blocks.map(block => 
      block.id === id ? { ...block, ...updates } : block
    ));
  };

  const deleteBlock = (id: string) => {
    setBlocks(blocks.filter(block => block.id !== id));
  };

  const toggleTodo = (id: string) => {
    const block = blocks.find(b => b.id === id);
    if (block) {
      updateBlock(id, { checked: !block.checked });
    }
  };

  const handleAssign = (blockId: string) => {
    setSelectedBlockId(blockId);
    setIsAssignOpen(true);
  };

  const members = [
    { id: "1", name: "Alex Chen", avatar: "AC" },
    { id: "2", name: "Sarah Kim", avatar: "SK" },
    { id: "3", name: "Jordan Lee", avatar: "JL" },
  ];

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl font-semibold mb-2">Shared Notes</h2>
          <p className="text-sm text-muted-foreground">
            Collaborate on documents, tasks, and links
          </p>
        </div>

        {/* Blocks */}
        <div className="space-y-2 mb-6">
          {blocks.map((block) => (
            <div
              key={block.id}
              className="group flex gap-2 items-start p-3 rounded-lg hover:bg-secondary/50 transition-colors"
            >
              <div className="opacity-0 group-hover:opacity-100 transition-opacity cursor-grab pt-1">
                <GripVertical className="w-4 h-4 text-muted-foreground" />
              </div>

              <div className="flex-1 min-w-0">
                {block.type === "text" && (
                  <Textarea
                    value={block.content}
                    onChange={(e) => updateBlock(block.id, { content: e.target.value })}
                    placeholder="Type your note..."
                    className="min-h-[60px] resize-none border-0 p-0 focus-visible:ring-0 bg-transparent"
                  />
                )}

                {block.type === "todo" && (
                  <div className="flex items-start gap-3 py-1">
                    <Checkbox
                      checked={block.checked}
                      onCheckedChange={() => toggleTodo(block.id)}
                      className="mt-1"
                    />
                    <Input
                      value={block.content}
                      onChange={(e) => updateBlock(block.id, { content: e.target.value })}
                      placeholder="Add a to-do..."
                      className={`border-0 p-0 h-auto focus-visible:ring-0 bg-transparent ${
                        block.checked ? "line-through text-muted-foreground" : ""
                      }`}
                    />
                  </div>
                )}

                {block.type === "link" && (
                  <div className="space-y-2">
                    <Input
                      value={block.content}
                      onChange={(e) => updateBlock(block.id, { content: e.target.value })}
                      placeholder="Link title..."
                      className="border-0 p-0 h-auto focus-visible:ring-0 bg-transparent font-medium"
                    />
                    <Input
                      value={block.url || ""}
                      onChange={(e) => updateBlock(block.id, { url: e.target.value })}
                      placeholder="https://..."
                      className="border-0 p-0 h-auto focus-visible:ring-0 bg-transparent text-sm text-muted-foreground"
                    />
                  </div>
                )}

                <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                  <Avatar className="w-4 h-4">
                    <AvatarFallback className="text-[8px]">
                      {block.createdBy}
                    </AvatarFallback>
                  </Avatar>
                  <span>
                    {block.createdAt.toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleAssign(block.id)}>
                      <Send className="w-4 h-4 mr-2" />
                      Assign
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => deleteBlock(block.id)}
                      className="text-destructive"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>

        {/* Add Block Menu */}
        <DropdownMenu open={isAddMenuOpen} onOpenChange={setIsAddMenuOpen}>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-full gap-2">
              <Plus className="w-4 h-4" />
              Add Block
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            <DropdownMenuItem onClick={() => addBlock("text")}>
              <Type className="w-4 h-4 mr-2" />
              Text Block
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => addBlock("todo")}>
              <CheckSquare className="w-4 h-4 mr-2" />
              To-Do Block
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => addBlock("link")}>
              <LinkIcon className="w-4 h-4 mr-2" />
              Link Block
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Assign Dialog */}
        <Dialog open={isAssignOpen} onOpenChange={setIsAssignOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Assign to Member</DialogTitle>
            </DialogHeader>
            <div className="space-y-2 py-4">
              {members.map((member) => (
                <button
                  key={member.id}
                  className="w-full flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors"
                  onClick={() => {
                    // Handle assignment
                    setIsAssignOpen(false);
                  }}
                >
                  <Avatar className="w-8 h-8">
                    <AvatarFallback className="text-xs">
                      {member.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <span className="font-medium">{member.name}</span>
                </button>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}