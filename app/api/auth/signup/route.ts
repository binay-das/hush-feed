import { NextRequest, NextResponse } from "next/server";
import bcrypt from 'bcryptjs';
import { prisma } from "@/lib/prismadb";

export const POST = async (req: NextRequest) => {
    try {
        const { name, email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: "All fields are required" }, { status: 400 });
        }

        const existingUser = await prisma.user.findUnique({
            where: { email }
        }
        );
        if (existingUser) {
            return NextResponse.json({ error: "User already exists" }, { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await prisma.user.create({
            data: { name: "Anonymous", email, password: hashedPassword }
        });
        return NextResponse.json({ message: 'User created', user: newUser }, { status: 201 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
} 