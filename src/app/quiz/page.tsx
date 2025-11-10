'use client';

import { useState } from 'react';
import Image from 'next/image';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import {
  quizQuestions,
  quizCategories,
  getQuizzesByCategory,
  getRandomQuizzes,
  type QuizQuestion,
} from '@/data/quizzes';
import {
  MdQuiz,
  MdMusicNote,
  MdCheckCircle,
  MdCancel,
  MdRefresh,
  MdEmojiEvents,
  MdPlayArrow,
} from 'react-icons/md';

export default function QuizPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [quizMode, setQuizMode] = useState<'select' | 'playing'>('select');
  const [currentQuizzes, setCurrentQuizzes] = useState<QuizQuestion[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>([]);

  const startQuiz = (category: string) => {
    const quizzes = category === 'random'
      ? getRandomQuizzes(5)
      : getQuizzesByCategory(category).slice(0, 5);

    setCurrentQuizzes(quizzes);
    setCurrentQuestionIndex(0);
    setScore(0);
    setAnsweredQuestions(new Array(quizzes.length).fill(false));
    setQuizMode('playing');
    setSelectedAnswer(null);
    setShowResult(false);
  };

  const handleAnswerSelect = (answerIndex: number) => {
    if (showResult) return;
    setSelectedAnswer(answerIndex);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    const currentQuestion = currentQuizzes[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

    if (isCorrect) {
      setScore(score + 1);
    }

    const newAnswered = [...answeredQuestions];
    newAnswered[currentQuestionIndex] = true;
    setAnsweredQuestions(newAnswered);
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < currentQuizzes.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const handleRestartQuiz = () => {
    setQuizMode('select');
    setCurrentQuizzes([]);
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setAnsweredQuestions([]);
  };

  const isQuizComplete = answeredQuestions.every((answered) => answered);

  return (
    <>
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/o/quiz001.jpg"
            alt="Mozart Quiz"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/50"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-purple-900/40 to-indigo-900/40"></div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center px-4 relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600/90 backdrop-blur-sm rounded-full mb-6">
              <MdQuiz className="h-5 w-5 text-white" />
              <span className="text-white text-sm font-bold">모차르트 퀴즈</span>
            </div>

            <h1 className="font-serif text-5xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl">
              모차르트를
              <br />
              <span className="text-purple-300">얼마나 아시나요?</span>
            </h1>

            <p className="text-xl text-gray-200 mb-8 max-w-2xl mx-auto leading-relaxed">
              음악 감상부터 생애, 작품까지!
              <br />
              재미있는 퀴즈로 모차르트 박사가 되어보세요
            </p>

            {quizMode === 'select' && (
              <button
                onClick={() => startQuiz('random')}
                className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold text-lg transition-all shadow-xl hover:scale-105 flex items-center gap-2 mx-auto"
              >
                <MdPlayArrow className="h-7 w-7" />
                랜덤 퀴즈 시작하기
              </button>
            )}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-950 to-transparent"></div>
      </section>

      {/* Quiz Content */}
      <section className="bg-gray-950 py-12">
        <div className="container mx-auto px-4 md:px-8">
          {quizMode === 'select' ? (
            <>
              {/* Category Selection */}
              <div className="text-center mb-12">
                <h2 className="text-white text-3xl font-bold mb-4">
                  카테고리를 선택하세요
                </h2>
                <p className="text-gray-400">
                  원하는 주제의 퀴즈를 풀어보세요!
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
                {quizCategories
                  .filter((cat) => cat.id !== 'all')
                  .map((category) => {
                    const categoryQuizzes = getQuizzesByCategory(category.id);
                    return (
                      <button
                        key={category.id}
                        onClick={() => startQuiz(category.id)}
                        className="group bg-gradient-to-br from-purple-900/50 to-indigo-900/50 hover:from-purple-800/60 hover:to-indigo-800/60 rounded-2xl p-8 transition-all duration-300 hover:scale-105 border border-purple-700/30 hover:border-purple-500/50"
                      >
                        <div className="text-5xl mb-4">
                          {category.id === 'music' && '🎵'}
                          {category.id === 'life' && '👨‍🎨'}
                          {category.id === 'works' && '📜'}
                          {category.id === 'trivia' && '💡'}
                        </div>
                        <h3 className="text-white text-xl font-bold mb-2">
                          {category.label}
                        </h3>
                        <p className="text-purple-300 text-sm">
                          {categoryQuizzes.length}개의 문제
                        </p>
                      </button>
                    );
                  })}

                {/* Random Quiz Option */}
                <button
                  onClick={() => startQuiz('random')}
                  className="group bg-gradient-to-br from-amber-900/50 to-orange-900/50 hover:from-amber-800/60 hover:to-orange-800/60 rounded-2xl p-8 transition-all duration-300 hover:scale-105 border border-amber-700/30 hover:border-amber-500/50"
                >
                  <div className="text-5xl mb-4">🎲</div>
                  <h3 className="text-white text-xl font-bold mb-2">
                    랜덤 퀴즈
                  </h3>
                  <p className="text-amber-300 text-sm">
                    다양한 주제의 5문제
                  </p>
                </button>
              </div>
            </>
          ) : (
            <>
              {/* Quiz Playing Mode */}
              {!isQuizComplete ? (
                <div className="max-w-3xl mx-auto">
                  {/* Progress */}
                  <div className="mb-8">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-400 text-sm">
                        문제 {currentQuestionIndex + 1} / {currentQuizzes.length}
                      </span>
                      <span className="text-purple-400 font-bold">
                        점수: {score} / {currentQuizzes.length}
                      </span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <div
                        className="bg-gradient-to-r from-purple-600 to-indigo-600 h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${
                            ((currentQuestionIndex + 1) / currentQuizzes.length) *
                            100
                          }%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  {/* Question Card */}
                  <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700 shadow-2xl">
                    {/* Question Type Badge */}
                    <div className="flex items-center gap-2 mb-6">
                      {currentQuizzes[currentQuestionIndex].type === 'music' ? (
                        <div className="flex items-center gap-2 px-3 py-1 bg-purple-600/30 rounded-full">
                          <MdMusicNote className="h-4 w-4 text-purple-400" />
                          <span className="text-purple-300 text-sm font-semibold">
                            음악 맞추기
                          </span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-2 px-3 py-1 bg-indigo-600/30 rounded-full">
                          <MdQuiz className="h-4 w-4 text-indigo-400" />
                          <span className="text-indigo-300 text-sm font-semibold">
                            상식 퀴즈
                          </span>
                        </div>
                      )}
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          currentQuizzes[currentQuestionIndex].difficulty ===
                          'easy'
                            ? 'bg-green-600/30 text-green-300'
                            : currentQuizzes[currentQuestionIndex].difficulty ===
                              'medium'
                            ? 'bg-yellow-600/30 text-yellow-300'
                            : 'bg-red-600/30 text-red-300'
                        }`}
                      >
                        {currentQuizzes[currentQuestionIndex].difficulty === 'easy'
                          ? '쉬움'
                          : currentQuizzes[currentQuestionIndex].difficulty ===
                            'medium'
                          ? '보통'
                          : '어려움'}
                      </span>
                    </div>

                    {/* Question */}
                    <h3 className="text-white text-2xl font-bold mb-8">
                      {currentQuizzes[currentQuestionIndex].question}
                    </h3>

                    {/* Options */}
                    <div className="space-y-3 mb-8">
                      {currentQuizzes[currentQuestionIndex].options.map(
                        (option, index) => {
                          const isSelected = selectedAnswer === index;
                          const isCorrect =
                            index ===
                            currentQuizzes[currentQuestionIndex].correctAnswer;
                          const showCorrect = showResult && isCorrect;
                          const showIncorrect = showResult && isSelected && !isCorrect;

                          return (
                            <button
                              key={index}
                              onClick={() => handleAnswerSelect(index)}
                              disabled={showResult}
                              className={`w-full text-left p-4 rounded-xl transition-all duration-300 flex items-center gap-3 ${
                                showCorrect
                                  ? 'bg-green-600/30 border-2 border-green-500'
                                  : showIncorrect
                                  ? 'bg-red-600/30 border-2 border-red-500'
                                  : isSelected
                                  ? 'bg-purple-600/50 border-2 border-purple-500'
                                  : 'bg-gray-800/50 border-2 border-gray-700 hover:bg-gray-700/50 hover:border-gray-600'
                              } ${showResult ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                            >
                              <div
                                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 font-bold ${
                                  showCorrect
                                    ? 'bg-green-500 text-white'
                                    : showIncorrect
                                    ? 'bg-red-500 text-white'
                                    : isSelected
                                    ? 'bg-purple-500 text-white'
                                    : 'bg-gray-700 text-gray-400'
                                }`}
                              >
                                {showCorrect ? (
                                  <MdCheckCircle className="h-6 w-6" />
                                ) : showIncorrect ? (
                                  <MdCancel className="h-6 w-6" />
                                ) : (
                                  String.fromCharCode(65 + index)
                                )}
                              </div>
                              <span
                                className={`${
                                  showCorrect || showIncorrect
                                    ? 'text-white font-semibold'
                                    : 'text-gray-200'
                                }`}
                              >
                                {option}
                              </span>
                            </button>
                          );
                        }
                      )}
                    </div>

                    {/* Explanation */}
                    {showResult && (
                      <div
                        className={`p-4 rounded-xl mb-6 ${
                          selectedAnswer ===
                          currentQuizzes[currentQuestionIndex].correctAnswer
                            ? 'bg-green-900/30 border border-green-700'
                            : 'bg-red-900/30 border border-red-700'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          {selectedAnswer ===
                          currentQuizzes[currentQuestionIndex].correctAnswer ? (
                            <MdCheckCircle className="h-6 w-6 text-green-400 flex-shrink-0 mt-1" />
                          ) : (
                            <MdCancel className="h-6 w-6 text-red-400 flex-shrink-0 mt-1" />
                          )}
                          <div>
                            <p className="text-white font-semibold mb-2">
                              {selectedAnswer ===
                              currentQuizzes[currentQuestionIndex].correctAnswer
                                ? '정답입니다! 🎉'
                                : '아쉽네요! 😢'}
                            </p>
                            <p className="text-gray-300 text-sm">
                              {currentQuizzes[currentQuestionIndex].explanation}
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      {!showResult ? (
                        <button
                          onClick={handleSubmitAnswer}
                          disabled={selectedAnswer === null}
                          className="flex-1 py-3 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-xl font-bold transition-all"
                        >
                          정답 확인
                        </button>
                      ) : (
                        <button
                          onClick={handleNextQuestion}
                          className="flex-1 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold transition-all"
                        >
                          {currentQuestionIndex < currentQuizzes.length - 1
                            ? '다음 문제'
                            : '결과 보기'}
                        </button>
                      )}
                      <button
                        onClick={handleRestartQuiz}
                        className="px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-xl font-bold transition-all"
                      >
                        <MdRefresh className="h-6 w-6" />
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                // Quiz Complete - Results
                <div className="max-w-2xl mx-auto text-center">
                  <div className="bg-gradient-to-br from-purple-900/50 to-indigo-900/50 rounded-2xl p-12 border border-purple-700/30">
                    <MdEmojiEvents className="h-24 w-24 text-yellow-400 mx-auto mb-6" />
                    <h2 className="text-white text-4xl font-bold mb-4">
                      퀴즈 완료!
                    </h2>
                    <p className="text-gray-300 text-xl mb-8">
                      {currentQuizzes.length}문제 중{' '}
                      <span className="text-purple-400 font-bold text-3xl">
                        {score}문제
                      </span>{' '}
                      정답!
                    </p>

                    <div className="mb-8">
                      <div className="text-6xl mb-4">
                        {score === currentQuizzes.length
                          ? '🏆'
                          : score >= currentQuizzes.length * 0.8
                          ? '🥇'
                          : score >= currentQuizzes.length * 0.6
                          ? '🥈'
                          : score >= currentQuizzes.length * 0.4
                          ? '🥉'
                          : '📚'}
                      </div>
                      <p className="text-purple-300 text-lg">
                        {score === currentQuizzes.length
                          ? '완벽합니다! 모차르트 박사님! 🎓'
                          : score >= currentQuizzes.length * 0.8
                          ? '훌륭해요! 모차르트 전문가네요! 👏'
                          : score >= currentQuizzes.length * 0.6
                          ? '잘하셨어요! 좀 더 공부해보세요! 📖'
                          : score >= currentQuizzes.length * 0.4
                          ? '괜찮아요! 다시 도전해보세요! 💪'
                          : '아직 배울 게 많아요! 파이팅! 🌟'}
                      </p>
                    </div>

                    <button
                      onClick={handleRestartQuiz}
                      className="px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white rounded-xl font-bold text-lg transition-all shadow-xl hover:scale-105 flex items-center gap-2 mx-auto"
                    >
                      <MdRefresh className="h-6 w-6" />
                      다시 도전하기
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}
