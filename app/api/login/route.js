import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getMongoClient, getMongoConnectionMessage } from "@/lib/mongodb";
import { signToken, makeSessionCookie } from "@/lib/auth";

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password are required." }, { status: 400 });
    }

    const client = await getMongoClient();
    if (!client) {
      return NextResponse.json(
        { error: getMongoConnectionMessage() },
        { status: 503 }
      );
    }
    const db = client.db("glowhaus");
    const users = db.collection("users");

    const user = await users.findOne({ email: email.toLowerCase() });
    if (!user) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return NextResponse.json({ error: "Invalid email or password." }, { status: 401 });
    }

    const token = signToken({
      id: user._id.toString(),
      name: user.name,
      email: user.email,
    });

    const response = NextResponse.json({ message: "Logged in successfully!" }, { status: 200 });
    response.headers.set("Set-Cookie", makeSessionCookie(token));
    return response;
  } catch (err) {
    console.error("Login error:", err);
    return NextResponse.json({ error: getMongoConnectionMessage() }, { status: 503 });
  }
}
