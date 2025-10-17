// ~/nobh-api/src/app/api/v1/residents/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Toggle this to true when you want to enforce auth
const REQUIRE_AUTH = false;

export async function GET(req: Request) {
  // Prefer Authorization: Bearer <token>
  const auth = req.headers.get("authorization") || "";
  const bearer = auth.toLowerCase().startsWith("bearer ")
    ? auth.slice(7).trim()
    : "";

  // Optionally fall back to cookies (if your frontend sets them)
  const store = await cookies();
  const idCookie = store.get("id_token")?.value || "";
  const accessCookie = store.get("access_token")?.value || "";

  const token = bearer || accessCookie || idCookie;

  if (REQUIRE_AUTH && !token) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  // Serve data directly from this API (no proxying, no API_BASE_URL)
  return NextResponse.json({
    data: [
      { id: "r1", name: "John Doe",  unit: "A-101", phone: "+1 555-1111" },
      { id: "r2", name: "Jane Smith", unit: "B-203", phone: "+1 555-2222" },
      { id: "r3", name: "Ravi Kumar", unit: "C-307", phone: "+1 555-3333" },
    ],
  });
}