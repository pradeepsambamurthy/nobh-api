// src/app/api/v1/announcements/route.ts
export const runtime = "nodejs";

export async function GET() {
  return Response.json({
    data: [
      { id: "a1", title: "Water Shutdown", body: "Maintenance 2–4pm today.", createdAt: new Date().toISOString(), pinned: true },
      { id: "a2", title: "Diwali Celebration", body: "Community hall at 6pm.", createdAt: new Date().toISOString() },
    ],
  });
}