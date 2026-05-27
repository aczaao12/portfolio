import { NextResponse } from "next/server";

export async function GET() {
  try {
    const { query } = await import("@/lib/db");
    const rows = await query("SELECT * FROM projects ORDER BY created_at DESC");
    return NextResponse.json(rows);
  } catch (error) {
    console.error("DB error:", error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    );
  }
}
