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
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function () {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const res = await axios.post("/api/auth/signup", {
        name,
        email,
        password,
      });

      if (res.status === 200) {
        router.replace("/dashboard");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Failed to sign up. Please try again."
      );
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen flex justify-center items-center px-16 pt-24">
      <Card className="md:w-2/3 lg:w-1/3 w-full">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Sign Up</CardTitle>
          <CardDescription>
            Join us and start giving anonymous feedback!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  placeholder="Enter your name"
                  type="text"
                  name="name"
                  required
                />
                <Label className="text-red-500 text-xs italic">
                  Don't worry, your name won't be displayed anywhere
                </Label>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="Enter your email"
                  type="email"
                  name="email"
                  required
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  placeholder="Enter your password"
                  type="password"
                  name="password"
                  required
                />
              </div>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full mt-4" disabled={loading}>
              {loading ? "Signing up..." : "Sign Up"}
            </Button>
          </form>
          <Link href={"/user/signin"} className="text-red-900 italic text-sm">
            Already have an account? Click here to log in{" "}
          </Link>
        </CardContent>
        <CardFooter className="flex flex-col justify-between gap-8">
          <div className="border-t w-full flex flex-col items-center">
            <span className="my-4">or</span>
            <div className="flex justify-between w-full flex-col sm:flex-row gap-4 sm:gap-0">
              <Button variant="secondary">Continue with Google</Button>
              <Button variant="secondary">Continue with GitHub</Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
