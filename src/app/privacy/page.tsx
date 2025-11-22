'use client';

import { FiShield, FiLock, FiCheck } from 'react-icons/fi';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function PrivacyPage() {
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
              <FiShield className="w-4 h-4" />
              <span className="text-sm font-medium">개인정보보호</span>
            </div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              개인정보처리방침
            </h1>

            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto">
              Mozartiade는 귀하의 개인정보보호를 매우 중요시하며,
              <br />
              관련 법규를 준수하고 있습니다.
            </p>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16 px-4">
          <div className="max-w-4xl mx-auto">
            {/* Introduction */}
            <div className="bg-white rounded-2xl shadow-soft p-8 md:p-12 mb-8">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-secondary to-primary-900 rounded-xl flex items-center justify-center flex-shrink-0">
                  <FiLock className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary-900 mb-4">
                    개인정보보호방침 소개
                  </h2>
                  <div className="prose prose-lg max-w-none">
                    <p className="text-primary-700 leading-relaxed mb-4">
                      Mozartiade는 귀하의 개인정보보호를 매우 중요시하며, "정보통신망이용촉진 등에 관한 법률" 상의 개인정보보호 규정 및 정보통신부가 제정한 "개인정보보호 지침"을 준수하고 있습니다.
                    </p>
                    <p className="text-primary-700 leading-relaxed mb-4">
                      Mozartiade는 개인정보보호방침을 통하여 귀하께서 제공하시는 개인정보가 어떠한 용도와 방식으로 이용되고 있으며 개인정보보호를 위해 어떠한 조치가 취해지고 있는지 알려드립니다.
                    </p>
                    <p className="text-primary-700 leading-relaxed">
                      Mozartiade는 개인정보 보호방침을 홈페이지 첫화면에 공개함으로써 언제나 용이하게 보실 수 있도록 조치하고 있습니다. Mozartiade는 개인정보 보호방침의 지속적인 개선을 위하여 개인정보 보호방침을 개정하는데 필요한 절차를 정하고 있습니다. 그리고 개인정보보호방침을 개정하는 경우 버전번호 등을 부여하여 개정된 사항을 귀하께서 쉽게 알아볼 수 있도록 하고 있습니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 1: 개인정보의 수집 및 이용목적 */}
            <div className="bg-white rounded-2xl shadow-soft p-8 md:p-12 mb-8">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary-900 mb-6">
                1. 개인정보의 수집 및 이용목적
              </h2>

              <div className="space-y-6">
                <div className="border-l-4 border-secondary pl-6">
                  <h3 className="font-bold text-lg text-primary-900 mb-3">
                    가. 서비스 제공에 관한 계약 이행 및 서비스 제공에 따른 요금정산
                  </h3>
                  <ul className="space-y-2 text-primary-700">
                    <li className="flex items-start gap-2">
                      <FiCheck className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span>콘텐츠 제공</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FiCheck className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span>구매 및 요금 결제</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FiCheck className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span>금융거래 본인 인증 및 금융 서비스</span>
                    </li>
                  </ul>
                </div>

                <div className="border-l-4 border-secondary pl-6">
                  <h3 className="font-bold text-lg text-primary-900 mb-3">
                    나. 회원 관리
                  </h3>
                  <ul className="space-y-2 text-primary-700">
                    <li className="flex items-start gap-2">
                      <FiCheck className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span>회원제 서비스 이용에 따른 본인확인, 개인 식별</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FiCheck className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span>불량회원의 부정 이용 방지와 비인가 사용 방지</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FiCheck className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span>가입 의사 확인, 연령확인</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FiCheck className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span>만14세 미만 아동 개인정보 수집 시 법정 대리인 동의여부 확인</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FiCheck className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span>불만처리 등 민원처리, 고지사항 전달</span>
                    </li>
                  </ul>
                </div>

                <div className="border-l-4 border-secondary pl-6">
                  <h3 className="font-bold text-lg text-primary-900 mb-3">
                    다. 마케팅 및 광고에 활용
                  </h3>
                  <ul className="space-y-2 text-primary-700">
                    <li className="flex items-start gap-2">
                      <FiCheck className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span>이벤트 등 광고성 정보 전달</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FiCheck className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span>인구통계학적 특성에 따른 서비스 제공 및 광고 게재</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <FiCheck className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                      <span>접속 빈도 파악 또는 회원의 서비스 이용에 대한 통계</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Section 2: 수집하는 개인정보의 항목 */}
            <div className="bg-white rounded-2xl shadow-soft p-8 md:p-12 mb-8">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary-900 mb-6">
                2. 수집하는 개인정보의 항목
              </h2>

              <div className="space-y-6">
                <div className="bg-gradient-to-br from-secondary/5 to-primary-50/50 rounded-xl p-6">
                  <h3 className="font-bold text-lg text-primary-900 mb-4">
                    가. 필수항목
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-white rounded-lg p-4">
                      <p className="font-semibold text-primary-900 mb-2">일반회원</p>
                      <p className="text-primary-700">
                        이름, 로그인ID, 비밀번호, 법정대리인정보(14세 미만인 회원에 한함)
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-4">
                      <p className="font-semibold text-primary-900 mb-2">모든회원</p>
                      <p className="text-primary-700">
                        서비스 이용기록, 접속 로그, 쿠키, 접속 IP 정보
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-accent/5 to-cream/50 rounded-xl p-6">
                  <h3 className="font-bold text-lg text-primary-900 mb-4">
                    나. 선택정보
                  </h3>
                  <div className="bg-white rounded-lg p-4">
                    <p className="text-primary-700">
                      이메일, 연락처, 핸드폰번호, 음악전공여부
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: 개인정보의 보유 및 이용기간 */}
            <div className="bg-white rounded-2xl shadow-soft p-8 md:p-12 mb-8">
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-primary-900 mb-6">
                3. 개인정보의 보유 및 이용기간
              </h2>

              <div className="space-y-6">
                <div className="bg-primary-50/50 rounded-xl p-6">
                  <p className="text-primary-900 font-semibold mb-4">
                    개인정보 수집 및 이용목적이 달성된 후에는 해당 정보를 지체 없이 파기합니다.
                  </p>
                  <p className="text-primary-700">
                    단, 다음의 정보에 대해서는 아래의 이유로 명시한 기간 동안 보존합니다.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="border border-primary-200 rounded-xl p-6">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm font-semibold text-primary-900 mb-2">보존 항목</p>
                        <p className="text-primary-700">이름, 로그인ID, 전화번호, 휴대전화번호, 이메일 번호</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-primary-900 mb-2">보존 근거</p>
                        <p className="text-primary-700">서비스 이용의 혼선 방지, 불법적 사용자에 대한 관련 기관 수사협조</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-primary-900 mb-2">보존 기간</p>
                        <p className="text-primary-700">회원 탈퇴 후 1년</p>
                      </div>
                    </div>
                  </div>

                  <div className="border border-primary-200 rounded-xl p-6">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-sm font-semibold text-primary-900 mb-2">보존 항목</p>
                        <p className="text-primary-700">서비스 이용기록, 접속 로그, 접속 IP 정보</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-primary-900 mb-2">보존 근거</p>
                        <p className="text-primary-700">통신비밀보호법</p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-primary-900 mb-2">보존 기간</p>
                        <p className="text-primary-700 font-semibold">3개월</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Version Info */}
            <div className="bg-gradient-to-br from-secondary via-secondary/90 to-primary-900 rounded-2xl p-8 md:p-12 text-white">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                  <FiShield className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="font-serif text-2xl font-bold mb-4">
                    개인정보처리방침 버전 정보
                  </h2>
                  <div className="space-y-2 text-white/90">
                    <p>
                      <span className="font-semibold">버전번호:</span> v2.01
                    </p>
                    <p>
                      <span className="font-semibold">초기 개인정보처리방침 시행일자:</span> 2003-03-29
                    </p>
                    <p>
                      <span className="font-semibold">변경 개인정보처리방침 시행일자:</span> 2007-09-30
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-white/20">
                <p className="text-sm text-white/70">
                  개인정보와 관련하여 궁금하신 사항이나 문의사항이 있으시면 언제든지 연락주시기 바랍니다.
                  <br />
                  이메일: privacy@mozartiade.com | 전화: 02-1234-5678
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
