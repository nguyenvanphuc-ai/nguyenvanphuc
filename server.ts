import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

// Helper delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

// Candidate models in preference order (valid @google/genai models)
const CANDIDATE_MODELS = [
  'gemini-3.1-flash-lite',
  'gemini-3.8-flash',
  'gemini-flash-latest',
  'gemini-3.1-pro-preview',
];

// In-memory model cooldown tracker to avoid hammering quota-exhausted or 503 models
const modelCooldowns = new Map<string, number>();

function getCandidateModels(): string[] {
  const now = Date.now();
  const available = CANDIDATE_MODELS.filter((m) => (modelCooldowns.get(m) || 0) <= now);
  if (available.length === 0) {
    // If all are cooling down, clear cooldowns and try in original order
    modelCooldowns.clear();
    return CANDIDATE_MODELS;
  }
  return available;
}

function getErrorDetails(error: any): { isQuota: boolean; isHighDemand: boolean; status: string | number } {
  if (!error) return { isQuota: false, isHighDemand: false, status: 'unknown' };
  const status = error.status || error.code || error?.error?.code || 'ERROR';
  const message = String(error.message || error?.error?.message || error || '').toLowerCase();

  const isQuota =
    status === 429 ||
    status === 'RESOURCE_EXHAUSTED' ||
    message.includes('quota') ||
    message.includes('rate limit') ||
    message.includes('resource_exhausted');

  const isHighDemand =
    status === 503 ||
    status === 'UNAVAILABLE' ||
    message.includes('503') ||
    message.includes('high demand') ||
    message.includes('unavailable') ||
    message.includes('overloaded') ||
    message.includes('spikes in demand');

  return { isQuota, isHighDemand, status };
}

async function generateWithFallbackAndRetry(
  ai: GoogleGenAI,
  prompt: string,
  systemInstruction?: string,
  temperature: number = 0.7
): Promise<{ text: string; modelUsed: string } | null> {
  const config = {
    systemInstruction:
      systemInstruction ||
      `Bạn là chuyên gia cố vấn xây dựng Kế hoạch Giáo dục Mầm non theo Chương trình thí điểm tại Quyết định 388/QĐ-BGDĐT của Bộ GD&ĐT Việt Nam.
Tác giả/chủ sở hữu App: Nguyễn Văn Phúc (Zalo: 0949.379.531).
Yêu cầu tối thượng:
1. Lấy trẻ làm trung tâm, tôn trọng mốc phát triển tâm sinh lý của 5 độ tuổi: 18-24 tháng, 24-36 tháng, 3-4 tuổi, 4-5 tuổi, 5-6 tuổi.
2. Với Nhà trẻ (18-24th, 24-36th): hoạt động ngắn, vật thật, câu từ mộc mạc, không dùng cấu trúc máy móc của mẫu giáo.
3. Luôn sử dụng 5 lĩnh vực YCCĐ: TC (Thể chất), TX (Tình cảm - Xã hội), NN (Ngôn ngữ), NT (Nhận thức), NgT (Nghệ thuật) với mã số chuẩn (TC1, TC1.1, TX1, TX1.1, NN1, NT1...).
4. Đặc biệt ưu tiên địa danh, di tích, sản phẩm địa phương hiện hành SAU SÁP NHẬP ĐƠN VI HÀNH CHÍNH.
5. Luôn trả lời bằng định dạng JSON hoặc văn bản rõ ràng theo đúng cấu trúc giáo viên yêu cầu.`,
    temperature,
  };

  const modelsToTry = getCandidateModels();

  for (const model of modelsToTry) {
    try {
      console.log(`[AI Service] Generating with model ${model}...`);
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config,
      });

      const text = response.text || '';
      if (text) {
        // Success: clear any previous cooldown and return
        modelCooldowns.delete(model);
        console.log(`[AI Service] Successfully generated content with model ${model}`);
        return { text, modelUsed: model };
      }
    } catch (err: any) {
      const { isQuota, isHighDemand, status } = getErrorDetails(err);
      
      if (isQuota) {
        // Quota exceeded: set 10-minute cooldown and immediately switch model without retrying this model
        console.log(`[AI Service] Quota exhausted for ${model} (${status}). Applying cooldown and routing to backup model.`);
        modelCooldowns.set(model, Date.now() + 10 * 60 * 1000);
      } else if (isHighDemand) {
        // High demand 503: set 2-minute cooldown and switch to backup model
        console.log(`[AI Service] High demand on ${model} (${status}). Applying cooldown and routing to backup model.`);
        modelCooldowns.set(model, Date.now() + 2 * 60 * 1000);
      } else {
        console.log(`[AI Service] Unrecoverable error on ${model} (${status}). Trying next model.`);
        modelCooldowns.set(model, Date.now() + 60 * 1000);
      }
    }
  }

  console.log('[AI Service] All remote models are temporarily busy or limited. Engaging built-in preschool template generator.');
  return null;
}

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json({ limit: '10mb' }));

  // Health check
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      hasGeminiKey: !!process.env.GEMINI_API_KEY,
      app: 'KẾ HOẠCH GIÁO DỤC MẦM NON MỚI (QĐ 388/QĐ-BGDĐT)',
      author: 'Nguyễn Văn Phúc',
      zalo: '0949.379.531',
    });
  });

  // AI Generation API Endpoint
  app.post('/api/ai/generate', async (req, res) => {
    try {
      const { prompt, systemInstruction, temperature = 0.7 } = req.body;

      if (!prompt) {
        return res.status(400).json({ error: 'Prompt is required' });
      }

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(200).json({
          success: false,
          error: 'NO_API_KEY',
          message: 'Chưa cấu hình GEMINI_API_KEY trên server. Hệ thống tự động kích hoạt bộ sinh thông minh nội bộ.',
        });
      }

      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const result = await generateWithFallbackAndRetry(ai, prompt, systemInstruction, temperature);

      if (result && result.text) {
        return res.json({
          success: true,
          text: result.text,
          modelUsed: result.modelUsed,
        });
      }

      // If all models hit high demand, return 200 with isHighDemand so frontend falls back without errors
      return res.json({
        success: false,
        isHighDemand: true,
        message: 'Mô hình AI đang có lưu lượng truy cập cao tạm thời (503). Hệ thống đã tự động kích hoạt bộ sinh giáo án thông minh nội bộ chuẩn QĐ 388.',
        text: null,
      });
    } catch (error: any) {
      console.error('Gemini API handler error:', error);
      return res.json({
        success: false,
        error: 'GENERATION_FAILED',
        message: error.message || 'Không thể tạo nội dung từ AI lúc này. Sử dụng bộ sinh nội bộ.',
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
