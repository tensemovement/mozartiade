'use client';

import { useState } from 'react';
import { FiChevronDown, FiChevronUp } from 'react-icons/fi';
import type { FAQ } from '@/data/faqs';

interface FAQAccordionProps {
  faq: FAQ;
  isOpen?: boolean;
  onToggle?: () => void;
}

export default function FAQAccordion({
  faq,
  isOpen = false,
  onToggle,
}: FAQAccordionProps) {
  const [isExpanded, setIsExpanded] = useState(isOpen);

  const handleToggle = () => {
    if (onToggle) {
      onToggle();
    } else {
      setIsExpanded(!isExpanded);
    }
  };

  const expanded = onToggle ? isOpen : isExpanded;

  return (
    <div className="group border-b border-primary-200 last:border-b-0">
      <button
        onClick={handleToggle}
        className="w-full text-left py-6 px-6 flex items-start justify-between gap-4 transition-all duration-300 hover:bg-cream/30"
        aria-expanded={expanded}
      >
        <div className="flex-1">
          <h3 className="font-serif text-lg md:text-xl text-primary-900 font-semibold pr-4 group-hover:text-secondary transition-colors duration-300">
            {faq.question}
          </h3>
        </div>
        <div className="flex-shrink-0 mt-1">
          <div
            className={`w-8 h-8 rounded-full bg-gradient-to-br from-secondary/10 to-accent/10 flex items-center justify-center transition-all duration-300 ${
              expanded
                ? 'bg-gradient-to-br from-secondary to-secondary/80 text-white'
                : 'group-hover:from-secondary/20 group-hover:to-accent/20'
            }`}
          >
            {expanded ? (
              <FiChevronUp className="w-5 h-5" />
            ) : (
              <FiChevronDown className="w-5 h-5 text-secondary" />
            )}
          </div>
        </div>
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          expanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-6 pt-2">
          <div className="pl-4 border-l-2 border-accent/30">
            <p className="text-primary-700 leading-relaxed whitespace-pre-wrap">
              {faq.answer}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface FAQListProps {
  faqs: FAQ[];
  allowMultiple?: boolean;
}

export function FAQList({ faqs, allowMultiple = false }: FAQListProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    if (allowMultiple) {
      return;
    }
    setOpenId(openId === id ? null : id);
  };

  if (faqs.length === 0) {
    return (
      <div className="text-center py-16">
        <p className="text-primary-500 text-lg">
          검색 결과가 없습니다. 다른 키워드로 시도해보세요.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-large shadow-card overflow-hidden">
      {faqs.map((faq) => (
        <FAQAccordion
          key={faq.id}
          faq={faq}
          isOpen={allowMultiple ? undefined : openId === faq.id}
          onToggle={
            allowMultiple ? undefined : () => handleToggle(faq.id)
          }
        />
      ))}
    </div>
  );
}
