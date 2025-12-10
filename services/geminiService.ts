import { GoogleGenAI, Type } from "@google/genai";
import { AiGenerationResult } from "../types";

// Helper to check for API key
const getApiKey = (): string => {
  const key = process.env.API_KEY;
  if (!key) {
    console.error("API_KEY is missing in environment variables.");
    throw new Error("API Key missing");
  }
  return key;
};

export const generateEventDetails = async (title: string, context: string = ""): Promise<AiGenerationResult> => {
  try {
    const apiKey = getApiKey();
    const ai = new GoogleGenAI({ apiKey });

    // 1. Generate Text Metadata (Description, Tags, Location)
    const textModel = "gemini-2.5-flash";
    const textPrompt = `
      You are an event planning assistant for a futuristic event app. 
      Generate a compelling, short marketing description (max 25 words), 3 relevant tags, and a plausible fictional or real location for an event titled: "${title}".
      Context provided by user: "${context}".
      
      Return JSON.
    `;

    const textResponse = await ai.models.generateContent({
      model: textModel,
      contents: textPrompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            description: { type: Type.STRING },
            tags: { type: Type.ARRAY, items: { type: Type.STRING } },
            location: { type: Type.STRING }
          },
          required: ["description", "tags", "location"]
        }
      }
    });

    const metadata = JSON.parse(textResponse.text || "{}");

    // 2. Generate Event Cover Image
    // Using gemini-2.5-flash-image as requested for standard image generation tasks
    const imageModel = "gemini-2.5-flash-image";
    const imagePrompt = `
      A futuristic, high-end, aesthetic abstract 3D render event poster for an event titled "${title}". 
      Style: Dark mode, neon lighting, glassmorphism, raytracing, 8k resolution, minimalist. 
      No text on image.
    `;
    
    // Note: In a real production app with high throughput, we might separate these calls or use a specific image model.
    // For this demo, we generate the image.
    
    let base64Image = "";
    
    try {
        const imageResponse = await ai.models.generateContent({
            model: imageModel,
            contents: imagePrompt,
        });

        // Extract image from response
        // The model returns candidates. The image data is usually in the parts.
        // We need to look for inlineData in the parts.
        const parts = imageResponse.candidates?.[0]?.content?.parts;
        if (parts) {
            for (const part of parts) {
                if (part.inlineData && part.inlineData.data) {
                    base64Image = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
                    break;
                }
            }
        }
    } catch (imgError) {
        console.warn("Image generation failed, using placeholder", imgError);
        base64Image = `https://picsum.photos/800/600?random=${Math.floor(Math.random() * 1000)}`;
    }

    if (!base64Image) {
         base64Image = `https://picsum.photos/800/600?random=${Math.floor(Math.random() * 1000)}`;
    }

    return {
      description: metadata.description || "An exclusive event.",
      tags: metadata.tags || ["Event"],
      locationSuggestion: metadata.location || "TBD",
      imageUrl: base64Image
    };

  } catch (error) {
    console.error("Gemini Service Error:", error);
    // Fallback data so the app doesn't crash
    return {
      description: "Experience the future of events.",
      tags: ["Future", "Tech"],
      locationSuggestion: "Virtual Space",
      imageUrl: "https://picsum.photos/800/600"
    };
  }
};
