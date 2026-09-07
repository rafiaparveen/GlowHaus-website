import { NextResponse } from "next/server";
import { getMongoClient } from "@/lib/mongodb";
import { makeSessionCookie, signToken } from "@/lib/auth";

const redirectUri = (request) =>
  process.env.GOOGLE_REDIRECT_URI || new URL("/api/auth/google/callback", request.url).toString();

export async function GET(request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const returnedState = url.searchParams.get("state");
  const savedState = request.cookies.get("google_oauth_state")?.value;
  const signupUrl = new URL("/signup", request.url);

  if (!code || !returnedState || returnedState !== savedState) {
    signupUrl.searchParams.set("error", "google_auth_failed");
    return NextResponse.redirect(signupUrl);
  }

  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    signupUrl.searchParams.set("error", "google_not_configured");
    return NextResponse.redirect(signupUrl);
  }

  try {
    const tokenResponse = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: redirectUri(request),
        grant_type: "authorization_code",
      }),
    });

    if (!tokenResponse.ok) throw new Error("Google token exchange failed");
    const tokenData = await tokenResponse.json();

    const profileResponse = await fetch("https://openidconnect.googleapis.com/v1/userinfo", {
      headers: { Authorization: `Bearer ${tokenData.access_token}` },
    });
    if (!profileResponse.ok) throw new Error("Google profile request failed");

    const profile = await profileResponse.json();
    if (!profile.email || profile.email_verified === false) {
      throw new Error("Google email is not verified");
    }

    const client = await getMongoClient();
    const users = client.db("glowhaus").collection("users");
    const email = profile.email.toLowerCase();
    const result = await users.findOneAndUpdate(
      { email },
      {
        $set: { name: profile.name || email.split("@")[0], authProvider: "google" },
        $setOnInsert: { email, password: null, createdAt: new Date() },
      },
      { upsert: true, returnDocument: "after" }
    );

    const user = result.value || result;
    const response = NextResponse.redirect(new URL("/dashboard", request.url));
    response.headers.set(
      "Set-Cookie",
      makeSessionCookie(signToken({ id: user._id.toString(), name: user.name, email: user.email }))
    );
    response.cookies.delete("google_oauth_state");
    return response;
  } catch (error) {
    console.error("Google auth error:", error.message);
    signupUrl.searchParams.set("error", "google_auth_failed");
    return NextResponse.redirect(signupUrl);
  }
}