import { JWT_SECRET, NEXT_PUBLIC_BASE_URL } from "@/config";
import { prisma } from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";


export const POST = async (req: NextRequest) => {
    try {
        const authHeader = req.headers.get('Authorization');
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, JWT_SECRET) as { id: string };

        const userId = decoded.id;
        const roomId = Math.random().toString(36).substring(7);
        const shareableLink = `${NEXT_PUBLIC_BASE_URL}/room/${roomId}`;

        // const { name } = await req.json();

        const room = await prisma.room.create({
            data: {
                id: roomId,
                creatorId: userId
            }
        });

        return NextResponse.json({ message: "Room created successfully", room, shareableLink }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong", error }, { status: 500 });
    }
}