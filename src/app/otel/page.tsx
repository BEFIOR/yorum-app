import type { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";
import HeroVideoBackground from "@/components/HeroVideoBackground";
import { CATEGORY_CONFIGS } from "@/lib/prompts";
import { buildCategoryMetadata, buildCategorySchemas } from "@/lib/seo";

export const metadata: Metadata = buildCategoryMetadata("otel");
const schemas = buildCategorySchemas("otel");
const config = CATEGORY_CONFIGS.otel;

export default function OtelPage() {
  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={`otel-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <HeroVideoBackground src={config.backgroundVideo} />
      <CategoryPage config={config} />
    </>
  );
}
