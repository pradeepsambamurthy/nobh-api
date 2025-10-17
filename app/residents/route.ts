// app/residents/route.ts
export const runtime = "nodejs";

type Resident = { id: string; name: string; unit: string; phone?: string };

// In-memory demo data (resets on restart)
const RESIDENTS: Resident[] = [
  { id: "r1", name: "John Doe",  unit: "A-101", phone: "+1 555-1111" },
  { id: "r2", name: "Jane Smith", unit: "B-203", phone: "+1 555-2222" },
  { id: "r3", name: "Ravi Kumar", unit: "C-307", phone: "+1 555-3333" },
];

export async function GET() {
  // mimic auth expectation (optional): require Bearer
  // const auth = req.headers.get("authorization");
  // if (!auth?.startsWith("Bearer ")) return new Response("unauthorized", { status: 401 });

  return Response.json({ data: RESIDENTS });
}