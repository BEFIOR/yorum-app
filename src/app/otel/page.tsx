import CategoryPage from "@/components/CategoryPage";
import { CATEGORY_CONFIGS } from "@/lib/prompts";

export default function OtelPage() {
  return <CategoryPage config={CATEGORY_CONFIGS.otel} />;
}
