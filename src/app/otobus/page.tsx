import type { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";
import { CATEGORY_CONFIGS } from "@/lib/prompts";
import { buildCategoryMetadata, buildCategorySchemas } from "@/lib/seo";

export const metadata: Metadata = buildCategoryMetadata("otobus");
const schemas = buildCategorySchemas("otobus");

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
      <CategoryPage config={CATEGORY_CONFIGS.otobus} />
    </>
  );
}
