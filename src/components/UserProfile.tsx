"use client";

import { useState } from "react";
import { ArrowLeft, Camera, Smile, Image as ImageIcon, User as UserIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Link } from "@tanstack/react-router";

type AvatarType = "emoji" | "initials" | "image";

const EMOJI_OPTIONS = ["😊", "🚀", "🎨", "💡", "🌟", "🔥", "⚡", "🎯", "💪", "🎭", "🎪", "🌈"];

export default function UserProfile() {
  const [avatarType, setAvatarType] = useState<AvatarType>("emoji");
  const [avatarValue, setAvatarValue] = useState("😊");
  const [showAvatarPicker, setShowAvatarPicker] = useState(false);
  
  const [profile, setProfile] = useState({
    name: "Alex Chen",
    email: "alex@example.com",
    bio: "Product designer and creative thinker",
  });

  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    soundEffects: true,
    emailDigest: true,
  });

  const handleAvatarTypeChange = (type: AvatarType) => {
    setAvatarType(type);
    if (type === "emoji") {
      setAvatarValue("😊");
    } else if (type === "initials") {
      const initials = profile.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();
      setAvatarValue(initials);
    }
    setShowAvatarPicker(false);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarValue(reader.result as string);
        setAvatarType("image");
      };
      reader.readAsDataURL(file);
    }
  };

  const renderAvatar = () => {
    if (avatarType === "image" && avatarValue.startsWith("data:")) {
      return (
        <div className="w-24 h-24 rounded-full overflow-hidden">
          <img
            src={avatarValue}
            alt="Avatar"
            className="h-full w-full object-cover"
          />
        </div>
      );
    }

    return (
      <Avatar className="w-24 h-24">
        <AvatarFallback className={avatarType === "emoji" ? "text-4xl" : "text-2xl"}>
          {avatarValue}
        </AvatarFallback>
      </Avatar>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <Link to="/">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <h1 className="text-xl font-semibold">Profile & Settings</h1>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="profile" className="space-y-8">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-8">
            {/* Avatar Section */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Avatar</h2>
              
              <div className="flex items-center gap-6">
                {renderAvatar()}
                
                <div className="space-y-2">
                  <Button
                    variant="outline"
                    onClick={() => setShowAvatarPicker(true)}
                    className="gap-2"
                  >
                    <Camera className="w-4 h-4" />
                    Change Avatar
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    Choose an emoji, upload a photo, or use initials
                  </p>
                </div>
              </div>
            </div>

            <Separator />

            {/* Personal Information */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Personal Information</h2>
              
              <div className="space-y-4 max-w-md">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Input
                    id="bio"
                    value={profile.bio}
                    onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                    placeholder="Tell us about yourself"
                  />
                </div>

                <Button className="w-full sm:w-auto">Save Changes</Button>
              </div>
            </div>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-8">
            {/* Notifications */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Notifications</h2>
              
              <div className="space-y-4 max-w-md">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="notifications" className="text-base font-normal">
                      Push Notifications
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications about activity
                    </p>
                  </div>
                  <Switch
                    id="notifications"
                    checked={settings.notifications}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, notifications: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="email-digest" className="text-base font-normal">
                      Email Digest
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Get daily email summaries
                    </p>
                  </div>
                  <Switch
                    id="email-digest"
                    checked={settings.emailDigest}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, emailDigest: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="sound-effects" className="text-base font-normal">
                      Sound Effects
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Play sounds for new messages
                    </p>
                  </div>
                  <Switch
                    id="sound-effects"
                    checked={settings.soundEffects}
                    onCheckedChange={(checked) =>
                      setSettings({ ...settings, soundEffects: checked })
                    }
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Appearance */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Appearance</h2>
              
              <div className="space-y-4 max-w-md">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label htmlFor="dark-mode" className="text-base font-normal">
                      Dark Mode
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Switch to dark theme
                    </p>
                  </div>
                  <Switch
                    id="dark-mode"
                    checked={settings.darkMode}
                    onCheckedChange={(checked) => {
                      setSettings({ ...settings, darkMode: checked });
                      document.documentElement.classList.toggle("dark", checked);
                    }}
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Danger Zone */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-destructive">Danger Zone</h2>
              
              <div className="space-y-3 max-w-md">
                <Button variant="outline" className="w-full text-destructive border-destructive hover:bg-destructive hover:text-white">
                  Delete Account
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* Avatar Picker Dialog */}
      <Dialog open={showAvatarPicker} onOpenChange={setShowAvatarPicker}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Choose Avatar</DialogTitle>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Emoji Option */}
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full gap-2 justify-start"
                onClick={() => handleAvatarTypeChange("emoji")}
              >
                <Smile className="w-4 h-4" />
                Choose Emoji
              </Button>

              {avatarType === "emoji" && (
                <div className="grid grid-cols-6 gap-2">
                  {EMOJI_OPTIONS.map((emoji) => (
                    <button
                      key={emoji}
                      onClick={() => {
                        setAvatarValue(emoji);
                        setShowAvatarPicker(false);
                      }}
                      className="w-12 h-12 text-2xl rounded-lg hover:bg-secondary transition-colors flex items-center justify-center"
                    >
                      {emoji}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Upload Image Option */}
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full gap-2 justify-start"
                onClick={() => document.getElementById("avatar-upload")?.click()}
              >
                <ImageIcon className="w-4 h-4" />
                Upload Photo
              </Button>
              <input
                id="avatar-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </div>

            {/* Initials Option */}
            <div className="space-y-3">
              <Button
                variant="outline"
                className="w-full gap-2 justify-start"
                onClick={() => handleAvatarTypeChange("initials")}
              >
                <UserIcon className="w-4 h-4" />
                Use Initials
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}