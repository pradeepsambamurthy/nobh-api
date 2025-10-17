// ~/nobh-api/src/app/api/v1/residents/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  // 1) Prefer Authorization: Bearer <token>
  const auth = req.headers.get("authorization") || "";
  const bearer = auth.toLowerCase().startsWith("bearer ")
    ? auth.slice(7).trim()
    : "";

  // 2) (Optional) fall back to cookies if you want
  const store = await cookies();
  const idCookie = store.get("id_token")?.value || "";
  const accessCookie = store.get("access_token")?.value || "";

  const token = bearer || accessCookie || idCookie;

  // If you want to enforce auth, leave this check on.
  // For quick testing, you can comment it out.
  if (!token) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  // Return mock data (or call your DB here)
  return NextResponse.json({
    data: [
      { id: "r1", name: "John Doe",  unit: "A-101", phone: "+1 555-1111" },
      { id: "r2", name: "Jane Smith", unit: "B-203", phone: "+1 555-2222" },
      { id: "r3", name: "Ravi Kumar", unit: "C-307", phone: "+1 555-3333" },
    ],
  });
}