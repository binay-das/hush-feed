import { prisma } from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const {roomId, questionText, questionType} = await req.json();

        if (!roomId || !questionText || !questionType) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        const question = await prisma.question.create({
            data: {
                roomId,
                text: questionText,
                type: questionType
            }
        });

        return NextResponse.json({ message: "Question added", question }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}