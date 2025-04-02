"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { LoaderCircle, Plus, Users } from "lucide-react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const router = useRouter();

  const handleJoinRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomCode.trim()) {
      setError("Please enter a room code");
      return;
    }

    try {
      setLoading(true);
      setError("");

      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push(`/rooms/${roomCode}`);
    } catch (err) {
      setError("Failed to join room. Please check the code and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-secondary/20 pt-24">
      <div className="container mx-auto px-4 pb-16">
        <div className="flex flex-col items-center gap-8 max-w-2xl mx-auto">
          <div className="text-center space-y-4">
            <div className="inline-block p-4 bg-primary/10 rounded-full mb-4">
              <Users className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-4xl font-bold tracking-tight">
              Welcome to HushFeed
            </h1>
            <p className="text-muted-foreground text-lg">
              Join existing rooms or create your own space for collaboration
            </p>
          </div>

          <div className="w-full space-y-6">
            <Card className="w-full shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">
                  Join a Room
                </CardTitle>
                <CardDescription>
                  Enter a room code to join an existing session
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleJoinRoom} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="code">Room Code</Label>
                    <div className="flex gap-3">
                      <Input
                        id="code"
                        placeholder="Enter room code (e.g., xyz-xyz-xyz)"
                        value={roomCode}
                        onChange={(e) => setRoomCode(e.target.value)}
                        className="flex-1"
                        disabled={loading}
                      />
                      <Button type="submit" disabled={loading}>
                        {loading ? (
                          <>
                            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                            Joining...
                          </>
                        ) : (
                          "Join Room"
                        )}
                      </Button>
                    </div>
                  </div>
                  {error && (
                    <p className="text-sm text-destructive mt-2">{error}</p>
                  )}
                </form>
              </CardContent>
            </Card>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">
                  Or
                </span>
              </div>
            </div>

            <Card className="w-full shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">
                  Create a Room
                </CardTitle>
                <CardDescription>
                  Start a new room and invite others to join
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/rooms/create" className="block w-full">
                  <Button
                    variant="outline"
                    className="w-full h-12 text-lg"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />
                        Creating...
                      </>
                    ) : (
                      <>
                        <Plus className="mr-2 h-5 w-5" />
                        Create New Room
                      </>
                    )}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}