"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, X, Vote } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import axios from "axios";
import { NEXT_PUBLIC_BASE_URL } from "@/config";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState<string | null>(null);

  const menuItems = [
    { label: "Features", href: "#features" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Pricing", href: "#pricing" },
  ];

  useEffect(() => {
    const fetchUser = async () => {
      const authToken = localStorage.getItem("token");
      if (!authToken) {
        console.log("Auth token not found!");
        return;
      }
      setToken(authToken);
      const { data } = await axios.get(`${NEXT_PUBLIC_BASE_URL}/api/user`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
  
      if (!data) {
        console.log("User not found!");
        return;
      }
      setUser(data);
      console.log(data);
    };
    fetchUser();
  }, []);

  return (
    <nav className="fixed w-full sm:px-8 bg-background/80 backdrop-blur-md z-50 border-b shadow-stone-300 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Vote className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold">HushFeed</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            {menuItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            ))}
          </div>

          {!user ? (
            <div className="hidden md:flex items-center gap-4">
              <Link href="/user/signin">
                <Button size="sm">Sign In</Button>
              </Link>
              <Link href="/user/signup">
                <Button variant="outline" size="sm">
                  Get Started
                </Button>
              </Link>
            </div>
          ) : (
            <div className="hidden md:flex items-center gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Avatar className="cursor-pointer">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="">
                  <Button variant={'outline'} className="w-full">Profile</Button>
                  <Button variant={'outline'} className="w-full" onClick={() => {localStorage.removeItem("token");setToken(null);setUser(null)}}>LogOut</Button>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {menuItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <div className="flex flex-col gap-2 pt-4 border-t">
                <Link href="/user/signin">
                  <Button size="sm">Sign In</Button>
                </Link>
                <Link href="/user/signup">
                  <Button variant="outline" size="sm">
                    Get Started
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
