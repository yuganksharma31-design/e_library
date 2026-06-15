import { NextResponse } from "next/server";
import manuscripts from "@/data/manuscripts.json";

function text(value) {
  return String(
    Array.isArray(value) ? value.join(" ") : value || ""
  ).toLowerCase();
}

function formatManuscript(item, index) {
  const identifier = item.identifier || item._id || "";

  return {
    _id: item._id || identifier || index + 1,
    identifier,
    title: item.title || "Untitled Manuscript",
    collection: item.collection || "Unknown Collection",
    language: item.language || "Sanskrit",
    year: item.year || "Unknown",
    creator: item.creator || "Unknown",
    description: item.description || "",
    image:
      item.image ||
      item.thumbnail ||
      item.cover ||
      (identifier
        ? `https://archive.org/services/img/${identifier}`
        : "/placeholder.jpg"),
    pdfUrl: item.pdfUrl || item.pdf || "",
    embedUrl: item.embedUrl || (identifier ? `https://archive.org/embed/${identifier}` : ""),
    archiveUrl:
      item.archiveUrl ||
      (identifier ? `https://archive.org/details/${identifier}` : ""),
  };
}

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
    const limit = Math.max(1, parseInt(searchParams.get("limit") || "50", 10));
    const search = (searchParams.get("search") || "").trim().toLowerCase();
    const language = (searchParams.get("language") || "All").trim().toLowerCase();

    let filtered = manuscripts;

    if (search) {
      filtered = filtered.filter((item) => {
        const haystack = [
          text(item.title),
          text(item.creator),
          text(item.collection),
          text(item.description),
          text(item.language),
          text(item.year),
        ].join(" ");

        return haystack.includes(search);
      });
    }

    if (language && language !== "all") {
      filtered = filtered.filter((item) => text(item.language).includes(language));
    }

    const total = filtered.length;
    const start = (page - 1) * limit;
    const paginated = filtered.slice(start, start + limit);

    const data = paginated.map(formatManuscript);

    return NextResponse.json({
      total,
      page,
      limit,
      data,
    });
  } catch (error) {
    console.error("Failed to load manuscripts:", error);
    return NextResponse.json(
      { error: "Failed to load manuscripts" },
      { status: 500 }
    );
  }
}