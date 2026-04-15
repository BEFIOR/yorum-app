import CategoryPage from "@/components/CategoryPage";
import { CATEGORY_CONFIGS } from "@/lib/prompts";

export default function OtobusPage() {
  return <CategoryPage config={CATEGORY_CONFIGS.otobus} />;
}
