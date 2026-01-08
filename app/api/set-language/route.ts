import { NextRequest, NextResponse } from "next/server";
import { Locale } from "@/lib/i18n-shared";

export async function POST(request: NextRequest) {
  try {
    const { language } = await request.json();
    
    if (!language || (language !== "en" && language !== "ml")) {
      return NextResponse.json({ error: "Invalid language" }, { status: 400 });
    }

    const response = NextResponse.json({ success: true });
    response.cookies.set("language", language as Locale, {
      path: "/",
      maxAge: 365 * 24 * 60 * 60, // 1 year
    });

    return response;
  } catch {
    return NextResponse.json({ error: "Failed to set language" }, { status: 500 });
  }
}
