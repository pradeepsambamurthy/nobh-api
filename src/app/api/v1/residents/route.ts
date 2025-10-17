import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const auth = req.headers.get("authorization") || "";
  const bearer = auth.toLowerCase().startsWith("bearer ")
    ? auth.slice(7).trim()
    : "";

  const jar = await cookies();
  const idCookie = jar.get("id_token")?.value || "";
  const accessCookie = jar.get("access_token")?.value || "";

  const token = bearer || accessCookie || idCookie;

  if (!token) {
    return NextResponse.json(
      { error: "unauthorized", build: "a03adcf", sawToken: false },
      { status: 401 }
    );
  }

  return NextResponse.json({
    build: "a03adcf",
    sawToken: true,
    data: [
      { id: "r1", name: "John Doe",  unit: "A-101", phone: "+1 555-1111" },
      { id: "r2", name: "Jane Smith", unit: "B-203", phone: "+1 555-2222" },
      { id: "r3", name: "Ravi Kumar", unit: "C-307", phone: "+1 555-3333" },
    ],
  });
}