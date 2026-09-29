import { useState, useCallback, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { getRandomBankQuestions } from './data/questionBank';
import { QuizQuestion, AnswerType, QuizAnswerRecord } from './types/quiz';
import { QuizCard } from './components/QuizCard';
import { FeedbackModal } from './components/FeedbackModal';
import { ResultScreen } from './components/ResultScreen';
import { BlockSandbox } from './components/BlockSandbox';
import { Header } from './components/Header';
import { ReadyScreen } from './components/ReadyScreen';
import { CountdownOverlay } from './components/CountdownOverlay';
import { AILoadingModal } from './components/AILoadingModal';
import { sound } from './utils/sound';

const QUESTION_TIME_LIMIT = 15;

export type GamePhase = 'ready' | 'countdown' | 'playing' | 'completed';

export default function App() {
  const [activeTab, setActiveTab] = useState<'quiz' | 'sandbox'>('quiz');

  // Game phase: starts on 'ready' screen when link is opened
  const [gamePhase, setGamePhase] = useState<GamePhase>('ready');

  // Initialize with randomly sampled questions from bank so questions are never static
  const [questionList, setQuestionList] = useState<QuizQuestion[]>(() => getRandomBankQuestions());
  const [quizSource, setQuizSource] = useState<'gemini' | 'bank'>('bank');

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [answers, setAnswers] = useState<QuizAnswerRecord[]>([]);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);

  // 15-Second Timer State
  const [timeLeft, setTimeLeft] = useState<number>(QUESTION_TIME_LIMIT);

  // Feedback Modal State
  const [isFeedbackOpen, setIsFeedbackOpen] = useState<boolean>(false);
  const [currentUserAnswer, setCurrentUserAnswer] = useState<AnswerType>('O');

  const currentQuestion = questionList[currentIndex];

  const triggerConfetti = (intense = false) => {
    if (intense) {
      // Big celebration fireworks for completion
      const duration = 2.5 * 1000;
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

      const interval = window.setInterval(() => {
        const remaining = animationEnd - Date.now();
        if (remaining <= 0) {
          return clearInterval(interval);
        }
        const particleCount = 50 * (remaining / duration);
        confetti({
          ...defaults,
          particleCount,
          origin: { x: 0.2, y: 0.6 },
          colors: ['#f59e0b', '#10b981', '#6366f1', '#ec4899', '#3b82f6'],
        });
        confetti({
          ...defaults,
          particleCount,
          origin: { x: 0.8, y: 0.6 },
          colors: ['#f59e0b', '#10b981', '#6366f1', '#ec4899', '#3b82f6'],
        });
      }, 250);
    } else {
      // Small burst for single question correct
      confetti({
        particleCount: 45,
        spread: 70,
        origin: { y: 0.65 },
        colors: ['#10b981', '#34d399', '#facc15', '#38bdf8'],
      });
    }
  };

  const handleTimeout = useCallback(() => {
    if (isFeedbackOpen || !currentQuestion || gamePhase !== 'playing') return;

    sound.playTimeout();
    setCurrentUserAnswer('TIMEOUT');

    const newRecord: QuizAnswerRecord = {
      questionId: currentQuestion.id,
      userAnswer: 'TIMEOUT',
      isCorrect: false,
      scoreEarned: 0,
      isTimeout: true,
    };

    setAnswers((prev) => [...prev, newRecord]);
    setIsFeedbackOpen(true);
  }, [currentQuestion, isFeedbackOpen, gamePhase]);

  // 15-Second Timer Countdown Hook - Only active while gamePhase is 'playing'
  useEffect(() => {
    if (activeTab !== 'quiz' || gamePhase !== 'playing' || isFeedbackOpen || isGenerating) {
      return;
    }

    if (timeLeft <= 0) {
      handleTimeout();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          return 0;
        }
        // Subtle urgency ticks on the final 5 seconds
        if (prev <= 6 && prev > 1) {
          sound.playTick();
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [activeTab, gamePhase, isFeedbackOpen, timeLeft, isGenerating, handleTimeout]);

  // User presses Start from Ready Screen: initiates 3-2-1 countdown
  const handleStartFromReady = useCallback(() => {
    sound.playClick();
    setCurrentIndex(0);
    setScore(0);
    setAnswers([]);
    setIsFeedbackOpen(false);
    setTimeLeft(QUESTION_TIME_LIMIT);
    setGamePhase('countdown');
  }, []);

  // Countdown overlay completes: start question 1 with 15s timer
  const handleCountdownComplete = useCallback(() => {
    setTimeLeft(QUESTION_TIME_LIMIT);
    setGamePhase('playing');
  }, []);

  const handleAnswer = (answer: AnswerType) => {
    if (isFeedbackOpen || !currentQuestion || gamePhase !== 'playing') return;

    const isCorrect = answer === currentQuestion.answer;
    setCurrentUserAnswer(answer);

    if (isCorrect) {
      sound.playCorrect();
      setScore((prev) => prev + 100);
      triggerConfetti(false);
    } else {
      sound.playIncorrect();
    }

    const newRecord: QuizAnswerRecord = {
      questionId: currentQuestion.id,
      userAnswer: answer,
      isCorrect,
      scoreEarned: isCorrect ? 100 : 0,
      isTimeout: false,
    };

    setAnswers((prev) => [...prev, newRecord]);
    setIsFeedbackOpen(true);
  };

  const handleNextQuestion = () => {
    setIsFeedbackOpen(false);
    setTimeLeft(QUESTION_TIME_LIMIT); // Reset to fresh 15s for the next question

    if (currentIndex + 1 < questionList.length) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setGamePhase('completed');
      sound.playFanfare();
      triggerConfetti(true);
    }
  };

  // Generate a brand new 10-question set using Gemini AI (3 하, 3 중, 4 상)
  const handleGenerateNewQuiz = useCallback(async (startImmediately = false) => {
    sound.playClick();
    setIsGenerating(true);

    try {
      const response = await fetch('/api/generate-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();

      if (data.success && Array.isArray(data.questions) && data.questions.length === 10) {
        // Ensure difficulties are strictly ordered: 하(3), 중(3), 상(4)
        const sortedQuestions: QuizQuestion[] = data.questions.map((q: QuizQuestion, index: number) => {
          let assignedDiff: '하' | '중' | '상' = '하';
          if (index >= 3 && index < 6) assignedDiff = '중';
          if (index >= 6) assignedDiff = '상';

          return {
            ...q,
            id: index + 1,
            difficulty: assignedDiff,
          };
        });

        setQuestionList(sortedQuestions);
        setQuizSource('gemini');
      } else {
        // Fallback to fresh randomized draw from the question bank
        const freshBank = getRandomBankQuestions();
        setQuestionList(freshBank);
        setQuizSource('bank');
      }
    } catch (err) {
      console.warn('Could not reach Gemini backend, using randomized bank questions:', err);
      const freshBank = getRandomBankQuestions();
      setQuestionList(freshBank);
      setQuizSource('bank');
    } finally {
      setIsGenerating(false);
      setCurrentIndex(0);
      setScore(0);
      setAnswers([]);
      setIsFeedbackOpen(false);
      setTimeLeft(QUESTION_TIME_LIMIT);
      setActiveTab('quiz');

      if (startImmediately) {
        setGamePhase('countdown');
      } else {
        setGamePhase('ready');
      }
    }
  }, []);

  // Instant random shuffle from Question Bank (0ms latency, always fresh)
  const handleShuffleBankQuiz = useCallback((startImmediately = false) => {
    sound.playClick();
    const freshBank = getRandomBankQuestions();
    setQuestionList(freshBank);
    setQuizSource('bank');
    setCurrentIndex(0);
    setScore(0);
    setAnswers([]);
    setIsFeedbackOpen(false);
    setTimeLeft(QUESTION_TIME_LIMIT);
    setActiveTab('quiz');

    if (startImmediately) {
      setGamePhase('countdown');
    } else {
      setGamePhase('ready');
    }
  }, []);

  // Replay current quiz from question 1
  const handleRestartCurrent = useCallback(() => {
    sound.playClick();
    setCurrentIndex(0);
    setScore(0);
    setAnswers([]);
    setIsFeedbackOpen(false);
    setTimeLeft(QUESTION_TIME_LIMIT);
    setGamePhase('countdown');
  }, []);

  // Return to ready screen from anywhere
  const handleGoToReady = useCallback(() => {
    sound.playClick();
    setIsFeedbackOpen(false);
    setGamePhase('ready');
  }, []);

  const handleRetryIncorrect = useCallback(() => {
    sound.playClick();
    const wrongIds = answers.filter((a) => !a.isCorrect).map((a) => a.questionId);
    const wrongQuestions = questionList.filter((q) => wrongIds.includes(q.id));

    if (wrongQuestions.length > 0) {
      setQuestionList(wrongQuestions);
      setCurrentIndex(0);
      setScore(0);
      setAnswers([]);
      setIsFeedbackOpen(false);
      setTimeLeft(QUESTION_TIME_LIMIT);
      setGamePhase('countdown');
    }
  }, [answers, questionList]);

  const handleToggleSound = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    sound.setMuted(nextMuted);
  };

  return (
    <div className="min-h-screen bg-linear-to-b from-amber-100/70 via-orange-50/50 to-amber-50 flex flex-col">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isMuted={isMuted}
        onToggleSound={handleToggleSound}
        onResetQuiz={handleGoToReady}
        onGenerateNewQuiz={() => handleGenerateNewQuiz(false)}
        onShuffleBankQuiz={() => handleShuffleBankQuiz(false)}
        onGoToReady={handleGoToReady}
        isGenerating={isGenerating}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-5xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-10 flex flex-col items-center justify-center">
        {activeTab === 'quiz' ? (
          gamePhase === 'ready' ? (
            <ReadyScreen
              quizSource={quizSource}
              onStartQuiz={handleStartFromReady}
              onGenerateGeminiQuiz={() => handleGenerateNewQuiz(false)}
              onShuffleBankQuiz={() => handleShuffleBankQuiz(false)}
              onOpenSandbox={() => setActiveTab('sandbox')}
              isGenerating={isGenerating}
            />
          ) : gamePhase === 'completed' ? (
            <ResultScreen
              score={score}
              totalQuestions={questionList.length}
              answers={answers}
              questions={questionList}
              onRestart={handleRestartCurrent}
              onRetryIncorrect={handleRetryIncorrect}
              onOpenSandbox={() => setActiveTab('sandbox')}
              onGenerateNewQuiz={() => handleGenerateNewQuiz(true)}
              onShuffleBankQuiz={() => handleShuffleBankQuiz(true)}
              isGenerating={isGenerating}
            />
          ) : (
            currentQuestion && (
              <QuizCard
                question={currentQuestion}
                currentIndex={currentIndex}
                totalQuestions={questionList.length}
                score={score}
                timeLeft={timeLeft}
                maxTime={QUESTION_TIME_LIMIT}
                quizSource={quizSource}
                onAnswer={handleAnswer}
                disabled={isFeedbackOpen || timeLeft <= 0 || isGenerating || gamePhase === 'countdown'}
              />
            )
          )
        ) : (
          <div className="w-full">
            <BlockSandbox />
          </div>
        )}
      </main>

      {/* 3, 2, 1 Countdown Animation Overlay */}
      {gamePhase === 'countdown' && (
        <CountdownOverlay onComplete={handleCountdownComplete} />
      )}

      {/* Answer Feedback Modal */}
      {currentQuestion && (
        <FeedbackModal
          isOpen={isFeedbackOpen}
          isCorrect={currentUserAnswer === currentQuestion.answer}
          userAnswer={currentUserAnswer}
          question={currentQuestion}
          isLastQuestion={currentIndex + 1 === questionList.length}
          isTimeout={currentUserAnswer === 'TIMEOUT'}
          onNext={handleNextQuestion}
        />
      )}

      {/* AI Loading Modal */}
      <AILoadingModal isOpen={isGenerating} />

      {/* Footer */}
      <footer className="w-full py-4 text-center text-xs font-bold text-slate-500 border-t border-amber-200 bg-white/50">
        보림초 6학년 2반 수학 · 2단원 공간과 입체 OX 퀴즈 (준비화면 & 3초 카운트다운 시작 시스템)
      </footer>
    </div>
  );
}
