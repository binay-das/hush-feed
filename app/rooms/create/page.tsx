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
import axios from "axios";
import { NEXT_PUBLIC_BASE_URL } from "@/config";
import { Loader } from "lucide-react";

const CreateRoomPage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const createRooom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) {
      setError("Title and description are required.");
      return;
    }
    console.log(title, description);
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
      console.log("Room created:", res.data);
      router.push(`/rooms/create/${res.data.room.id}`);
    } catch (error) {
        console.error("Error creating room", error);
        setError("Failed to create room. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 pt-24 border">
      <Card className="w-[350px] mx-auto">
        <CardHeader>
          <CardTitle>Create room</CardTitle>
          <CardDescription>Create a new room in one-click.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={createRooom}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="title">Name</Label>
                <Input
                  id="title"
                  placeholder="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  placeholder="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" onClick={() => router.replace("/home")}>
            Cancel
          </Button>
          <Button onClick={createRooom} disabled={loading}>
            {loading? <><Loader className="animate-spin"/> Creating...</>: "Create"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default CreateRoomPage;
