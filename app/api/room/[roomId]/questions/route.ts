import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@/config";
import { prisma } from "@/lib/prismadb";

export const POST = async (req: NextRequest, { params }: { params: { roomId: string } }) => {
    try {
        const authHeader = req.headers.get("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return NextResponse.json({ error: "Unauthorized from middleware" }, { status: 401 });
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
        const userId = decoded.id;

        const roomId = params.roomId;
        if (!roomId) {
            return NextResponse.json({ error: "Room not found" }, { status: 404 });
        }
        const room = await prisma.room.findUnique({
            where: {
                id: roomId
            }
        });

        if (!room) {
            return NextResponse.json({ error: "Room not found" }, { status: 404 });
        }

        if (userId !== room.creatorId) {
            return NextResponse.json({ error: "Only the creator of the room can add questions" }, { status: 403 });
        }

        const { questions } = await req.json();
        if (!questions || !Array.isArray(questions) || questions.length === 0) {
            return NextResponse.json({ message: "No questions added" }, { status: 200 });
        }

        const questionsAdded = await prisma.question.createMany({
            data: questions.map(q => ({
                roomId,
                text: q.text,
                type: q.type,
                options: q.options 
            }))
        });

        console.log(questionsAdded);

        return NextResponse.json({ message: "Questions added successfully", questionsAdded }, { status: 201 });


    } catch (error) {
        console.error("Error adding questions:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}

export const GET = async (req: NextRequest, context: { params: { roomId: string } }) => {
    try {
        const authHeader = req.headers.get("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return NextResponse.json({ error: "Unauthorized from middleware" }, { status: 401 });
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
        const userId = decoded.id;

        const { params } = context;
        const roomId = params?.roomId;
        if (!roomId) {
            return NextResponse.json({ error: "Room not found" }, { status: 404 });
        }
        const room = await prisma.room.findUnique({
            where: {
                id: roomId
            }
        });

        if (!room) {
            return NextResponse.json({ error: "Room not found" }, { status: 404 });
        }

        console.log(room);

        const questions = await prisma.question.findMany({
            where: {
                roomId
            },
            select: {
                id: true,
                text: true,
                type: true,
                options: true,
            }
        });
        console.log(questions);
        if (!questions.length) {
            return NextResponse.json({ error: "No questions found" }, { status: 404 });
        }

        return NextResponse.json({ questions }, { status: 200 });
    } catch (error) {
        console.error("Error fetching questions:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}

