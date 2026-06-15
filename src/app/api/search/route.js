import { NextResponse } from "next/server";
import searchIndex from "@/data/search_index.json";

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const q = (searchParams.get("q") || "")
    .trim()
    .toLowerCase();

  if (!q) {
    return NextResponse.json({
      total: 0,
      data: [],
    });
  }

  const results = [];

  for (const item of searchIndex) {
    if (
      item.title &&
      item.title.toLowerCase().includes(q)
    ) {
      results.push({
        ...item,
        url:
          item.url ||
          `/reader/${item.identifier || item._id}`,
      });

      if (results.length >= 100) {
        break;
      }
    }
  }

  return NextResponse.json({
    total: results.length,
    data: results,
  });
}