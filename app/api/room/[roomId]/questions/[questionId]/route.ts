import { prisma } from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, { params }: { params: { roomId: string, questionId: string } }) => {
    try {
        const { roomId, questionId } = params;
        const { responseText } = await req.json();

        if (!responseText) {
            return NextResponse.json({ error: "Response is required" }, { status: 400 });
        }

        const room = await prisma.room.findUnique({
            where: {
                id: roomId
            }
        });

        if (!room) {
            return NextResponse.json({ error: "Room not found" }, { status: 404 });
        }

        const question = await prisma.question.findUnique({
            where: {
                id: questionId
            }
        });

        if (!question) {
            return NextResponse.json({ error: "Question not found" }, { status: 404 });
        }

        const newResponse = await prisma.response.create({
            data: {
                roomId,
                questionId,
                responseText
            }
        });

        return NextResponse.json({ message: "Response submitted", response: newResponse }, { status: 201 });


    } catch (error) {
        console.error("Something went wrong:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
export const GET = async (req: NextRequest, { params }: { params: { roomId: string, questionId: string } }) => {
    try {
        const { roomId, questionId } = params;

        const room = await prisma.room.findUnique({
            where: {
                id: roomId
            }
        });

        if (!room) {
            return NextResponse.json({ error: "Room not found" }, { status: 404 });
        }

        const question = await prisma.question.findUnique({
            where: {
                id: questionId
            }
        });

        if (!question) {
            return NextResponse.json({ error: "Question not found" }, { status: 404 });
        }

        return NextResponse.json({ question }, { status: 201 });


    } catch (error) {
        console.error("Something went wrong:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}