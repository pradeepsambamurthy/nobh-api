// ~/nobh-api/src/app/api/v1/residents/route.ts
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Resident = { id: string; name: string; unit: string; phone?: string };

function j(data: unknown, status = 200) {
  return NextResponse.json(data, {
    status,
    headers: { "cache-control": "no-store" },
  });
}

export async function GET(req: Request) {
  try {
    // 1) Prefer Authorization: Bearer <token>
    const auth = req.headers.get("authorization") || "";
    const bearer = auth.toLowerCase().startsWith("bearer ")
      ? auth.slice(7).trim()
      : "";

    // 2) (Optional) fall back to cookies if you want (useful when calling from a server)
    const store = await cookies();
    const idCookie = store.get("id_token")?.value || "";
    const accessCookie = store.get("access_token")?.value || "";
    const token = bearer || accessCookie || idCookie;

    // --- Auth gate ---
    // Keep this ON if you want to enforce auth, or comment out for quick testing
    if (!token) {
      return j({ error: "unauthorized" }, 401);
    }

    // 3) Return mock data (replace with DB call later)
    const data: Resident[] = [
      { id: "r1", name: "John Doe",  unit: "A-101", phone: "+1 555-1111" },
      { id: "r2", name: "Jane Smith", unit: "B-203", phone: "+1 555-2222" },
      { id: "r3", name: "Ravi Kumar", unit: "C-307", phone: "+1 555-3333" },
    ];

    return j({ data });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return j({ error: "internal_error", message: msg }, 500);
  }
}