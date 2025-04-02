"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { NEXT_PUBLIC_BASE_URL } from "@/config";
import { ArrowLeft, Loader2, Users2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const CreateRoomPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const createRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setError("Title and description are required.");
      return;
    }
    setLoading(true);
    try {
      const authToken = localStorage.getItem("token");
      const res = await axios.post(
        `${NEXT_PUBLIC_BASE_URL}/api/room`,
        {
          title,
          description
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      router.push(`/rooms/create/${res.data.room.id}`);
    } catch (error) {
      console.error("Error creating room", error);
      setError("Failed to create room. Please try again.");
    }
    setLoading(false);
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary/20 px-4">
      <div className="max-w-2xl mx-auto py-16">
        <Button
          variant="ghost"
          className="mb-8 group"
          onClick={() => router.replace("/home")}
        >
          <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </Button>

        <div className="flex items-center gap-4 mb-8">
          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
            <Users2 className="h-6 w-6 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Create New Room</h1>
            <p className="text-muted-foreground mt-1">
              Set up a space for collaboration
            </p>
          </div>
        </div>

        <Card className="shadow-lg border-2">
          <CardHeader>
            <CardTitle>Room Details</CardTitle>
            <CardDescription>
              Give your room a clear name and description
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={createRoom} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title" className="text-base">
                    Room Name
                  </Label>
                  <Input
                    id="title"
                    placeholder="e.g., Team Brainstorm Session"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-base">
                    Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="What's this room for? Add some details to help others understand its purpose."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="min-h-[120px] resize-none"
                  />
                </div>
              </div>

              {error && (
                <div className="bg-destructive/10 text-destructive text-sm p-4 rounded-lg">
                  {error}
                </div>
              )}
            </form>
          </CardContent>

          <Separator />
          
          <CardFooter className="flex justify-between p-6">
            <Button
              variant="outline"
              onClick={() => router.replace("/home")}
              disabled={loading}
              className="min-w-[100px]"
            >
              Cancel
            </Button>
            <Button 
              onClick={createRoom} 
              disabled={loading}
              className="min-w-[100px]"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Room"
              )}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
};

export default CreateRoomPage;