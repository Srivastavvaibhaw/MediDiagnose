import { GoogleGenerativeAI } from "@google/generative-ai";
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function getGeminiDiagnosis(symptoms) {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `
You are a knowledgeable and compassionate medical assistant. A user presents with the following symptoms:

Symptoms: ${symptoms}

Please provide a detailed, structured response that includes:

1. **Possible Diagnoses:** List potential conditions and explain why each is possible.
2. **Severity Assessment:** Rate the urgency or severity (e.g., mild, moderate, urgent).
3. **Red Flags:** Mention any symptoms that suggest a medical emergency or need for urgent care.
4. **Home Remedies & Self-Care:** Provide practical tips for symptom relief at home.
5. **Medical Advice:** Recommend whether the user should:
   - Monitor at home
   - Consult a general doctor
   - Visit a specialist
   - Seek emergency medical attention
6. **Preventive Care:** Give advice on how to prevent these symptoms or related illnesses in the future.
7. **Lifestyle Suggestions:** Offer general health, hygiene, nutrition, or mental wellness tips (if applicable).

Make sure your response is easy to read, well-organized, and clearly explains that this is not a substitute for professional medical diagnosis or treatment.
`;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = await response.text();

  return text;
}
