import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { getMongoClient, getMongoConnectionMessage } from "@/lib/mongodb";

export async function POST(request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json({ error: "Password must be at least 6 characters." }, { status: 400 });
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

    const existing = await users.findOne({ email: email.toLowerCase() });
    if (existing) {
      return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await users.insertOne({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      createdAt: new Date(),
    });

    return NextResponse.json({ message: "Account created successfully!" }, { status: 201 });
  } catch (err) {
    console.error("Signup error:", err);
    return NextResponse.json(
      { error: getMongoConnectionMessage() },
      { status: 503 }
    );
  }
}
