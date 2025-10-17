type Announcement = { id: string; title: string; body: string; createdAt: string; pinned?: boolean };

export async function GET() {
  const data: Announcement[] = [
    { id: "a1", title: "Water shutdown", body: "Maintenance 2–4 PM today.", createdAt: new Date().toISOString(), pinned: true },
    { id: "a2", title: "Gym repaint", body: "Closed this weekend.", createdAt: new Date(Date.now()-86400e3).toISOString() },
  ];
  return Response.json({ data });
}
