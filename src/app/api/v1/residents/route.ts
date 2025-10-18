// nobh-api/src/app/api/v1/residents/route.ts
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const auth = req.headers.get("authorization") || "";

  // Require "Authorization: Bearer <token>"
  if (!auth.toLowerCase().startsWith("bearer ") || !auth.slice(7).trim()) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  // (Mock) protected data
  return NextResponse.json({
    data: [
      { id: "r1", name: "John Doe",  unit: "A-101", phone: "+1 555-1111" },
      { id: "r2", name: "Jane Smith", unit: "B-203", phone: "+1 555-2222" },
      { id: "r3", name: "Ravi Kumar", unit: "C-307", phone: "+1 555-3333" },
    ],
  });
}