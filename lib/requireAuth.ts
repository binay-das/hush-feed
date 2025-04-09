import { NextRequest, NextResponse } from "next/server";
import { getIdFromAuthHeader } from "@/lib/utils";

export function requireAuth(handler: (req: NextRequest, userId: string) => Promise<NextResponse>) {
  return async (req: NextRequest): Promise<NextResponse> => {
    const authHeader = req.headers.get("authorization") || "";

    try {
      const userId = getIdFromAuthHeader(authHeader);
      return await handler(req, userId);
    } catch (err) {
      return NextResponse.json({ error: (err as Error).message }, { status: 401 });
    }
  };
}