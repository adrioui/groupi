"use client";

import { useState } from "react";
import { UserPlus, MoreVertical, Crown, Shield, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

interface Member {
  id: string;
  name: string;
  avatar: string;
  role: "owner" | "admin" | "member";
  status: "online" | "offline";
  joinedAt: Date;
}

interface MemberManagementProps {
  spaceId: string;
}

export default function MemberManagement({ spaceId }: MemberManagementProps) {
  const [members, setMembers] = useState<Member[]>([
    {
      id: "1",
      name: "Alex Chen",
      avatar: "AC",
      role: "owner",
      status: "online",
      joinedAt: new Date(Date.now() - 30 * 86400000),
    },
    {
      id: "2",
      name: "Sarah Kim",
      avatar: "SK",
      role: "admin",
      status: "online",
      joinedAt: new Date(Date.now() - 25 * 86400000),
    },
    {
      id: "3",
      name: "Jordan Lee",
      avatar: "JL",
      role: "member",
      status: "offline",
      joinedAt: new Date(Date.now() - 20 * 86400000),
    },
    {
      id: "4",
      name: "Morgan Taylor",
      avatar: "MT",
      role: "member",
      status: "online",
      joinedAt: new Date(Date.now() - 15 * 86400000),
    },
    {
      id: "5",
      name: "Casey Rivera",
      avatar: "CR",
      role: "member",
      status: "offline",
      joinedAt: new Date(Date.now() - 10 * 86400000),
    },
  ]);

  const [isInviteOpen, setIsInviteOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");

  const handleInvite = () => {
    if (inviteEmail.trim()) {
      // Handle invite logic
      console.log("Inviting:", inviteEmail);
      setInviteEmail("");
      setIsInviteOpen(false);
    }
  };

  const getRoleIcon = (role: Member["role"]) => {
    switch (role) {
      case "owner":
        return <Crown className="w-3 h-3" />;
      case "admin":
        return <Shield className="w-3 h-3" />;
      default:
        return <UserIcon className="w-3 h-3" />;
    }
  };

  const getRoleBadge = (role: Member["role"]) => {
    const variants = {
      owner: "default",
      admin: "secondary",
      member: "outline",
    } as const;

    return (
      <Badge variant={variants[role]} className="gap-1 text-xs">
        {getRoleIcon(role)}
        {role.charAt(0).toUpperCase() + role.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-border flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold">Members ({members.length})</h3>
          
          <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline" className="gap-2">
                <UserPlus className="w-4 h-4" />
              </Button>
            </DialogTrigger>
            
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Invite Member</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Input
                    type="email"
                    placeholder="email@example.com"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                  />
                </div>
                
                <Button
                  onClick={handleInvite}
                  disabled={!inviteEmail.trim()}
                  className="w-full"
                >
                  Send Invite
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="p-2">
          {members.map((member) => (
            <div
              key={member.id}
              className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary/50 transition-colors group"
            >
              <div className="relative">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="text-sm font-medium">
                    {member.avatar}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-background ${
                    member.status === "online" ? "bg-green-500" : "bg-gray-400"
                  }`}
                />
              </div>

              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm truncate">
                  {member.name}
                </div>
                <div className="text-xs text-muted-foreground">
                  {member.status === "online" ? "Online" : "Offline"}
                </div>
              </div>

              <div className="flex items-center gap-2">
                {getRoleBadge(member.role)}
                
                {member.role !== "owner" && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>Make Admin</DropdownMenuItem>
                      <DropdownMenuItem className="text-destructive">
                        Remove
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}