import type { Metadata } from "next";
import CategoryPage from "@/components/CategoryPage";
import { CATEGORY_CONFIGS } from "@/lib/prompts";
import { buildCategoryMetadata, buildCategorySchemas } from "@/lib/seo";

export const metadata: Metadata = buildCategoryMetadata("otel");
const schemas = buildCategorySchemas("otel");

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
      <CategoryPage config={CATEGORY_CONFIGS.otel} />
    </>
  );
}
