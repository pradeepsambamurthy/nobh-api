// app/logs/route.ts
export const runtime = "nodejs";

type EntryLog = {
  id: string;
  visitor: string;
  resident: string;
  time: string;
  status: string;
};

const LOGS: EntryLog[] = [
  { id: "l1", visitor: "Courier",     resident: "John Doe", time: new Date().toISOString(), status: "IN"  },
  { id: "l2", visitor: "Electrician", resident: "Jane Smith", time: new Date(Date.now()-3600e3).toISOString(), status: "OUT" },
];

export async function GET() {
  return Response.json({ data: LOGS });
}