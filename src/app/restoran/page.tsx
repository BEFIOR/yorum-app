import type { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";
import { CATEGORY_CONFIGS } from "@/lib/prompts";
import { buildCategoryMetadata, buildCategorySchemas } from "@/lib/seo";

export const metadata: Metadata = buildCategoryMetadata("restoran");
const schemas = buildCategorySchemas("restoran");

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
      <CategoryPage config={CATEGORY_CONFIGS.restoran} />
    </>
  );
}
