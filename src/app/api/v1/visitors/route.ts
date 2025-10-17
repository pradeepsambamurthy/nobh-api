// src/app/api/v1/visitors/route.ts
export const runtime = "nodejs";

export async function GET() {
  return Response.json({
    data: [
      { id: "v1", name: "Courier",     code: "A1B2C3", validTill: new Date(Date.now()+864e5).toISOString(), status: "active" },
      { id: "v2", name: "Electrician", code: "D4E5F6", validTill: new Date(Date.now()+2*864e5).toISOString(), status: "active" },
    ],
  });
}

export async function POST(req: Request) {
  // simple stub so your “Create/Revoke” forms don’t fail
  const fd = await req.formData().catch(() => null);
  if (fd?.get("_method") === "revoke") return Response.json({ ok: true, revoked: true });
  return Response.json({ ok: true, created: true });
}