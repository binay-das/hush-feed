import { JWT_SECRET } from "@/config";
import { prisma } from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const POST = async (req: NextRequest) => {
    try {
        const authHeader = req.headers.get("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return NextResponse.json({ error: "Unauthorized from middleware" }, { status: 401 });
        }
        const token = authHeader.split(" ")[1];


        const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
        console.log(decoded);
        const userId = decoded.id;

        const { roomId } = await req.json();
        if (!roomId) {
            return NextResponse.json({ error: "Room ID is required" }, { status: 400 });
        }
        const room = await prisma.room.findUnique({
            where: {
                id: roomId
            }
        });
        if (!room) {
            return NextResponse.json({ error: "Room not found" }, { status: 404 });
        }
        await prisma.user.update({
            where: { id: userId },
            data: { rooms: { connect: { id: roomId } } }
        });

        return NextResponse.json({ message: "Joined room successfully" }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}