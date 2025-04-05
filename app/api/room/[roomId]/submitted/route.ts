import { JWT_SECRET } from "@/config";
import { prisma } from "@/lib/prismadb";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
export const GET = async (req: NextRequest, { params }: { params: { roomId: string } }) => {
    try {
        const authToken = req.headers.get("Authorization");
        if (!authToken || !authToken.startsWith("Bearer ")) {
            return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
        }
        const token = authToken.split(" ")[1];
        const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
        const userId = decoded.id;
        const roomId = params.roomId;

        const existingResponse = await prisma.response.findFirst({
            where: {
                roomId,
                userId
            }
        });

        return NextResponse.json({alreadySubmitted: !!existingResponse}, { status: 200 });
    } catch (error) {
        console.error("Error checking submission:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}