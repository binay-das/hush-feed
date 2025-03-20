import { prisma } from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
    try {
        const senderId = req.headers.get("user-id");
        if (!senderId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const { receiverId, message } = await req.json();
        console.log({ receiverId, message, senderId });
        if (!receiverId || !message) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        const feedback = await prisma.feedback.create({
            data: {
                message,
                senderId,
                receiverId,
                sentitem: 'dc'
            }
        });
        return NextResponse.json({ message: "Feedback sent!", feedback }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}