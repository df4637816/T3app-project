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
            { type: "text", text: `請只根據這張圖片本身的畫面內容進行分析，不要根據任何外部描述或假設。請詳細辨識圖片中實際可見的元素，特別注意是否有街道、動物、商店、店名、招牌、建築物等資訊，若有請明確指出並描述。請列出 5-10 個最具代表性的繁體中文關鍵標籤，標籤內容可包含地點、動物、商店名稱、品牌、街道名稱等。請以 JSON 格式回答，包含 description（圖片描述）和 tags（標籤陣列）兩個欄位。` },
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