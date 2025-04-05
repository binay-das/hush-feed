import { JWT_SECRET } from "@/config";
import { NextRequest, NextResponse } from "next/server";
import jwt from 'jsonwebtoken';
import { prisma } from "@/lib/prismadb";

export const GET = async (req: NextRequest) => {
    try {
        const authToken = req.headers.get("Authorization");
        if (!authToken || !authToken.startsWith("Bearer ")) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const token = authToken.split(" ")[1];
        const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
        const userId = decoded.id;

        const user = await prisma.user.findUnique({
            where: {
                id: userId
            },
            select: {
                id: true,
                name: true,
                email: true,
                rooms: {
                    select: {
                        id: true,
                        title: true,
                        description: true,
                        createdAt: true,
                    }
                }
            }
        });

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json(user, { status: 200 });

    } catch (error) {
        console.error("Error fetching account details:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}