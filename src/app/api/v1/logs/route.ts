type EntryLog = { id: string; visitor: string; resident: string; time: string; status: string };

export async function GET() {
  const data: EntryLog[] = [
    { id: "l1", visitor: "Courier",     resident: "John Doe", time: new Date().toISOString(), status: "granted" },
    { id: "l2", visitor: "Electrician", resident: "Jane Smith", time: new Date().toISOString(), status: "denied"  },
  ];
  return Response.json({ data });
}
