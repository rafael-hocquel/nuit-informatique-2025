import { GoogleGenAI } from "@google/genai";
import { customPrompt } from "../../config.json";

const geminiRequest = async (prompt: string) => {
  const ai = new GoogleGenAI({
    // NOTE: the way of accessing the API key is deprecated and should be changed if the project is in use with routes
    apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY,
  });
  // PROMPT
  let finalPrompt =
    customPrompt +
    "Voici le prompt de l'utilisateur, répond y en respectant les consignes précédentes: " +
    prompt;
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    config: {
      thinkingConfig: {
        thinkingBudget: -1,
      },
    },
    contents: finalPrompt,
  });
  const finalResponse = response.text;
  return finalResponse;
};

export default geminiRequest;
