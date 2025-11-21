'use client';

import { useState, useEffect } from 'react';

interface AnimatedTitleProps {
  isScrolled: boolean;
}

export default function AnimatedTitle({ isScrolled }: AnimatedTitleProps) {
  const texts = ['Mozartiade', '모차르티아데'];
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const currentFullText = texts[currentTextIndex];

    if (isTyping) {
      // 타이핑 애니메이션 (글자를 하나씩 추가)
      if (displayedText.length < currentFullText.length) {
        const timeout = setTimeout(() => {
          setDisplayedText(currentFullText.slice(0, displayedText.length + 1));
        }, 120); // 각 글자가 나타나는 속도
        return () => clearTimeout(timeout);
      } else {
        // 타이핑이 완료되면 잠시 대기 후 다음 텍스트로 전환
        const timeout = setTimeout(() => {
          setIsTyping(false);
          setDisplayedText('');
        }, 2000); // 완성된 텍스트를 보여주는 시간
        return () => clearTimeout(timeout);
      }
    } else {
      // 텍스트 인덱스 변경 및 타이핑 재시작
      const timeout = setTimeout(() => {
        setCurrentTextIndex((prev) => (prev + 1) % texts.length);
        setIsTyping(true);
      }, 300); // 다음 텍스트 시작 전 대기 시간
      return () => clearTimeout(timeout);
    }
  }, [displayedText, isTyping, currentTextIndex]);

  return (
    <h1 className={`font-serif text-xl font-bold transition-colors ${
      isScrolled ? 'text-primary-900' : 'text-white drop-shadow-lg'
    }`}>
      {displayedText.split('').map((char, index) => (
        <span
          key={index}
          className="inline-block animate-fadeIn"
          style={{
            animationDelay: `${index * 50}ms`,
            animationFillMode: 'backwards'
          }}
        >
          {char}
        </span>
      ))}
    </h1>
  );
}
