
import { GoogleGenAI, Modality } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const editImageWithNanoBanana = async (
  productImage: { base64: string; mimeType: string },
  prompt: string,
  styleImage?: { base64: string; mimeType: string }
): Promise<string> => {
  try {
    // Construct the parts array for the API call
    const parts: unknown[] = [
      { inlineData: { data: productImage.base64, mimeType: productImage.mimeType } },
      { text: prompt },
    ];

    // If a style image is provided, insert it into the parts array
    if (styleImage) {
      parts.splice(1, 0, { 
        inlineData: { data: styleImage.base64, mimeType: styleImage.mimeType } 
      });
    }

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image-preview',
      contents: { parts },
      config: {
        responseModalities: [Modality.IMAGE, Modality.TEXT],
      },
    });

    // Process the response to find and return the generated image data
    if (response.candidates && response.candidates.length > 0) {
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData && part.inlineData.mimeType.startsWith('image/')) {
          return part.inlineData.data; // Return base64 string of the new image
        }
      }
    }

    throw new Error("No image was generated in the response.");
  } catch (error) {
    console.error("Error editing image with Gemini API:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to generate image: ${error.message}`);
    }
    throw new Error("An unknown error occurred during image generation.");
  }
};
