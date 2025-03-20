import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config";

const protectedRoutes = [
    "/api/feedback/send",
    "/api/feedback/received",
]

export const middleware = (req: NextRequest) => {
    if (protectedRoutes.some(route => req.nextUrl.pathname.startsWith(route))) {
        const authHeader = req.headers.get("Authorization");
        if (!authHeader || !authHeader.startsWith("Bearer")) {
            return { status: 401, json: { error: "Unauthorized" } };
        }
        const token = authHeader.split(" ")[1];

        try {
            const decoded = jwt.verify(token, JWT_SECRET) as {id: string};
            console.log(decoded);

            const reqHeaders = new Headers(req.headers);
            reqHeaders.set("user-id", decoded.id);

            return NextResponse.next({request: {headers: reqHeaders}});
        } catch (error) {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }
    }
    return NextResponse.next();

}

export const config = {
    matcher: ["/api/feedback/:path*"],
};