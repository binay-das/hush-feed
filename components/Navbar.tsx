"use client";

import Link from "next/link";
import { useState } from "react";
import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gray-800 text-white shadow-md w-full fixed top-0 z-50">
      <div className="container mx-auto flex justify-between items-center px-6 py-4">

        <Link href="/" className="text-2xl font-bold">
          HushFeed
        </Link>

        <div className="hidden md:flex gap-6">
          <Link href="/" className="hover:text-gray-300">Home</Link>
          <Link href="/about" className="hover:text-gray-300">About</Link>
          <Link href="/dashboard" className="hover:text-gray-300">Dashboard</Link>
        </div>

        <div className="hidden md:flex gap-4">
          <Button variant="secondary" asChild>
            <Link href="/user/signin">Sign In</Link>
          </Button>
          <Button asChild>
            <Link href="/user/signup">Sign Up</Link>
          </Button>
        </div>

        <button 
          className="md:hidden" 
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isOpen && (
        <div className="md:hidden bg-gray-800 text-white">
          <div className="container mx-auto flex flex-col gap-4 py-4">
            <Link href="/" className="hover:text-gray-300">Home</Link>
            <Link href="/about" className="hover:text-gray-300">About</Link>
            <Link href="/dashboard" className="hover:text-gray-300">Dashboard</Link>
            <Link href="/user/signin" className="hover:text-gray-300">Sign In</Link>
            <Link href="/user/signup" className="hover:text-gray-300">Sign Up</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
