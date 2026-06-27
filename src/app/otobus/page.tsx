import type { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";
import HeroVideoBackground from "@/components/HeroVideoBackground";
import { CATEGORY_CONFIGS } from "@/lib/prompts";
import { buildCategoryMetadata, buildCategorySchemas } from "@/lib/seo";

export const metadata: Metadata = buildCategoryMetadata("otobus");
const schemas = buildCategorySchemas("otobus");
const config = CATEGORY_CONFIGS.otobus;

export default function OtobusPage() {
  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={`otobus-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <HeroVideoBackground src={config.backgroundVideo} />
      <CategoryPage config={config} />
    </>
  );
}
