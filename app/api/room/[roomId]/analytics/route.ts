import { JWT_SECRET } from "@/config";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prismadb";

export const GET = async (req: NextRequest, { params }: {
    params: { roomId: string }
}) => {
    try {
        const authHeader = req.headers.get("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return NextResponse.json({ error: "Unauthorized from middleware" }, { status: 401 });
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
        const userId = decoded.id;
        const { roomId } = params;
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
        if (room.creatorId !== userId) {
            return NextResponse.json({ error: "Only the creator of the room can view analytics" }, { status: 403 });
        }

        const responsesByQuestion = await prisma.response.groupBy({
            by: ['questionId'],
            _count: {
                id: true
            },
            where: {
                roomId
            }
        });

        const questions = await prisma.question.findMany({
            where: { roomId },
            select: {
                id: true,
                text: true,
            },
        });
        const analyticsData = {
            responsesByQuestion,
            questions,
            totalResponses: responsesByQuestion.reduce((acc, data) => acc + data._count.id, 0),
        };
        return NextResponse.json({ analyticsData }, { status: 200 });
    } catch (error) {
        console.error("Error fetching analytics:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });

    }
}