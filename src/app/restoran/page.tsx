import type { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";
import HeroVideoBackground from "@/components/HeroVideoBackground";
import { CATEGORY_CONFIGS } from "@/lib/prompts";
import { buildCategoryMetadata, buildCategorySchemas } from "@/lib/seo";

export const metadata: Metadata = buildCategoryMetadata("restoran");
const schemas = buildCategorySchemas("restoran");
const config = CATEGORY_CONFIGS.restoran;

export default function RestoranPage() {
  return (
    <>
      {schemas.map((schema, index) => (
        <script
          key={`restoran-schema-${index}`}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
      <HeroVideoBackground src={config.backgroundVideo} />
      <CategoryPage config={config} />
    </>
  );
}
