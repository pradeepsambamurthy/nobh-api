// app/announcements/route.ts
export const runtime = "nodejs";

type Announcement = {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  pinned?: boolean;
};

const ANNOUNCEMENTS: Announcement[] = [
  { id: "a1", title: "Pool Maintenance", body: "Pool closed Sat 9–11am.", createdAt: new Date().toISOString(), pinned: true },
  { id: "a2", title: "Fire Drill", body: "Drill on Monday 3pm.", createdAt: new Date(Date.now()-864e5).toISOString() },
];

export async function GET() {
  return Response.json({ data: ANNOUNCEMENTS });
}