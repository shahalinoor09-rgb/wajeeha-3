
import { GoogleGenAI, Type } from "@google/genai";
import { Transaction, Budget } from "../types";

export const getFinancialInsights = async (transactions: Transaction[], budgets: Budget[]) => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  const prompt = `
    Analyze the following financial data:
    Transactions: ${JSON.stringify(transactions)}
    Monthly Budgets: ${JSON.stringify(budgets)}

    Provide 3-5 specific, actionable financial insights and suggestions to save money or optimize spending.
    The response must be in JSON format.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            insights: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  tip: { type: Type.STRING },
                  description: { type: Type.STRING },
                  severity: { type: Type.STRING, enum: ['low', 'medium', 'high'] }
                },
                required: ['tip', 'description', 'severity']
              }
            }
          },
          required: ['insights']
        }
      }
    });

    const result = JSON.parse(response.text || '{"insights": []}');
    return result.insights;
  } catch (error) {
    console.error("Error fetching AI insights:", error);
    return [];
  }
};
