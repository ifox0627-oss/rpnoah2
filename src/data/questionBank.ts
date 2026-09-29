import { QuizQuestion } from '../types/quiz';

// 6학년 2학기 2단원 [공간과 입체] 대규모 문제은행 풀
export const QUESTION_BANK: {
  easy: QuizQuestion[];
  medium: QuizQuestion[];
  hard: QuizQuestion[];
} = {
  // --- 난이도: 하 (기초 개념 풀) ---
  easy: [
    {
      id: 1,
      question: "어느 방향(위, 앞, 옆)에서 보았는지에 따라 쌓기나무 모양이 다르게 보일 수 있다.",
      answer: "O",
      difficulty: "하",
      conceptTitle: "보는 방향에 따른 모양",
      explanation:
        "맞아요! 같은 쌓기나무 모양이라도 위에서 내려다볼 때, 앞에서 볼 때, 옆에서 볼 때 보이는 모양이 각각 달라질 수 있어요.",
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
        "맞아요! 위에서 내려다본 모든 칸은 1층 바닥에 쌓기나무가 놓여 있는 자리와 완전히 일치해요.",
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
        "아니에요! 쌓기나무는 중력 때문에 공중에 뜰 수 없어요. 2층에 블록을 놓으려면 반드시 그 바로 아래(1층)에 받쳐주는 쌓기나무가 있어야 해요.",
      keyTakeaway: "위층에 쌓기나무가 있으려면 반드시 그 바로 아래층에도 쌓기나무가 있어야 합니다.",
      diagramType: "gravity_support",
    },
    {
      id: 4,
      question: "쌓기나무 1개는 모든 면이 정사각형인 '정육면체' 모양이다.",
      answer: "O",
      difficulty: "하",
      conceptTitle: "쌓기나무의 기본 형태",
      explanation:
        "맞아요! 초등학교 수학에서 사용하는 쌓기나무는 6개의 면이 모두 합동인 정사각형으로 이루어진 정육면체예요.",
      keyTakeaway: "쌓기나무의 기본 블록은 모든 모서리 길이가 같은 정육면체입니다.",
      diagramType: "views_comparison",
    },
    {
      id: 5,
      question: "1층에 쌓기나무가 4개 놓여 있다면, 위에서 본 모양도 4칸으로 보인다.",
      answer: "O",
      difficulty: "하",
      conceptTitle: "1층과 위에서 본 모양",
      explanation:
        "맞아요! 위에서 보면 바닥 1층에 놓인 자리가 그대로 보이므로, 1층에 4개가 놓여 있다면 위에서 본 모양도 4칸이 됩니다.",
      keyTakeaway: "위에서 본 모양의 칸 수는 1층 바닥에 깔린 쌓기나무 개수와 동일합니다.",
      diagramType: "bottom_matching",
    },
    {
      id: 6,
      question: "쌓기나무 2개로 만들 수 있는 서로 다른 입체 모양은 돌려보아도 오직 1가지뿐이다.",
      answer: "O",
      difficulty: "하",
      conceptTitle: "쌓기나무 2개로 만드는 모양",
      explanation:
        "맞아요! 쌓기나무 2개를 맞붙이면 세우거나 눕혀도 돌리면 같은 1가지 모양(직사각형 기둥)만 만들어집니다.",
      keyTakeaway: "돌려서 같은 모양이 되는 것은 서로 같은 모양으로 취급합니다.",
      diagramType: "four_block_shapes",
    },
    {
      id: 7,
      question: "앞에서 본 모양만으로 쌓기나무가 앞뒤로 몇 칸 놓여 있는지 정확히 알 수 있다.",
      answer: "X",
      difficulty: "하",
      conceptTitle: "앞에서 본 모양의 한계",
      explanation:
        "틀려요! 앞에서 보면 앞뒤 깊이를 알 수 없기 때문에, 뒤쪽으로 쌓기나무가 얼마나 길게 놓여 있는지는 위나 옆에서 보아야 알 수 있어요.",
      keyTakeaway: "앞에서 본 모양은 좌우 폭과 높이만 보여주며 앞뒤 깊이는 가려집니다.",
      diagramType: "front_vs_side",
    },
    {
      id: 8,
      question: "쌓기나무를 3층까지 쌓으려면, 최소한 1층과 2층에도 각각 1개 이상의 쌓기나무가 있어야 한다.",
      answer: "O",
      difficulty: "하",
      conceptTitle: "3층 쌓기 조건",
      explanation:
        "맞아요! 3층에 닿으려면 1층과 2층이 차례대로 밑을 받쳐주어야 하므로 최소 1개씩 필요합니다.",
      keyTakeaway: "층수만큼 아래층이 기둥처럼 받쳐주어야 위층을 쌓을 수 있어요.",
      diagramType: "gravity_support",
    },
  ],

  // --- 난이도: 중 (응용 개념 풀) ---
  medium: [
    {
      id: 9,
      question: "쌓기나무를 '위에서 본 모양'만 알면 전체 쌓기나무 개수를 정확히 알 수 있다.",
      answer: "X",
      difficulty: "중",
      conceptTitle: "위에서 본 모양과 층수 한계",
      explanation:
        "아니에요! 위에서 본 모양만으로는 각 자리에 쌓인 블록이 1층인지 2층인지 3층인지 알 수 없어서 정확한 개수를 맞힐 수 없어요.",
      keyTakeaway: "위에서 본 모양은 바닥 자리만 알려줄 뿐, 몇 층까지 쌓였는지는 알 수 없어요.",
      diagramType: "top_view_only",
    },
    {
      id: 10,
      question: "위에서 본 모양의 각 자리에 쌓인 개수(층수)를 쓰면 전체 개수를 정확히 알 수 있다.",
      answer: "O",
      difficulty: "중",
      conceptTitle: "위에서 본 모양에 수를 쓰는 방법",
      explanation:
        "맞아요! 위에서 본 모양의 각 칸에 쌓인 층수(1, 2, 3...)를 숫자로 적어놓고 모두 더하면 숨은 쌓기나무 없이 총개수를 100% 알 수 있어요!",
      keyTakeaway: "각 자리에 적힌 수를 모두 더하면 쌓기나무의 총개수를 오차 없이 구할 수 있어요.",
      diagramType: "numbered_grid",
    },
    {
      id: 11,
      question: "1층, 2층, 3층처럼 '층별로 나타낸 모양'을 보면 쌓기나무의 전체 개수를 알 수 있다.",
      answer: "O",
      difficulty: "중",
      conceptTitle: "층별로 나타낸 모양",
      explanation:
        "맞아요! 1층 모양, 2층 모양, 3층 모양을 각각 따로 그려놓으면 각 층에 놓인 쌓기나무 개수를 세어서 합칠 수 있어요.",
      keyTakeaway: "각 층별(1층, 2층, 3층...)로 분리해서 보면 쌓기나무 개수를 손쉽게 셀 수 있어요.",
      diagramType: "layers",
    },
    {
      id: 12,
      question: "층별로 나타낸 모양에서 2층의 쌓기나무 개수가 1층의 쌓기나무 개수보다 더 많을 수 있다.",
      answer: "X",
      difficulty: "중",
      conceptTitle: "층별 개수의 관계",
      explanation:
        "틀려요! 2층 쌓기나무는 반드시 1층 쌓기나무 위에만 얹을 수 있으므로, 2층 개수는 1층 개수를 절대 초과할 수 없어요.",
      keyTakeaway: "위층의 쌓기나무 개수는 아래층의 쌓기나무 개수보다 많을 수 없습니다.",
      diagramType: "gravity_support",
    },
    {
      id: 13,
      question: "쌓기나무 3개로 만들 수 있는 서로 다른 모양은 '일자형(ㅡ)'과 'ㄱ자형' 총 2가지이다.",
      answer: "O",
      difficulty: "중",
      conceptTitle: "쌓기나무 3개로 만드는 모양",
      explanation:
        "맞아요! 쌓기나무 3개를 연결하면 일렬로 길쭉한 모양(1가지)과 꺾인 ㄱ자 모양(1가지)으로 오직 2가지 형태만 나옵니다.",
      keyTakeaway: "쌓기나무 3개로 만들 수 있는 모양은 돌렸을 때 같은 것을 제외하면 총 2가지입니다.",
      diagramType: "four_block_shapes",
    },
    {
      id: 14,
      question: "위에서 본 모양의 3개 칸에 숫자가 각각 [2, 1, 3]이라고 적혀 있다면 전체 개수는 6개이다.",
      answer: "O",
      difficulty: "중",
      conceptTitle: "수 쓰기 방법의 개수 셈",
      explanation:
        "맞아요! 2 + 1 + 3 = 6이므로, 각 자리에 적힌 수를 모두 더하면 총 6개가 됩니다.",
      keyTakeaway: "위에서 본 모양에 적힌 수를 모두 더한 값이 전체 쌓기나무 개수가 됩니다.",
      diagramType: "numbered_grid",
    },
    {
      id: 15,
      question: "각 층별 쌓기나무가 1층 4개, 2층 2개, 3층 1개라면 전체 쌓기나무의 수는 8개이다.",
      answer: "X",
      difficulty: "중",
      conceptTitle: "층별 개수 합산",
      explanation:
        "틀려요! 4 + 2 + 1 = 7개입니다. 8개가 아니라 7개예요!",
      keyTakeaway: "층별 개수를 더할 때 1층(4) + 2층(2) + 3층(1) = 7개로 정확히 덧셈해야 합니다.",
      diagramType: "layers",
    },
    {
      id: 16,
      question: "앞에서 본 모양의 칸 수는 사용된 쌓기나무의 전체 개수와 항상 똑같다.",
      answer: "X",
      difficulty: "중",
      conceptTitle: "앞에서 본 모양과 전체 개수의 차이",
      explanation:
        "틀려요! 앞에서 볼 때는 같은 줄의 앞뒤 쌓기나무가 겹쳐서 가려지기 때문에, 보이는 칸 수보다 실제 전체 개수가 훨씬 많을 수 있어요.",
      keyTakeaway: "앞이나 옆에서 볼 때는 앞뒤로 겹친 쌓기나무가 가려져 전체 개수와 다릅니다.",
      diagramType: "front_vs_side",
    },
  ],

  // --- 난이도: 상 (심화 추론 풀) ---
  hard: [
    {
      id: 17,
      question: "쌓기나무로 쌓은 모양을 '앞'에서 본 모양과 '옆'에서 본 모양은 항상 똑같다.",
      answer: "X",
      difficulty: "상",
      conceptTitle: "앞과 옆의 시선 비교",
      explanation:
        "틀려요! 앞에서 볼 때와 옆에서 볼 때 각 줄에서 가장 높은 층의 높이가 서로 다를 수 있기 때문에, 앞과 옆에서 본 모양은 다를 수 있어요.",
      keyTakeaway: "앞에서 본 모양과 옆에서 본 모양은 각 방향의 최고 층수에 따라 달라질 수 있어요.",
      diagramType: "front_vs_side",
    },
    {
      id: 18,
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
      id: 19,
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
      id: 20,
      question: "쌓기나무 4개로 만들 수 있는 서로 다른 입체 모양은 오직 1가지뿐이다.",
      answer: "X",
      difficulty: "상",
      conceptTitle: "여러 가지 입체 모양의 구성",
      explanation:
        "틀려요! 쌓기나무 4개를 이용하면 일자형(1×4), L자형, T자형, 번개 모양, 2층 계단형 등 무려 8가지 이상의 서로 다른 모양을 만들 수 있어요!",
      keyTakeaway: "같은 개수의 쌓기나무라도 이어 붙이는 위치와 층에 따라 다양한 모양을 만들 수 있어요.",
      diagramType: "four_block_shapes",
    },
    {
      id: 21,
      question: "위, 앞, 옆 모양이 주어졌을 때 사용된 쌓기나무의 '최소 개수'와 '최대 개수'가 서로 다를 수 있다.",
      answer: "O",
      difficulty: "상",
      conceptTitle: "최소 개수와 최대 개수",
      explanation:
        "맞아요! 숨겨진 자리가 있는 경우, 그 자리에 쌓기나무를 놓지 않았을 때가 최소 개수, 꽉 채워 놓았을 때가 최대 개수가 되어 서로 달라질 수 있어요.",
      keyTakeaway: "숨은 자리가 생기면 모양에 따라 필요한 쌓기나무의 최소 개수와 최대 개수에 차이가 납니다.",
      diagramType: "hidden_blocks",
    },
    {
      id: 22,
      question: "위에서 본 모양의 칸 수가 4칸이고 최고 높이가 2층이라면, 필요한 쌓기나무의 최소 개수는 4개이다.",
      answer: "X",
      difficulty: "상",
      conceptTitle: "최고 높이와 최소 개수 계산",
      explanation:
        "틀려요! 4칸 모두 1층이면 4개지만, 최고 높이가 2층이므로 적어도 한 칸은 2층이어야 해요. 따라서 최소 개수는 2 + 1 + 1 + 1 = 5개입니다!",
      keyTakeaway: "최고 층수가 2층이라면 적어도 한 칸은 2개 이상 쌓여 있어야 하므로 4개가 될 수 없어요.",
      diagramType: "numbered_grid",
    },
    {
      id: 23,
      question: "숨겨진 자리에 쌓기나무가 있는지 없는지 100% 확실하게 파악하는 가장 좋은 방법은 '위에서 본 모양에 수를 쓰는 방법'이다.",
      answer: "O",
      difficulty: "상",
      conceptTitle: "가장 정확한 표현 방법",
      explanation:
        "맞아요! 위에서 본 모양의 모든 칸에 쌓인 숫자를 직접 적어두면 어떤 자리도 숨겨지지 않아 완벽하게 형태와 개수를 알 수 있어요.",
      keyTakeaway: "위에서 본 모양에 수를 쓰는 방법은 숨은 자리 없이 쌓기나무를 가장 정확히 나타냅니다.",
      diagramType: "numbered_grid",
    },
    {
      id: 24,
      question: "앞에서 본 모양이 2층 2칸이고 옆에서 본 모양도 2층 2칸이라면, 사용된 쌓기나무는 무조건 4개로 고정된다.",
      answer: "X",
      difficulty: "상",
      conceptTitle: "앞과 옆 모양의 다양성",
      explanation:
        "틀려요! 앞과 옆 모양이 같아도 바닥 배치와 겹침에 따라 3개, 4개, 5개 등 다양한 개수로 쌓을 수 있어요.",
      keyTakeaway: "앞과 옆 모양만으로는 쌓기나무의 개수를 단 하나로 확정할 수 없습니다.",
      diagramType: "front_vs_side",
    },
  ],
};

// Shuffles an array using Fisher-Yates
function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

// Generates a randomized 10-question set: exactly 3 [하], 3 [중], 4 [상]
export function getRandomBankQuestions(): QuizQuestion[] {
  const selectedEasy = shuffle(QUESTION_BANK.easy).slice(0, 3);
  const selectedMed = shuffle(QUESTION_BANK.medium).slice(0, 3);
  const selectedHard = shuffle(QUESTION_BANK.hard).slice(0, 4);

  const combined = [...selectedEasy, ...selectedMed, ...selectedHard];

  return combined.map((q, idx) => ({
    ...q,
    id: idx + 1,
    difficulty: (idx < 3 ? '하' : idx < 6 ? '중' : '상') as '하' | '중' | '상',
  }));
}
