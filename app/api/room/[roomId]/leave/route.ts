import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest, { params }: { params: { roomId: string } }) => {
    try {
        return NextResponse.json({ message: "Left room successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error leaving room:", error);
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
};
