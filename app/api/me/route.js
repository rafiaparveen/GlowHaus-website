import { NextResponse } from "next/server";
import { getSessionCookie, verifyToken } from "@/lib/auth";

export async function GET(request) {
  const token = getSessionCookie(request);
  if (!token) {
    return NextResponse.json({ error: "Not authenticated." }, { status: 401 });
  }
  const payload = verifyToken(token);
  if (!payload) {
    return NextResponse.json({ error: "Invalid session." }, { status: 401 });
  }
  return NextResponse.json({ user: { id: payload.id, name: payload.name, email: payload.email } });
}
