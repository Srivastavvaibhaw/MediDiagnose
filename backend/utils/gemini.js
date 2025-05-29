import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function getGeminiDiagnosis(symptoms) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `I have these symptoms: ${symptoms}. What could be the possible diagnosis or advice?`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = await response.text();

  return text;
}
