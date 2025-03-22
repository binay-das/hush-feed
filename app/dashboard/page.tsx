"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, LogOut, MessageSquare, Users } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function Dashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await axios.post("/api/auth/logout");
      router.replace("/signin");
    } catch (error) {
      console.error("Logout failed:", error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Top Navbar */}
      <div className="bg-gray-800 shadow-md py-4 px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">HushFeed Dashboard</h1>
        <div className="flex items-center gap-4">
          <Button variant="secondary" size="icon">
            <Bell className="h-6 w-6" />
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={handleLogout}
            disabled={loading}
          >
            {loading ? "Logging out..." : "Logout"}
            <LogOut className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="container mx-auto py-12 px-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Feedback Card */}
        <Card className="bg-gray-800 shadow-lg">
          <CardHeader className="flex items-center gap-2">
            <MessageSquare className="h-8 w-8 text-blue-400" />
            <CardTitle>Recent Feedback</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300">You have 5 new anonymous feedback messages.</p>
            <Button variant="default" className="mt-4 w-full">
              View Feedback
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 shadow-lg">
          <CardHeader className="flex items-center gap-2">
            <Users className="h-8 w-8 text-green-400" />
            <CardTitle>Connections</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300">You have 20 peer connections.</p>
            <Button variant="default" className="mt-4 w-full">
              Manage Connections
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gray-800 shadow-lg">
          <CardHeader className="flex items-center gap-2">
            <Bell className="h-8 w-8 text-yellow-400" />
            <CardTitle>Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-300">See insights on received feedback and engagement.</p>
            <Button variant="default" className="mt-4 w-full">
              View Analytics
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
