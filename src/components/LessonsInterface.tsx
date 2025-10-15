"use client";

import { useState } from "react";
import { Play, Lock, CheckCircle2, Clock, ChevronDown, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
  completed: boolean;
  locked: boolean;
}

interface Topic {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
  progress: number;
}

interface LessonsInterfaceProps {
  spaceId: string;
}

export default function LessonsInterface({ spaceId }: LessonsInterfaceProps) {
  const [topics, setTopics] = useState<Topic[]>([
    {
      id: "1",
      title: "Getting Started",
      description: "Learn the basics and set up your workspace",
      progress: 66,
      lessons: [
        {
          id: "1-1",
          title: "Introduction to the Platform",
          duration: "5:30",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          completed: true,
          locked: false,
        },
        {
          id: "1-2",
          title: "Setting Up Your Profile",
          duration: "3:45",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          completed: true,
          locked: false,
        },
        {
          id: "1-3",
          title: "Creating Your First Space",
          duration: "7:20",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          completed: false,
          locked: false,
        },
      ],
    },
    {
      id: "2",
      title: "Collaboration Features",
      description: "Master chat, notes, and real-time collaboration",
      progress: 0,
      lessons: [
        {
          id: "2-1",
          title: "Using the Chat Interface",
          duration: "6:15",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          completed: false,
          locked: false,
        },
        {
          id: "2-2",
          title: "Working with Block Notes",
          duration: "8:30",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          completed: false,
          locked: true,
        },
        {
          id: "2-3",
          title: "Managing Team Members",
          duration: "5:50",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          completed: false,
          locked: true,
        },
      ],
    },
    {
      id: "3",
      title: "Advanced Topics",
      description: "Learn advanced features and best practices",
      progress: 0,
      lessons: [
        {
          id: "3-1",
          title: "Space Customization",
          duration: "4:40",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          completed: false,
          locked: true,
        },
        {
          id: "3-2",
          title: "Notifications and Assignments",
          duration: "6:00",
          videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ",
          completed: false,
          locked: true,
        },
      ],
    },
  ]);

  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [expandedTopics, setExpandedTopics] = useState<string[]>(["1"]);

  const toggleTopic = (topicId: string) => {
    setExpandedTopics(prev =>
      prev.includes(topicId)
        ? prev.filter(id => id !== topicId)
        : [...prev, topicId]
    );
  };

  const handleLessonClick = (lesson: Lesson) => {
    if (!lesson.locked) {
      setSelectedLesson(lesson);
    }
  };

  const markAsComplete = () => {
    if (selectedLesson) {
      setTopics(topics.map(topic => ({
        ...topic,
        lessons: topic.lessons.map(lesson =>
          lesson.id === selectedLesson.id
            ? { ...lesson, completed: true }
            : lesson
        ),
      })));
      
      // Update progress
      const topicWithLesson = topics.find(t =>
        t.lessons.some(l => l.id === selectedLesson.id)
      );
      if (topicWithLesson) {
        const completedCount = topicWithLesson.lessons.filter(l =>
          l.id === selectedLesson.id ? true : l.completed
        ).length;
        const progress = (completedCount / topicWithLesson.lessons.length) * 100;
        setTopics(topics.map(t =>
          t.id === topicWithLesson.id ? { ...t, progress } : t
        ));
      }
    }
  };

  return (
    <div className="h-full flex flex-col lg:flex-row overflow-hidden">
      {/* Course Outline */}
      <div className="w-full lg:w-96 border-r border-border overflow-y-auto flex-shrink-0">
        <div className="p-4 sm:p-6">
          <h2 className="text-lg font-semibold mb-4">Course Content</h2>
          
          <div className="space-y-2">
            {topics.map((topic) => (
              <div key={topic.id} className="border border-border rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleTopic(topic.id)}
                  className="w-full p-4 flex items-start gap-3 hover:bg-secondary/50 transition-colors"
                >
                  <div className="pt-0.5">
                    {expandedTopics.includes(topic.id) ? (
                      <ChevronDown className="w-4 h-4" />
                    ) : (
                      <ChevronRight className="w-4 h-4" />
                    )}
                  </div>
                  
                  <div className="flex-1 text-left">
                    <h3 className="font-medium mb-1">{topic.title}</h3>
                    <p className="text-xs text-muted-foreground mb-2">
                      {topic.description}
                    </p>
                    <div className="flex items-center gap-2">
                      <Progress value={topic.progress} className="h-1 flex-1" />
                      <span className="text-xs text-muted-foreground">
                        {Math.round(topic.progress)}%
                      </span>
                    </div>
                  </div>
                </button>

                {expandedTopics.includes(topic.id) && (
                  <div className="border-t border-border">
                    {topic.lessons.map((lesson) => (
                      <button
                        key={lesson.id}
                        onClick={() => handleLessonClick(lesson)}
                        disabled={lesson.locked}
                        className={`w-full p-4 pl-11 flex items-center gap-3 hover:bg-secondary/50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                          selectedLesson?.id === lesson.id ? "bg-secondary" : ""
                        }`}
                      >
                        <div className="w-5 h-5 flex-shrink-0">
                          {lesson.completed ? (
                            <CheckCircle2 className="w-5 h-5 text-green-600" />
                          ) : lesson.locked ? (
                            <Lock className="w-5 h-5 text-muted-foreground" />
                          ) : (
                            <Play className="w-5 h-5" />
                          )}
                        </div>
                        
                        <div className="flex-1 text-left">
                          <div className="text-sm font-medium mb-1">
                            {lesson.title}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            <span>{lesson.duration}</span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Video Player */}
      <div className="flex-1 overflow-y-auto">
        {selectedLesson ? (
          <div className="p-4 sm:p-6">
            <div className="max-w-4xl mx-auto">
              <div className="aspect-video bg-black rounded-lg overflow-hidden mb-6">
                <iframe
                  src={selectedLesson.videoUrl}
                  className="w-full h-full"
                  allowFullScreen
                  title={selectedLesson.title}
                />
              </div>

              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-semibold mb-2">
                    {selectedLesson.title}
                  </h1>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{selectedLesson.duration}</span>
                    </div>
                    {selectedLesson.completed && (
                      <Badge variant="secondary" className="gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        Completed
                      </Badge>
                    )}
                  </div>
                </div>

                {!selectedLesson.completed && (
                  <Button onClick={markAsComplete}>
                    Mark as Complete
                  </Button>
                )}
              </div>

              <div className="prose prose-sm max-w-none">
                <p className="text-muted-foreground">
                  Watch this lesson to learn more about {selectedLesson.title.toLowerCase()}.
                  Take notes and practice along the way for the best learning experience.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center p-8">
            <div className="text-center max-w-md">
              <div className="w-16 h-16 rounded-full bg-secondary mx-auto mb-4 flex items-center justify-center">
                <Play className="w-8 h-8 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-semibold mb-2">
                Select a lesson to start learning
              </h3>
              <p className="text-sm text-muted-foreground">
                Choose from the course content on the left to begin your learning journey
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}