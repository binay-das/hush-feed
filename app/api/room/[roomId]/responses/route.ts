import { JWT_SECRET } from "@/config";
import { prisma } from "@/lib/prismadb";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, { params }: { params: { roomId: string } }) => {
    try {
        const authToken = req.headers.get("Authorization");
        if (!authToken || !authToken.startsWith("Bearer ")) {
            return NextResponse.json({error: "Unauthorized" }, {status: 401});
        }
        const token = authToken.split(" ")[1];
        const decoded = jwt.verify(token, JWT_SECRET) as {id: string};
        const userId = decoded.id;

        const { roomId } = params;
        if (!roomId) return NextResponse.json({ error: "Room ID is required" }, { status: 400 });

        const room = await prisma.room.findUnique({
            where: {
                id: roomId
            }
        });
        if (!room) {
            return NextResponse.json({ error: "Room not found" }, { status: 404 });
        }
        const { responses } = await req.json();
        if (!responses || !Array.isArray(responses) || responses.length === 0) {
            return NextResponse.json({ error: "No responses provided" }, { status: 400 });
        }

        const questionIds = responses.map(r => r.questionId);

        const validQuestions = await prisma.question.findMany({
            where: {
                id: { in: questionIds },
                roomId
            },
            select: { id: true }
        });
        const validQuestionIds = new Set(validQuestions.map(q => q.id));
        const invalidResponses = responses.filter(r => !validQuestionIds.has(r.questionId));

        if (invalidResponses.length > 0) {
            return NextResponse.json({ error: "Some questions are invalid" }, { status: 400 });
        }

        const savedResponses = await prisma.response.createMany({
            data: responses.map(response => ({
                roomId,
                questionId: response.questionId,
                responseText: response.responseText
            }))
        });

        return NextResponse.json({ message: "Response submitted", response: savedResponses }, { status: 201 });

    } catch (error) {
        console.error("Error submitting response:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
};


export const GET = async (req: NextRequest, { params }: { params: { roomId: string } }) => {
    try {
        const { roomId } = params;
        const { creatorId } = await req.json(); 

        // Validate room exists
        const room = await prisma.room.findUnique({
            where: { id: roomId }
        });

        if (!room) {
            return NextResponse.json({ error: "Room not found" }, { status: 404 });
        }

        // Ensure only the creator can view responses
        if (room.creatorId !== creatorId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
        }

        // Fetch all responses for the room
        const responses = await prisma.response.findMany({
            where: { roomId },
            include: { question: true } // Include question details
        });

        return NextResponse.json({ responses }, { status: 200 });

    } catch (error) {
        console.error("Error fetching responses:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
};

