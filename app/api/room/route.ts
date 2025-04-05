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

        const { title, description } = await req.json();
        if (!title || !description) {
            return NextResponse.json({ message: "Title and description are required to create a room" }, { status: 401 });
        }

        const room = await prisma.room.create({
            data: {
                id: roomId,
                title,
                description,
                creatorId: userId
            }
        });

        return NextResponse.json({ message: "Room created successfully", room, shareableLink }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ message: "Something went wrong", error }, { status: 500 });
    }
}

export const GET = async (req: NextRequest) => {
    try {
        const authHeader = req.headers.get('Authorization');
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const token = authHeader.split(" ")[1];

        const decoded = jwt.verify(token, JWT_SECRET) as { id: string };

        const userId = decoded.id;

        const rooms = await prisma.room.findMany({
            select: {
                id: true,
                title: true,
                description: true,
                createdAt: true,
            },
            where: {
                creatorId: userId
            }
        });

        return NextResponse.json({ rooms }, { status: 200 });
    } catch (error) {
        console.error("Error fetching rooms:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
};



export const DELETE = async (req: NextRequest, { params }: { params: { roomId: string } }) => {
    try {
        const authHeader = req.headers.get("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
        const userId = decoded.id;

        const { roomId } = params;

        const room = await prisma.room.findUnique({ where: { id: roomId } });
        if (!room) {
            return NextResponse.json({ error: "Room not found" }, { status: 404 });
        }

        if (room.creatorId !== userId) {
            return NextResponse.json({ error: "Unauthorized: Only the creator can delete this room" }, { status: 403 });
        }

        await prisma.room.delete({ where: { id: roomId } });

        return NextResponse.json({ message: "Room deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting room:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
};
