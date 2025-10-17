// app/visitors/route.ts
export const runtime = "nodejs";

type Visitor = {
  id: string;
  name: string;
  code: string;
  validTill: string;
  status: "active" | "revoked";
};

let VISITORS: Visitor[] = [
  { id: "v1", name: "Courier",    code: "X7A3B", validTill: new Date(Date.now()+864e5).toISOString(), status: "active" },
  { id: "v2", name: "Electrician",code: "K9Q1Z", validTill: new Date(Date.now()+2*864e5).toISOString(), status: "active" },
];

export async function GET() {
  return Response.json({ data: VISITORS });
}

// Simple demo POST handlers (optional) used by your page forms
export async function POST(req: Request) {
  const url = new URL(req.url);
  const methodOverride = url.searchParams.get("_method") || undefined;

  if (methodOverride === "revoke") {
    const id = url.searchParams.get("id") || "";
    VISITORS = VISITORS.map(v => v.id === id ? { ...v, status: "revoked" } : v);
    return Response.json({ ok: true });
  }

  // create a new pass
  const id = `v${Math.random().toString(36).slice(2,7)}`;
  const code = Math.random().toString(36).slice(2,7).toUpperCase();
  const now = Date.now();
  const body = await (async () => { try { return await req.json(); } catch { return {}; } })() as Partial<Visitor>;

  const item: Visitor = {
    id,
    name: body.name || "Guest",
    code,
    validTill: new Date(now + 24 * 3600 * 1000).toISOString(),
    status: "active",
  };
  VISITORS.unshift(item);

  return Response.json({ ok: true, data: item }, { status: 201 });
}