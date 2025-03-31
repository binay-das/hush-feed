"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function () {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const res = await axios.post("/api/auth/signin", {
        email,
        password,
      });
      console.log(res);
      if (res.status === 200) {
        localStorage.setItem('token', res.data.token);
        router.replace("/home");
      }
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Failed to sign in. Please try again."
      );
    }
    setLoading(false);
  };
  return (
    <div className="min-h-screen flex justify-center items-center px-16">
      <Card className="md:w-2/3 lg:w-1/3 w-full">
        <CardHeader>
          <CardTitle className="text-3xl font-bold">Sign In</CardTitle>
          <CardDescription>We are delighted to see to back!</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  placeholder="Enter your email"
                  type="email"
                  name="email"
                  autoComplete="email"
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
                  autoComplete="current-password"
                  required
                />
              </div>
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full mt-4" disabled={loading}>
              {loading ? "Signing in..." : "Sign In"}
            </Button>
          </form>
          <Link href={"/user/signup"} className="text-red-900 italic text-sm">
            Don't have an account? Click here to create one{" "}
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
