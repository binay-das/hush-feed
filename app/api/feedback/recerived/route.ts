import { prisma } from "@/lib/prismadb";
import { NextRequest, NextResponse } from "next/server";


export const GET = async (req: NextRequest) => {
    try {
        const receiverId = req.headers.get("user-id");
        if (!receiverId) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const feedbacks = await prisma.feedback.findMany({
            where: { receiverId  },
            select: {
                id: true, message: true, sender: {
                    select: {
                        name: true
                    }
                },
                createdAt: true
            },
            orderBy: { createdAt: "desc" }
        });

        return NextResponse.json({ feedbacks }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}