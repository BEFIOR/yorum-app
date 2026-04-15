import CategoryPage from "@/components/CategoryPage";
import { CATEGORY_CONFIGS } from "@/lib/prompts";

export default function RestoranPage() {
  return <CategoryPage config={CATEGORY_CONFIGS.restoran} />;
}
