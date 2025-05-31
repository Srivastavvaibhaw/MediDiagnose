import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function getGeminiDiagnosis(symptoms) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `
You are a knowledgeable and cautious medical assistant. A user presents with the following symptoms:

Symptoms: ${symptoms}

Please provide:
1. A list of possible diagnoses with brief explanations.
2. The likelihood/severity of each condition based on common patterns.
3. Any red flag symptoms that require immediate medical attention.
4. Recommended next steps (e.g., home remedies, doctor consultation, emergency care).
5. Preventive tips or lifestyle advice (if applicable).

Present your response in a clear, structured format. Avoid making a definitive diagnosis — emphasize it’s informational and not a substitute for a real doctor’s advice.
`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = await response.text();

  return text;
}
