import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Gemini Client initialization
const apiKey = process.env.GEMINI_API_KEY;
let ai: GoogleGenAI | null = null;

if (apiKey) {
  ai = new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// API endpoint to generate 10 questions with progressive difficulty (3 하, 3 중, 4 상)
app.post('/api/generate-quiz', async (_req, res) => {
  try {
    if (!ai) {
      return res.status(200).json({
        success: false,
        source: 'bank',
        message: 'GEMINI_API_KEY가 없어 문제은행에서 무작위 10문제를 출제합니다.',
      });
    }

    const prompt = `초등학교 6학년 수학 2학기 2단원 [공간과 입체] 단원의 OX 퀴즈 문제 10개를 새로 만들어주세요.
학생들이 보림초 6학년 2반 초등학생이므로 이해하기 쉬운 맑고 친절한 문장으로 만들어주세요.

[매우 중요한 난이도 설계 규칙]:
1. 1번 ~ 3번 (총 3문제): 난이도 '하' (기초 개념 - 보는 방향 위/앞/옆에 따른 차이, 1층 바닥과 위에서 본 모양의 일치, 공중에 뜰 수 없는 쌓기나무의 물리적 규칙 등)
2. 4번 ~ 6번 (총 3문제): 난이도 '중' (응용 개념 - 위에서 본 모양에 수를 쓰는 방법, 층별로 1층/2층/3층 나타낸 모양으로 개수 구하기, 위에서 본 모양만으로는 층수를 알 수 없다는 점 등)
3. 7번 ~ 10번 (총 4문제): 난이도 '상' (심화 추론 - 앞/옆에서 본 모양의 최고 층수 비교, 숨은 쌓기나무가 존재하여 모양이 2가지 이상 가능한 상황, 4개 또는 5개 쌓기나무로 만드는 여러 가지 입체 모양의 특징 등)

[정답 균형]:
O와 X가 골고루 섞이도록 해주세요 (O 약 5개, X 약 5개).

각 문제마다 다음 정보를 채워주세요:
- id: 1부터 10까지의 숫자
- difficulty: '하', '중', '상' 중 하나 (1~3번은 '하', 4~6번은 '중', 7~10번은 '상')
- question: 초등학생이 명확하게 O/X를 판단할 수 있는 퀴즈 문장
- answer: 'O' 또는 'X'
- conceptTitle: 2~4단어의 단원 개념 명칭 (예: "보는 방향에 따른 모양", "숨은 자리 추론")
- explanation: 왜 O인지 또는 왜 X인지 초등학생 눈높이에서 알기 쉽게 풀어쓴 친절한 2~3문장 해설
- keyTakeaway: 한 줄로 요약한 핵심 개념 팁
- diagramType: 아래 10가지 중 가장 잘 맞는 것을 1개 선택
  ['views_comparison', 'top_view_only', 'numbered_grid', 'front_vs_side', 'layers', 'bottom_matching', 'gravity_support', 'max_height_sightline', 'hidden_blocks', 'four_block_shapes']`;

    // Try gemini-3.1-flash-lite first, then fallback to gemini-flash-latest
    const modelsToTry = ['gemini-3.1-flash-lite', 'gemini-flash-latest'];
    let lastError: unknown = null;

    for (const model of modelsToTry) {
      try {
        const response = await ai.models.generateContent({
          model,
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
            responseSchema: {
              type: Type.OBJECT,
              properties: {
                questions: {
                  type: Type.ARRAY,
                  items: {
                    type: Type.OBJECT,
                    properties: {
                      id: { type: Type.INTEGER },
                      difficulty: { type: Type.STRING },
                      question: { type: Type.STRING },
                      answer: { type: Type.STRING },
                      conceptTitle: { type: Type.STRING },
                      explanation: { type: Type.STRING },
                      keyTakeaway: { type: Type.STRING },
                      diagramType: { type: Type.STRING },
                    },
                    required: [
                      'id',
                      'difficulty',
                      'question',
                      'answer',
                      'conceptTitle',
                      'explanation',
                      'keyTakeaway',
                      'diagramType',
                    ],
                  },
                },
              },
              required: ['questions'],
            },
          },
        });

        const jsonText = response.text?.trim() || '{}';
        const parsed = JSON.parse(jsonText);

        if (parsed.questions && Array.isArray(parsed.questions) && parsed.questions.length === 10) {
          return res.status(200).json({
            success: true,
            source: 'gemini',
            model,
            questions: parsed.questions,
          });
        }
      } catch (err) {
        lastError = err;
        console.warn(`Model ${model} failed, trying next fallback:`, err);
      }
    }

    // If both models failed
    return res.status(200).json({
      success: false,
      source: 'bank',
      message: 'Gemini 실시간 출제 일시 지연으로 문제은행 무작위 출제로 전환합니다.',
      error: String(lastError),
    });
  } catch (error) {
    console.error('Gemini generate-quiz unexpected error:', error);
    return res.status(200).json({
      success: false,
      source: 'bank',
      message: '문제은행 무작위 10문제로 출제합니다.',
    });
  }
});

// Mount Vite middleware in development or serve static in production
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true, hmr: process.env.DISABLE_HMR !== 'true' },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
}

startServer();
