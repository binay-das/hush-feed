"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import Link from "next/link";
import { useState } from "react";
import {Plus} from "lucide-react";

export default function () {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  return (
    <div className="min-h-screen flex justify-center items-center px-16 pt-24">
      <div className="w-full flex flex-col items-center gap-8">
      <Card className="md:w-2/3 lg:w-1/3 w-full">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Join using code</CardTitle>
          <CardDescription>Want to join a room? Enter the code</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="w-full items-center gap-4">
              <Label htmlFor="code">Room Code</Label>
              <div className="flex gap-2">
              <Input
                id="code"
                placeholder="xyz-xyz-xyz"
                type="text"
                name="code"
                required
              />
              <Button type="submit" className="" disabled={loading}>
                {loading ? "Joining..." : "Join"}
              </Button>
              </div>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </form>
        </CardContent>
      </Card>
      <Card className="md:w-2/3 lg:w-1/3 w-full">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Create a new room</CardTitle>
          <CardDescription>Create rooms seamlessly</CardDescription>
        </CardHeader>
        <CardContent>
          <Button variant={"outline"} className="w-full"><Plus /> New Room</Button>
        </CardContent>
      </Card>
      </div>
    </div>
  );
}
