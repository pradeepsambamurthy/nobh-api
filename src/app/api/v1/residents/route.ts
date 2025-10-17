type Resident = { id: string; name: string; unit: string; phone?: string };

export async function GET() {
  const data: Resident[] = [
    { id: "r1", name: "John Doe",  unit: "A-101", phone: "+1 555-1111" },
    { id: "r2", name: "Jane Smith", unit: "B-203", phone: "+1 555-2222" },
    { id: "r3", name: "Ravi Kumar", unit: "C-307", phone: "+1 555-3333" },
  ];
  return Response.json({ data });
}
