'use client';

import { useState, FormEvent } from 'react';
import { FiMail, FiUser, FiMessageSquare, FiSend, FiCheck } from 'react-icons/fi';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('전송에 실패했습니다.');
      }

      setIsSubmitted(true);
      toast.success('문의가 성공적으로 전송되었습니다!');

      // Reset form
      setFormData({
        name: '',
        email: '',
        message: '',
      });

      // Reset success state after 5 seconds
      setTimeout(() => setIsSubmitted(false), 5000);
    } catch (error) {
      toast.error('문의 전송에 실패했습니다. 다시 시도해주세요.');
      console.error('Contact form error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-gradient-to-b from-ivory via-white to-cream/30">
        {/* Hero Section */}
        <section className="relative pt-32 pb-16 px-4 bg-gradient-to-br from-secondary via-secondary/90 to-primary-900 text-white overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          </div>

          <div className="max-w-4xl mx-auto text-center relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full mb-6">
              <FiMail className="w-4 h-4" />
              <span className="text-sm font-medium">문의하기</span>
            </div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              궁금하신 점이 있으신가요?
            </h1>

            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              Mozartiade에 대해 궁금한 사항이나 제안하고 싶은 내용을
              <br />
              편하게 문의해주세요. 친절하게 답변해드리겠습니다.
            </p>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-16 px-4">
          <div className="max-w-2xl mx-auto">
            {/* Contact Info */}
            <div className="mb-12 grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-primary-100">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-full mb-4">
                  <FiMail className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-semibold text-primary-900 mb-2">이메일</h3>
                <p className="text-sm text-primary-600">
                  support@mozartiade.com
                </p>
              </div>

              <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-primary-100">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-full mb-4">
                  <FiMessageSquare className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-semibold text-primary-900 mb-2">
                  운영 시간
                </h3>
                <p className="text-sm text-primary-600">
                  평일 10:00 - 18:00
                </p>
              </div>

              <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-primary-100">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-secondary/10 rounded-full mb-4">
                  <FiCheck className="w-6 h-6 text-secondary" />
                </div>
                <h3 className="font-semibold text-primary-900 mb-2">
                  답변 시간
                </h3>
                <p className="text-sm text-primary-600">
                  평균 24시간 이내
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="bg-white rounded-2xl shadow-elevated p-8 md:p-12 border border-primary-100">
              <h2 className="font-serif text-3xl font-bold text-primary-900 mb-2">
                문의 메시지 보내기
              </h2>
              <p className="text-primary-600 mb-8">
                아래 양식을 작성해주시면 이메일로 답변드리겠습니다.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-primary-900 mb-2"
                  >
                    이름 <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 pl-12 rounded-lg border border-primary-200 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                      placeholder="홍길동"
                    />
                    <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-400" />
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-primary-900 mb-2"
                  >
                    이메일 <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 pl-12 rounded-lg border border-primary-200 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all"
                      placeholder="example@email.com"
                    />
                    <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-primary-400" />
                  </div>
                </div>

                {/* Message Field */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-primary-900 mb-2"
                  >
                    문의 내용 <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={6}
                      className="w-full px-4 py-3 pl-12 rounded-lg border border-primary-200 focus:outline-none focus:ring-2 focus:ring-secondary focus:border-transparent transition-all resize-none"
                      placeholder="궁금하신 내용을 자세히 작성해주세요..."
                    />
                    <FiMessageSquare className="absolute left-4 top-4 w-5 h-5 text-primary-400" />
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 ${
                    isSubmitted
                      ? 'bg-green-500 hover:bg-green-600'
                      : 'bg-gradient-to-r from-secondary to-secondary/80 hover:shadow-lg hover:scale-[1.02]'
                  } disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      전송 중...
                    </>
                  ) : isSubmitted ? (
                    <>
                      <FiCheck className="w-5 h-5" />
                      전송 완료!
                    </>
                  ) : (
                    <>
                      <FiSend className="w-5 h-5" />
                      문의하기
                    </>
                  )}
                </button>
              </form>

              {/* Additional Info */}
              <div className="mt-8 pt-8 border-t border-primary-200">
                <p className="text-sm text-primary-600 text-center">
                  개인정보는 문의 답변 목적으로만 사용되며, 안전하게 보호됩니다.
                  <br />
                  주말 및 공휴일에는 답변이 지연될 수 있습니다.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Link Section */}
        <section className="py-16 px-4 bg-gradient-to-br from-cream via-ivory to-white">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl p-8 md:p-12 text-center shadow-lg border border-primary-100">
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-primary-900 mb-4">
                자주 묻는 질문도 확인해보세요
              </h3>
              <p className="text-primary-600 mb-6">
                많은 분들이 궁금해하시는 내용을 FAQ에서 먼저 확인하실 수
                있습니다.
              </p>
              <a
                href="/faq"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-secondary to-secondary/80 text-white rounded-full font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                FAQ 바로가기
              </a>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
