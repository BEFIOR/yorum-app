import { NextRequest, NextResponse } from "next/server";
import { analyze } from "@/lib/openai";
import { supabase } from "@/lib/supabase";
import type { Category } from "@/lib/prompts";

const VALID_CATEGORIES: Category[] = ["otel", "otobus", "ucak", "restoran"];

export async function POST(request: NextRequest) {
  try {
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: "AI analizi su an devre disi. OPENAI_API_KEY eklendikten sonra tekrar deneyin." },
        { status: 503 }
      );
    }

    const { name, category } = await request.json();

    if (!name || name.trim().length < 2) {
      return NextResponse.json(
        { error: "Arama terimi en az 2 karakter olmalıdır." },
        { status: 400 }
      );
    }

    if (!category || !VALID_CATEGORIES.includes(category)) {
      return NextResponse.json(
        { error: "Geçersiz kategori." },
        { status: 400 }
      );
    }

    const analysis = await analyze(category, name.trim());

    const { data: searchData, error: searchError } = await supabase
      .from("searches")
      .insert({
        hotel_name: name.trim(),
        hotel_place_id: name.trim().toLowerCase().replace(/\s+/g, "-"),
        hotel_address: "",
        hotel_rating: null,
        category,
      })
      .select("id")
      .single();

    if (searchError) {
      console.error("Supabase search insert error:", searchError);
    }

    if (searchData) {
      const { error: analysisError } = await supabase.from("analyses").insert({
        search_id: searchData.id,
        analysis_text: analysis,
        raw_reviews: [],
      });

      if (analysisError) {
        console.error("Supabase analysis insert error:", analysisError);
      }
    }

    return NextResponse.json({
      name: name.trim(),
      analysis,
    });
  } catch (error) {
    console.error("Analysis error:", error);
    if (error instanceof Error && error.message === "OPENAI_API_KEY_MISSING") {
      return NextResponse.json(
        { error: "AI analizi su an devre disi. OPENAI_API_KEY eksik." },
        { status: 503 }
      );
    }

    const errorObj = error as {
      status?: number;
      code?: string;
      type?: string;
      error?: { code?: string; type?: string; message?: string };
      message?: string;
    };
    const isQuotaError =
      errorObj?.status === 429 ||
      errorObj?.code === "insufficient_quota" ||
      errorObj?.type === "insufficient_quota" ||
      errorObj?.error?.code === "insufficient_quota" ||
      errorObj?.error?.type === "insufficient_quota";

    if (isQuotaError) {
      return NextResponse.json(
        {
          error:
            "OpenAI kotasi dolu veya billing aktif degil. OpenAI projesinde billing/limit acip yeni key ile tekrar deneyin.",
        },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { error: "Analiz sırasında bir hata oluştu. Lütfen tekrar deneyin." },
      { status: 500 }
    );
  }
}
