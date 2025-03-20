import { prisma } from "@/lib/prismadb";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@/config";

export const POST = async (req: NextRequest) => {
    try {
        const { email, password } = await req.json();
        if (!email || !password) {
            return { status: 400, json: { error: "All fields are required" } };
        }
        const user = await prisma.user.findUnique({
            where: { email }
        });

        if (!user) {
            return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return NextResponse.json({ error: "Invalid email or password" }, { status: 401 });
        }

        const token = jwt.sign({
            id: user.id,
            email: user.email,
            name: user.name
        }, JWT_SECRET, { expiresIn: "1h" });

        return NextResponse.json({ message: "User signed in succesfully", token }, { status: 200 });

    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}