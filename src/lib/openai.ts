import OpenAI from "openai";
import {
  type Category,
  SYSTEM_PROMPTS,
  PRICE_PROMPT,
  getInputPrompt,
  getPriceSearchQuery,
} from "./prompts";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function fetchPrices(category: Category, name: string): Promise<string> {
  try {
    const response = await openai.responses.create({
      model: "gpt-4o-mini",
      tools: [{ type: "web_search_preview" }],
      instructions: PRICE_PROMPT,
      input: getPriceSearchQuery(category, name),
    });

    const textOutput = response.output.find((o) => o.type === "message");
    if (textOutput && textOutput.type === "message") {
      const textContent = textOutput.content.find((c) => c.type === "output_text");
      if (textContent && textContent.type === "output_text") {
        return textContent.text;
      }
    }
  } catch (error) {
    console.error("Price fetch error:", error);
  }
  return "FIYAT_BULUNAMADI";
}

export async function analyze(category: Category, name: string): Promise<string> {
  const priceInfo = await fetchPrices(category, name);

  const response = await openai.responses.create({
    model: "gpt-4o-mini",
    tools: [{ type: "web_search_preview" }],
    instructions: SYSTEM_PROMPTS[category],
    input: getInputPrompt(category, name, priceInfo),
  });

  const textOutput = response.output.find((o) => o.type === "message");
  if (textOutput && textOutput.type === "message") {
    const textContent = textOutput.content.find((c) => c.type === "output_text");
    if (textContent && textContent.type === "output_text") {
      return textContent.text;
    }
  }

  return "Analiz yapılamadı. Lütfen tekrar deneyin.";
}
