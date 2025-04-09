import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { JWT_SECRET } from "@/config"
import jwt from 'jsonwebtoken'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function getIdFromAuthHeader(authHeader: string): string {
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Unauthorized");
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    if (!decoded.id) {
      throw new Error("Invalid token payload");
    }
    return decoded.id;
  } catch (err) {
    throw new Error("Invalid or expired token");
  }
}