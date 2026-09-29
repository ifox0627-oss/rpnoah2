import { QuizQuestion } from '../types/quiz';

// Fallback high-quality curated question set following 3 하, 3 중, 4 상 structure
export const QUIZ_QUESTIONS: QuizQuestion[] = [
  // --- 난이도: 하 (1 ~ 3번: 3문제) ---
  {
    id: 1,
    question: "어느 방향(위, 앞, 옆)에서 보았는지에 따라 쌓기나무 모양이 다르게 보일 수 있다.",
    answer: "O",
    difficulty: "하",
    conceptTitle: "보는 방향에 따른 모양",
    explanation:
      "맞아요! 같은 쌓기나무 모양이라도 위에서 내려다볼 때, 앞에서 똑바로 볼 때, 오른쪽 옆에서 볼 때 보이는 모양이 각각 다를 수 있어요.",
    keyTakeaway: "보는 위치(위·앞·옆)에 따라 서로 다른 2차원 평면 모양으로 관찰됩니다.",
    diagramType: "views_comparison",
  },
  {
    id: 2,
    question: "위에서 내려다본 모양은 쌓기나무 '1층'의 바닥 모양과 똑같다.",
    answer: "O",
    difficulty: "하",
    conceptTitle: "위에서 본 모양과 1층 바닥",
    explanation:
      "맞아요! 위에서 내려다본 격자 자리는 모두 1층 바닥에 쌓기나무가 놓여 있는 자리와 완전히 같아요.",
    keyTakeaway: "위에서 본 모양의 칸 수 = 1층에 놓인 쌓기나무의 개수입니다.",
    diagramType: "bottom_matching",
  },
  {
    id: 3,
    question: "쌓기나무를 2층에 올릴 때, 1층에 아무것도 없어도 공중에 띄워 놓을 수 있다.",
    answer: "X",
    difficulty: "하",
    conceptTitle: "쌓기나무 쌓기의 기본 규칙",
    explanation:
      "아니에요! 쌓기나무는 중력 때문에 공중에 떠 있을 수 없어요. 2층이나 3층에 쌓기나무를 놓으려면 반드시 그 바로 아래층에 받쳐주는 쌓기나무가 있어야만 해요.",
    keyTakeaway: "위층에 쌓기나무가 있다면, 반드시 그 아래층(1층)에도 쌓기나무가 채워져 있어야 해요.",
    diagramType: "gravity_support",
  },

  // --- 난이도: 중 (4 ~ 6번: 3문제) ---
  {
    id: 4,
    question: "쌓기나무를 '위에서 본 모양'만 알면 전체 쌓기나무 개수를 정확히 알 수 있다.",
    answer: "X",
    difficulty: "중",
    conceptTitle: "위에서 본 모양과 층수 한계",
    explanation:
      "아니에요! 위에서 본 모양만으로는 각 자리에 쌓기나무가 1층인지, 2층인지, 3층인지 알 수 없기 때문에 전체 개수를 정확히 알아맞힐 수 없어요.",
    keyTakeaway: "위에서 본 모양은 바닥 자리만 알려줄 뿐, 몇 층까지 쌓였는지는 알 수 없어요.",
    diagramType: "top_view_only",
  },
  {
    id: 5,
    question: "위에서 본 모양의 각 자리에 쌓인 개수(층수)를 쓰면 전체 개수를 정확히 알 수 있다.",
    answer: "O",
    difficulty: "중",
    conceptTitle: "위에서 본 모양에 수를 쓰는 방법",
    explanation:
      "맞아요! 위에서 본 모양의 각 칸에 쌓인 층수(1, 2, 3...)를 숫자로 적어놓고 모두 더하면 숨은 쌓기나무 없이 정확한 개수와 모양을 100% 알 수 있어요!",
    keyTakeaway: "각 자리에 적힌 수를 모두 더하면 쌓기나무의 총개수를 오차 없이 구할 수 있어요.",
    diagramType: "numbered_grid",
  },
  {
    id: 6,
    question: "1층, 2층, 3층처럼 '층별로 나타낸 모양'을 보면 쌓기나무의 전체 개수를 알 수 있다.",
    answer: "O",
    difficulty: "중",
    conceptTitle: "층별로 나타낸 모양",
    explanation:
      "맞아요! 1층 모양, 2층 모양, 3층 모양을 각각 따로 그려놓으면 각 층에 놓인 쌓기나무 개수를 세어서 합칠 수 있으므로 전체 개수와 입체 모양을 정확히 알 수 있어요.",
    keyTakeaway: "각 층별(1층, 2층, 3층...)로 분리해서 보면 쌓기나무 개수를 손쉽게 셀 수 있어요.",
    diagramType: "layers",
  },

  // --- 난이도: 상 (7 ~ 10번: 4문제) ---
  {
    id: 7,
    question: "쌓기나무로 쌓은 모양을 '앞'에서 본 모양과 '옆'에서 본 모양은 항상 똑같다.",
    answer: "X",
    difficulty: "상",
    conceptTitle: "앞과 옆의 시선 비교",
    explanation:
      "틀려요! 앞에서 볼 때와 옆에서 볼 때 각 줄에서 가장 높은 층의 높이가 서로 다를 수 있기 때문에, 앞과 옆에서 본 모양은 다를 수 있어요. (대칭인 특별한 경우를 제외하고는 서로 달라요)",
    keyTakeaway: "앞에서 본 모양과 옆에서 본 모양은 각 방향의 최고 층수에 따라 달라질 수 있어요.",
    diagramType: "front_vs_side",
  },
  {
    id: 8,
    question: "앞에서 보았을 때 보이는 칸의 수는 각 줄에서 '가장 높은 층'의 수와 같다.",
    answer: "O",
    difficulty: "상",
    conceptTitle: "시선과 최고 높이의 원리",
    explanation:
      "맞아요! 앞에서 볼 때 뒤쪽에 있는 낮은 쌓기나무는 앞의 높은 쌓기나무에 가려지기 때문에, 그 줄에서 '가장 높은 층'의 높이만큼만 눈에 보이게 돼요.",
    keyTakeaway: "앞이나 옆에서 볼 때는 각 줄에서 '가장 높은 층'의 칸 수만 보입니다.",
    diagramType: "max_height_sightline",
  },
  {
    id: 9,
    question: "위, 앞, 옆에서 본 모양이 모두 주어지더라도 쌓은 모양이 2가지 이상 가능한 경우가 있다.",
    answer: "O",
    difficulty: "상",
    conceptTitle: "보이지 않는 숨은 자리 추론",
    explanation:
      "맞아요! 높은 쌓기나무 뒤편에 가려진 '숨은 자리'가 있다면, 위·앞·옆 모양이 완전히 일치하더라도 쌓기나무가 있는 경우와 없는 경우 등 모양이 2가지 이상 나올 수 있어요.",
    keyTakeaway: "위, 앞, 옆 모양만으로는 숨겨진 자리가 생길 수 있어 모양이 한 가지로 정해지지 않을 때가 있어요.",
    diagramType: "hidden_blocks",
  },
  {
    id: 10,
    question: "쌓기나무 4개로 만들 수 있는 서로 다른 입체 모양은 오직 1가지뿐이다.",
    answer: "X",
    difficulty: "상",
    conceptTitle: "여러 가지 입체 모양의 구성",
    explanation:
      "틀려요! 쌓기나무 4개를 이용하면 일자형(1×4), L자형(ㄱ자 모양), T자형, 번개 모양, 2층 계단형 등 무려 8가지 이상의 서로 다른 모양을 만들 수 있어요!",
    keyTakeaway: "같은 개수의 쌓기나무라도 이어 붙이는 위치와 층에 따라 다양한 모양을 만들 수 있어요.",
    diagramType: "four_block_shapes",
  },
];
