export type AnswerType = 'O' | 'X' | 'TIMEOUT';

export type DifficultyLevel = '하' | '중' | '상';

export interface QuizQuestion {
  id: number;
  question: string;
  answer: 'O' | 'X';
  difficulty: DifficultyLevel;
  conceptTitle: string;
  explanation: string;
  keyTakeaway: string;
  diagramType:
    | 'views_comparison'
    | 'top_view_only'
    | 'numbered_grid'
    | 'front_vs_side'
    | 'layers'
    | 'bottom_matching'
    | 'gravity_support'
    | 'max_height_sightline'
    | 'hidden_blocks'
    | 'four_block_shapes';
}

export interface QuizAnswerRecord {
  questionId: number;
  userAnswer: AnswerType;
  isCorrect: boolean;
  scoreEarned: number;
  isTimeout?: boolean;
}
