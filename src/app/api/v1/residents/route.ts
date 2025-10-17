// src/app/api/v1/residents/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  // Prefer Bearer header
  const auth = req.headers.get("authorization") || "";
  const bearer = auth.toLowerCase().startsWith("bearer ")
    ? auth.slice(7).trim()
    : "";

  // Cookie fallback (for same-origin calls)
  const jar = await cookies();
  const idCookie = jar.get("id_token")?.value || "";
  const accessCookie = jar.get("access_token")?.value || "";

  const token = bearer || accessCookie || idCookie;

  // 🚫 No token -> 401 (do NOT return mock data)
  if (!token) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  // ✅ Token present -> return data (mock ok only after auth)
  return NextResponse.json({
    data: [
      { id: "r1", name: "John Doe",  unit: "A-101", phone: "+1 555-1111" },
      { id: "r2", name: "Jane Smith", unit: "B-203", phone: "+1 555-2222" },
      { id: "r3", name: "Ravi Kumar", unit: "C-307", phone: "+1 555-3333" },
    ],
  });
}