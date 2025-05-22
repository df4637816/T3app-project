import OpenAI from 'openai';
import { env } from '~/env';

const openai = new OpenAI({
  apiKey: env.OPENAI_API_KEY,
});

interface ImageAnalysisResult {
  description: string;
  tags: string[];
}

export async function analyzeImage(imageUrl: string): Promise<ImageAnalysisResult> {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "描述這張圖片的內容，並列出 5-10 個關鍵標籤，使用繁體中文回答。格式為 JSON，包含 description 和 tags 兩個欄位。" },
            { type: "image_url", image_url: { url: imageUrl } },
          ],
        },
      ],
      max_tokens: 500,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) throw new Error("No content in response");

    const result = JSON.parse(content) as ImageAnalysisResult;
    return result;
  } catch (error) {
    console.error('Error analyzing image:', error);
    return {
      description: "",
      tags: []
    };
  }
}