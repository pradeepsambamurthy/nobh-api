type Visitor = { id: string; name: string; code: string; validTill: string; status: "active"|"revoked" };

export async function GET() {
  const now = Date.now();
  const data: Visitor[] = [
    { id: "v1", name: "Courier",     code: "ABCD12", validTill: new Date(now+3600e3).toISOString(), status: "active"  },
    { id: "v2", name: "Electrician", code: "EFGH34", validTill: new Date(now-3600e3).toISOString(), status: "revoked" },
  ];
  return Response.json({ data });
}
