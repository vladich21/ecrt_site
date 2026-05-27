import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const body = await req.text();

  // Phase A baseline: keep metrics in logs before wiring DataDog/GA4.
  console.log("[web-vitals:ingest]", body);

  return NextResponse.json({ ok: true });
}
