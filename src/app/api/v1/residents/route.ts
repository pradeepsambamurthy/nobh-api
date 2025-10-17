import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  try {
    const apiBase = process.env.API_BASE_URL?.trim();
    console.log("[web:/api/v1/residents] API_BASE_URL =", apiBase);

    const store = await cookies();
    const idToken = store.get("id_token")?.value || "";
    const accessToken = store.get("access_token")?.value || "";

    if (!idToken && !accessToken) {
      return NextResponse.json({ error: "unauthorized" }, { status: 401 });
    }

    if (!apiBase) {
      return NextResponse.json({ error: "API_BASE_URL missing" }, { status: 500 });
    }

    // ✅ Corrected upstream URL
    const upstreamUrl = `${apiBase}/api/v1/residents`;

    const upstream = await fetch(upstreamUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken || idToken}`,
      },
      cache: "no-store",
    });

    const text = await upstream.text();
    console.log("[web:/api/v1/residents] upstream", upstream.status, upstreamUrl);

    if (!upstream.ok) {
      return NextResponse.json(
        { error: "upstream_failed", status: upstream.status, details: text },
        { status: 502 }
      );
    }

    const parsed = JSON.parse(text);
    return NextResponse.json(parsed, { status: 200 });
  } catch (e) {
    console.error("[web:/api/v1/residents] error", e);
    return NextResponse.json({ error: "internal_error", message: String(e) }, { status: 500 });
  }
}