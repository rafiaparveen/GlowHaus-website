import { NextResponse } from "next/server";
import { getMongoClient } from "@/lib/mongodb";

export async function GET() {
  try {
    const client = await getMongoClient();
    if (!client) {
      return NextResponse.json(
        { ok: false, database: "disconnected" },
        { status: 503 }
      );
    }
    await client.db("glowhaus").command({ ping: 1 });

    return NextResponse.json({ ok: true, database: "connected" });
  } catch (error) {
    console.error("MongoDB health check failed:", error.message);
    return NextResponse.json(
      { ok: false, database: "disconnected" },
      { status: 503 }
    );
  }
}