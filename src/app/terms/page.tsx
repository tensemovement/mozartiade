'use client';

import { useState } from 'react';
import { FiFileText, FiChevronRight, FiClock } from 'react-icons/fi';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export default function TermsOfServicePage() {
  const [activeSection, setActiveSection] = useState<string | null>(null);

  const sections = [
    { id: 'chapter1', title: '제1장 총칙', items: ['제1조 (목적)', '제2조 (약관의 명시, 효력 및 개정)'] },
    { id: 'chapter2', title: '제2장 회원의 가입 및 관리', items: ['제3조 (회원가입절차)', '제4조 (회원등록의 성립과 유보 및 거절)', '제5조 (회원 ID 등의 관리책임)', '제6조 (개인정보의 수집 등)', '제7조 (회원정보의 변경)'] },
    { id: 'chapter3', title: '제3장 서비스의 이용', items: ['제8조 (서비스 이용)', '제9조 (서비스내용변경 통지 등)', '제10조 (권리의 귀속 및 저작물의 이용)', '제11조 (서비스 이용의 제한 및 중지)', '제12조 (회사의 의무)', '제13조 (회원의 의무)', '제14조 (양도금지)', '제15조 (이용요금의 납입)', '제16조 (이용요금의 환불 및 이의제기)', '제17조 (이용계약의 해지)'] },
    { id: 'chapter4', title: '제4장 기타', items: ['제18조 (청소년 보호)', '제19조 (면책)', '제20조 (분쟁의 해결)', '제21조 (규정의 준용)'] },
  ];

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -100;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveSection(sectionId);
    }
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
              <FiFileText className="w-4 h-4" />
              <span className="text-sm font-medium">Terms of Service</span>
            </div>

            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              이용약관
            </h1>

            <p className="text-lg md:text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Mozartiade 서비스 이용을 위한 약관입니다.
              <br />
              서비스 이용 전 반드시 확인해주세요.
            </p>

            {/* Meta Info */}
            <div className="mt-8 flex items-center justify-center gap-6 text-sm text-white/70">
              <div className="flex items-center gap-2">
                <FiClock className="w-4 h-4" />
                <span>최종 수정일: 2006년 7월 9일</span>
              </div>
            </div>
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Table of Contents - Sidebar */}
            <aside className="lg:w-80 shrink-0">
              <div className="sticky top-24 bg-white rounded-2xl shadow-lg border border-primary-100 p-6">
                <h2 className="font-serif text-xl font-bold text-primary-900 mb-4">
                  목차
                </h2>
                <nav className="space-y-2">
                  {sections.map((section) => (
                    <div key={section.id}>
                      <button
                        onClick={() => scrollToSection(section.id)}
                        className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                          activeSection === section.id
                            ? 'bg-gradient-to-r from-secondary to-secondary/80 text-white'
                            : 'text-primary-700 hover:bg-primary-50'
                        }`}
                      >
                        {section.title}
                      </button>
                      {section.items && section.items.length > 0 && (
                        <ul className="mt-1 ml-4 space-y-1">
                          {section.items.map((item, idx) => (
                            <li key={idx}>
                              <button
                                onClick={() => scrollToSection(`${section.id}-${idx}`)}
                                className="text-xs text-primary-600 hover:text-secondary transition-colors py-1 flex items-center gap-1"
                              >
                                <FiChevronRight className="w-3 h-3" />
                                {item}
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </nav>
              </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 bg-white rounded-2xl shadow-lg border border-primary-100 p-8 md:p-12">
              <div className="prose prose-primary max-w-none">
                {/* Chapter 1 */}
                <section id="chapter1" className="mb-16">
                  <h2 className="font-serif text-3xl font-bold text-primary-900 mb-8 pb-4 border-b-2 border-primary-200">
                    제1장 총칙
                  </h2>

                  <article id="chapter1-0" className="mb-8">
                    <h3 className="font-serif text-xl font-bold text-primary-900 mb-4">
                      제 1 조 (목적)
                    </h3>
                    <p className="text-primary-700 leading-relaxed">
                      본 약관은 서비스 이용자가 Mozartiade(이하 &ldquo;회사&rdquo;라 합니다)가 제공하는 온라인상의 인터넷 서비스(이하 &ldquo;서비스&rdquo;라고 하며, 접속 가능한 유∙무선 단말기의 종류와는 상관없이 이용 가능한 &ldquo;회사&rdquo;가 제공하는 모든 &ldquo;서비스&rdquo;를 의미합니다. 이하 같습니다)에 회원으로 가입하고 이를 이용함에 있어 회사와 회원(본 약관에 동의하고 회원등록을 완료한 서비스 이용자를 말합니다. 이하 &ldquo;회원&rdquo;이라고 합니다)의 권리•의무 및 책임사항을 규정함을 목적으로 합니다.
                    </p>
                  </article>

                  <article id="chapter1-1" className="mb-8">
                    <h3 className="font-serif text-xl font-bold text-primary-900 mb-4">
                      제 2 조 (약관의 명시, 효력 및 개정)
                    </h3>
                    <div className="space-y-4 text-primary-700 leading-relaxed">
                      <p>① 회사는 이 약관의 내용을 회원이 쉽게 알 수 있도록 서비스 초기 화면에 게시합니다.</p>
                      <p>② 회사는 온라인 디지털콘텐츠산업 발전법, 전자상거래 등에서의 소비자보호에 관한 법률, 약관의 규제에 관한 법률, 소비자기본법 등 관련법을 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.</p>
                      <p>③ 회사가 약관을 개정할 경우에는 기존약관과 개정약관 및 개정약관의 적용일자와 개정사유를 명시하여 현행약관과 함께 그 적용일자 일십오(15)일 전부터 적용일 이후 상당한 기간 동안, 개정 내용이 회원에게 불리한 경우에는 그 적용일자 삼십(30)일 전부터 적용일 이후 상당한 기간 동안 각각 이를 서비스 홈페이지에 공지하고 기존 회원에게는 회사가 부여한 이메일 주소로 개정약관을 발송하여 고지합니다.</p>
                      <p>④ 회사가 전항에 따라 회원에게 통지하면서 공지∙고지일로부터 개정약관 시행일 7일 후까지 거부의사를 표시하지 아니하면 승인한 것으로 본다는 뜻을 명확하게 고지하였음에도 의사표시가 없는 경우에는 변경된 약관을 승인한 것으로 봅니다. 회원이 개정약관에 동의하지 않을 경우 회원은 제17조 제1항의 규정에 따라 이용계약을 해지할 수 있습니다.</p>
                    </div>
                  </article>
                </section>

                {/* Chapter 2 */}
                <section id="chapter2" className="mb-16">
                  <h2 className="font-serif text-3xl font-bold text-primary-900 mb-8 pb-4 border-b-2 border-primary-200">
                    제2장 회원의 가입 및 관리
                  </h2>

                  <article id="chapter2-0" className="mb-8">
                    <h3 className="font-serif text-xl font-bold text-primary-900 mb-4">
                      제 3 조 (회원가입절차)
                    </h3>
                    <div className="space-y-4 text-primary-700 leading-relaxed">
                      <p>① 서비스 이용자가 본 약관을 읽고 &ldquo;동의&rdquo; 버튼을 누르거나 &ldquo;확인&rdquo; 등에 체크하는 방법을 취한 경우 본 약관에 동의한 것으로 간주합니다.</p>
                      <p>② 회사의 서비스 이용을 위한 회원가입은 서비스 이용자가 제1항과 같이 동의한 후, 회사가 정한 온라인 회원가입 신청서에 회원 ID를 포함한 필수사항을 입력하고, &ldquo;동의&rdquo; 내지 &ldquo;확인&rdquo; 단추를 누르는 방법으로 합니다. 다만, 회사가 필요하다고 인정하는 경우 회원에게 별도의 서류를 제출하도록 할 수 있습니다.</p>
                      <p>③ 법인고객 회원가입의 경우 회원가입 신청서의 제출, 서비스 이용대금의 납부 이외에 회사가 정하는 추가 서류의 제출이 추가적으로 필요합니다.</p>
                      <p>④ 법인고객 회원가입의 경우 서비스 이용자와 이용요금 납입자가 다를 경우 회사는 이를 확인하기 위하여 제 증명을 요구할 수 있습니다.</p>
                    </div>
                  </article>

                  <article id="chapter2-1" className="mb-8">
                    <h3 className="font-serif text-xl font-bold text-primary-900 mb-4">
                      제 4 조 (회원등록의 성립과 유보 및 거절)
                    </h3>
                    <div className="space-y-4 text-primary-700 leading-relaxed">
                      <p>① 회원등록은 제3조에 정한 절차에 의한 서비스 이용자의 회원가입 신청과 회사의 회원등록 승낙에 의하여 성립합니다. 회사는 회원가입 신청자가 필수사항 등을 성실히 입력하여 가입신청을 완료하였을 때에는 필요한 사항을 확인한 후 지체 없이 이를 승낙을 하여야 합니다. 단 회원가입 신청서 제출 이외에 별도의 자료 제출이 요구되는 경우에는 예외로 합니다.</p>
                      <p>② 회사는 아래 각 호의 1에 해당하는 경우에는 회원등록의 승낙을 유보할 수 있습니다.</p>
                      <ul className="list-disc list-inside ml-4 space-y-2">
                        <li>제공서비스 설비용량에 현실적인 여유가 없는 경우</li>
                        <li>서비스를 제공하기에는 기술적으로 문제가 있다고 판단되는 경우</li>
                        <li>법인 고객으로 가입신청을 하고 제3조 제3항 내지 제4항의 의무를 이행하지 않은 경우</li>
                        <li>기타 회사가 재정적, 기술적으로 필요하다고 인정하는 경우</li>
                      </ul>
                      <p>③ 회사는 아래 각 호의 1에 해당하는 경우에는 회원등록을 거절할 수 있습니다.</p>
                      <ul className="list-disc list-inside ml-4 space-y-2">
                        <li>가입신청서의 내용을 허위로 기재하였거나 허위서류를 첨부하여 가입신청을 하는 경우</li>
                        <li>법인 고객으로 가입신청을 하고 회사가 별도로 규정하는 일정한 기간 이내에 제3조 제3항 내지 제4항의 의무를 이행하지 않은 경우</li>
                        <li>14세 미만의 아동이 개인정보제공에 대한 동의를 부모 등 법정대리인으로부터 받지 않은 경우</li>
                        <li>기타 회사가 관련법령 등을 기준으로 하여 명백하게 사회질서 및 미풍양속에 반할 우려가 있음을 인정하는 경우</li>
                        <li>제17조 제2항에 의하여 회사가 계약을 해지했던 회원이 다시 회원 신청을 하는 경우</li>
                      </ul>
                    </div>
                  </article>

                  <article id="chapter2-2" className="mb-8">
                    <h3 className="font-serif text-xl font-bold text-primary-900 mb-4">
                      제 5 조 (회원 ID 등의 관리책임)
                    </h3>
                    <div className="space-y-4 text-primary-700 leading-relaxed">
                      <p>① 회원은 서비스 이용을 위한 회원 ID, 비밀번호의 관리에 대한 책임, 본인 ID의 제3자에 의한 부정사용 등 회원의 고의∙과실로 인해 발생하는 모든 불이익에 대한 책임을 부담합니다. 단, 이것이 회사의 고의∙과실로 인하여 야기된 경우는 회사가 책임을 부담합니다.</p>
                      <p>② 회원은 회원 ID, 비밀번호 및 추가정보 등을 도난 당하거나 제3자가 사용하고 있음을 인지한 경우에는 즉시 본인의 비밀번호를 수정하는 등의 조치를 취하여야 하며 즉시 이를 회사에 통보하여 회사의 안내를 따라야 합니다.</p>
                    </div>
                  </article>

                  <article id="chapter2-3" className="mb-8">
                    <h3 className="font-serif text-xl font-bold text-primary-900 mb-4">
                      제 6 조 (개인정보의 수집 등)
                    </h3>
                    <p className="text-primary-700 leading-relaxed">
                      회사는 서비스를 제공하기 위하여 관련 법령의 규정에 따라 회원으로부터 필요한 개인정보를 수집합니다.
                    </p>
                  </article>

                  <article id="chapter2-4" className="mb-8">
                    <h3 className="font-serif text-xl font-bold text-primary-900 mb-4">
                      제 7 조 (회원정보의 변경)
                    </h3>
                    <div className="space-y-4 text-primary-700 leading-relaxed">
                      <p>회원은 아래 각 호의 1에 해당하는 사항이 변경되었을 경우 즉시 회원정보 관리페이지에서 이를 변경하여야 합니다. 이 경우 회사는 회원이 회원정보를 변경하지 아니하여 발생한 손해에 대하여 책임을 부담하지 아니하며, 법인 회원의 경우에는 회사가 별도로 정하는 방법으로 변경할 수 있습니다.</p>
                      <ul className="list-disc list-inside ml-4 space-y-2">
                        <li>생년월일, 거주지역 및 연락처 등</li>
                        <li>우편/경품 수신 주소, 취미•관심사 등</li>
                        <li>서비스별 뉴스레터 수신 여부 등</li>
                        <li>기타 회사가 인정하는 사항</li>
                      </ul>
                    </div>
                  </article>
                </section>

                {/* Chapter 3 */}
                <section id="chapter3" className="mb-16">
                  <h2 className="font-serif text-3xl font-bold text-primary-900 mb-8 pb-4 border-b-2 border-primary-200">
                    제3장 서비스의 이용
                  </h2>

                  <article id="chapter3-0" className="mb-8">
                    <h3 className="font-serif text-xl font-bold text-primary-900 mb-4">
                      제 8 조 (서비스 이용)
                    </h3>
                    <div className="space-y-4 text-primary-700 leading-relaxed">
                      <p>① 서비스 이용은 회사의 서비스 사용승낙 직후부터 가능합니다. 다만, 유료 서비스의 경우 회사가 요금납입을 확인한 직후부터 가능하게 할 수 있습니다.</p>
                      <p>② 민법상 미성년자인 회원이 유료 서비스를 이용할 경우 미성년자인 회원은 결제 전 법정대리인의 동의를 얻어야 합니다.</p>
                      <p>③ 서비스 이용시간은 회사의 업무상 또는 기술상 불가능한 경우를 제외하고는 연중무휴 1일 24시간(00:00-24:00)으로 함을 원칙으로 합니다. 다만, 서비스설비의 정기점검 등의 사유로 회사가 서비스를 특정범위로 분할하여 별도로 날짜와 시간을 정할 수 있습니다.</p>
                    </div>
                  </article>

                  <article id="chapter3-1" className="mb-8">
                    <h3 className="font-serif text-xl font-bold text-primary-900 mb-4">
                      제 9 조 (서비스내용변경 통지 등)
                    </h3>
                    <div className="space-y-4 text-primary-700 leading-relaxed">
                      <p>① 회사가 기타 사유의 작업, 신규서비스의 개시 등의 사유로 서비스 내용이 변경되거나 서비스가 종료되는 경우 회사는 회원의 등록된 전자우편 주소로 이메일을 통하여 서비스 내용의 변경 사항 또는 종료를 통지할 수 있습니다.</p>
                      <p>② 전항의 경우 불특정 다수인을 상대로 통지를 함에 있어서는 웹사이트 기타 회사의 공지사항 페이지를 통하여 회원들에게 통지할 수 있습니다. 단, 회원 본인의 거래와 관련하여 중대한 영향을 미치는 사항은 상당한 기간 동안 게시판을 통해 이를 공지하고 회사가 부여한 이메일 주소로 개별통지 합니다.</p>
                      <p>③ 유료 서비스가 종료되는 경우에는 서비스를 이용하는 회원에게 반드시 제1항의 규정에 따라 이메일을 통하여 이를 고지하며 제16조 제4항의 규정에 따라 환불 처리합니다.</p>
                    </div>
                  </article>

                  <article id="chapter3-2" className="mb-8">
                    <h3 className="font-serif text-xl font-bold text-primary-900 mb-4">
                      제 10 조 (권리의 귀속 및 저작물의 이용)
                    </h3>
                    <div className="space-y-4 text-primary-700 leading-relaxed">
                      <p>① 회원이 서비스 내에 게시한 게시물 등(이하 &ldquo;게시물 등&rdquo;이라 합니다)의 저작권은 해당 게시물의 저작자에게 귀속됩니다.</p>
                      <p>② 게시물 등은 검색결과 내지 서비스 및 관련 프로모션 등에 노출될 수 있으며, 해당 노출을 위해 필요한 범위 내에서는 일부 수정, 복제, 편집되어 게시될 수 있습니다. 이 경우, 회사는 저작권법 규정을 준수하며, 회원은 언제든지 고객센터 또는 각 서비스 내 관리기능을 통해 해당 게시물 등에 대해 삭제, 검색결과 제외, 비공개 등의 조치를 취할 수 있습니다.</p>
                      <p>③ 회사는 제2항 이외의 방법으로 회원의 게시물 등을 이용하고자 하는 경우에는 전화, 팩스, 전자우편 등을 통해 사전에 회원의 동의를 얻습니다.</p>
                    </div>
                  </article>

                  <article id="chapter3-3" className="mb-8">
                    <h3 className="font-serif text-xl font-bold text-primary-900 mb-4">
                      제 11 조 (서비스 이용의 제한 및 중지)
                    </h3>
                    <div className="space-y-4 text-primary-700 leading-relaxed">
                      <p>① 회사는 아래 각 호의 1에 해당하는 사유가 발생한 경우에는 회원의 서비스 이용을 제한하거나 중지시킬 수 있습니다.</p>
                      <ul className="list-disc list-inside ml-4 space-y-2">
                        <li>회원이 회사 서비스의 운영을 고의∙과실로 방해하는 경우</li>
                        <li>회원이 제13조의 의무를 위반한 경우</li>
                        <li>서비스용 설비 점검, 보수 또는 공사로 인하여 부득이한 경우</li>
                        <li>전기통신사업법에 규정된 기간통신사업자가 전기통신 서비스를 중지했을 경우</li>
                        <li>국가비상사태, 서비스 설비의 장애 또는 서비스 이용의 폭주 등으로 서비스 이용에 지장이 있는 때</li>
                        <li>기타 중대한 사유로 인하여 회사가 서비스 제공을 지속하는 것이 부적당하다고 인정하는 경우</li>
                      </ul>
                      <p>② 회사는 전항의 규정에 의하여 서비스의 이용을 제한하거나 중지한 때에는 그 사유 및 제한기간등을 회원에게 알려야 합니다.</p>
                      <p>③ 제17조 제2항에 의해 회사가 회원과의 계약을 해지하고 탈퇴시키기로 결정한 경우 회사는 회원의 탈퇴 처리 전에 이를 통지하고, 회원은 회사의 통지를 받은 날로부터 30일 이내에 이에 대한 항변의 기회를 가집니다.</p>
                      <p className="text-sm text-primary-600">④ ~ ⑦항은 게시물 관련 임시조치 및 법적 조치에 관한 내용으로 원문을 참조하시기 바랍니다.</p>
                    </div>
                  </article>

                  <article id="chapter3-4" className="mb-8">
                    <h3 className="font-serif text-xl font-bold text-primary-900 mb-4">
                      제 12 조 (회사의 의무)
                    </h3>
                    <div className="space-y-4 text-primary-700 leading-relaxed">
                      <p>① 회사는 회사의 서비스 제공 및 보안과 관련된 설비를 지속적이고 안정적인 서비스 제공에 적합하도록 유지, 점검 또는 복구 등의 조치를 성실히 이행하여야 합니다.</p>
                      <p>② 회사는 회원이 수신 동의를 하지 않은 영리 목적의 광고성 전자우편, SMS 문자메시지 등을 발송하지 아니합니다.</p>
                      <p>③ 회사는 서비스의 제공과 관련하여 알게 된 회원의 개인정보를 본인의 승낙 없이 제3자에게 누설, 배포하지 않고, 이를 보호하기 위하여 노력합니다. 회원의 개인정보보호에 관한 기타의 사항은 정보통신망법 및 회사가 별도로 정한 &ldquo;개인정보관리지침&rdquo;에 따릅니다.</p>
                      <p>④ 회사가 제3자와의 서비스 제공계약 등을 체결하여 회원에게 서비스를 제공하는 경우 회사는 각 개별서비스에서 서비스의 제공을 위하여 제3자에게 제공되는 회원의 구체적인 회원정보를 명시하고 회원의 개별적이고 명시적인 동의를 받은 후 동의의 범위 내에서 해당 서비스의 제공 기간 동안에 한하여 회원의 개인정보를 제3자와 공유하는 등 관련 법령을 준수합니다.</p>
                    </div>
                  </article>

                  <article id="chapter3-5" className="mb-8">
                    <h3 className="font-serif text-xl font-bold text-primary-900 mb-4">
                      제 13 조 (회원의 의무)
                    </h3>
                    <div className="space-y-4 text-primary-700 leading-relaxed">
                      <p>① 회원은 아래 각 호의 1에 해당하는 행위를 하여서는 아니 됩니다.</p>
                      <ul className="list-disc list-inside ml-4 space-y-2 text-sm">
                        <li>회원가입신청 또는 변경 시 허위내용을 등록하는 행위</li>
                        <li>회사의 서비스에 게시된 정보를 변경하거나 서비스를 이용하여 얻은 정보를 회사의 사전 승낙 없이 영리 또는 비영리의 목적으로 복제, 출판, 방송 등에 사용하거나 제3자에게 제공하는 행위</li>
                        <li>회사 기타 제3자에 대한 허위의 사실을 게재하거나 지적재산권을 침해하는 등 회사나 제3자의 권리를 침해하는 행위</li>
                        <li>다른 회원의 ID 및 비밀번호를 도용하여 부당하게 서비스를 이용하는 행위</li>
                        <li>정크메일, 스팸메일, 행운의 편지, 피라미드 조직 가입 권유, 외설 또는 폭력적인 메시지 등 공서양속에 반하는 정보를 공개 또는 게시하는 행위</li>
                        <li>청소년보호법에서 규정하는 청소년유해매체물을 게시하는 행위</li>
                        <li>현행 법령, 회사가 제공하는 서비스에 정한 약관 기타 서비스 이용에 관한 규정을 위반하는 행위</li>
                      </ul>
                      <p>② 회사는 회원이 제1항의 행위를 하는 경우 해당 게시물 등을 삭제 또는 임시삭제할 수 있고 서비스의 이용을 제한하거나 일방적으로 본 계약을 해지할 수 있습니다.</p>
                      <p>③ 회사가 제공하는 서비스 중 관련 법령 등의 규정에 의하여 성인인증이 필요한 경우 회원은 해당 서비스를 이용하기 위하여 회사가 제공하는 방법에 따라 실명정보를 회사에 제공하여야 합니다.</p>
                    </div>
                  </article>

                  <article id="chapter3-6" className="mb-8">
                    <h3 className="font-serif text-xl font-bold text-primary-900 mb-4">
                      제 14 조 (양도금지)
                    </h3>
                    <p className="text-primary-700 leading-relaxed">
                      회원의 서비스 받을 권리는 이를 양도 내지 증여하거나 질권의 목적으로 사용할 수 없습니다.
                    </p>
                  </article>

                  <article id="chapter3-7" className="mb-8">
                    <h3 className="font-serif text-xl font-bold text-primary-900 mb-4">
                      제 15 조 (이용요금의 납입)
                    </h3>
                    <div className="space-y-4 text-primary-700 leading-relaxed">
                      <p>① 회원은 회사가 제공하는 서비스 중 유료서비스를 이용하는 경우 이용대금을 납부한 후 서비스를 이용하는 것을 원칙으로 합니다.</p>
                      <p>② 회사가 제공하는 유료서비스에 대한 이용요금의 결제 방법은 핸드폰결제, 신용카드결제, 일반전화결제, 계좌이체, 무통장입금 등이 있으며 각 유료서비스마다 결제 방법의 차이가 있을 수 있습니다.</p>
                      <p>③ 매월 정기적인 결제가 이루어지는 서비스의 경우 회원이 해당 서비스의 이용을 중단하고 정기 결제의 취소를 요청하지 않는 한 매월 결제가 이루어집니다.</p>
                      <p>④ 회사는 결제의 이행을 위하여 반드시 필요한 회원의 개인정보를 추가적으로 요구할 수 있으며, 회원은 회사가 요구하는 개인정보를 정확하게 제공하여야 합니다.</p>
                    </div>
                  </article>

                  <article id="chapter3-8" className="mb-8">
                    <h3 className="font-serif text-xl font-bold text-primary-900 mb-4">
                      제 16 조 (이용요금의 환불 및 이의제기)
                    </h3>
                    <div className="space-y-4 text-primary-700 leading-relaxed">
                      <p>① 회원이 과오 납입한 요금에 대하여는 회사는 그 요금을 환불하여야 합니다.</p>
                      <p>② 회원의 귀책사유로 이용요금을 환불하는 경우 일반적인 방법은 아래와 같습니다.</p>
                      <ul className="list-disc list-inside ml-4 space-y-2 text-sm">
                        <li>1회 이용으로 완료되는 서비스: 이용 후 환불 불가</li>
                        <li>1개월 이하 지속 서비스: 해지일로부터 이용일수 해당 금액 제외 후 환불</li>
                        <li>1개월 초과 지속 서비스: 이용일수 해당 금액 + 남은 일수의 30% 제외 후 환불 (단, 7일 이내 해지 시 이용일수만 제외)</li>
                      </ul>
                      <p>③ 제2항의 규정에도 불구하고 아래 각 호의 경우에는 전액을 환불합니다.</p>
                      <ul className="list-disc list-inside ml-4 space-y-2 text-sm">
                        <li>결제 후 서비스 이용 내역이 없는 경우</li>
                        <li>회사의 귀책사유로 서비스를 이용하지 못한 경우</li>
                        <li>서비스가 제공되지 않은 경우</li>
                        <li>서비스가 표시·광고와 상이하거나 현저한 차이가 있는 경우</li>
                      </ul>
                      <p>④ 회사의 귀책사유로 환불하는 경우 남은 이용일수 해당 금액과 그 금액의 10%를 추가로 환불합니다.</p>
                      <p>⑤ 이용요금에 대한 이의는 사유 발생을 안 날로부터 1월, 사유 발생일로부터 3월 이내에 제기하여야 합니다.</p>
                    </div>
                  </article>

                  <article id="chapter3-9" className="mb-8">
                    <h3 className="font-serif text-xl font-bold text-primary-900 mb-4">
                      제 17 조 (이용계약의 해지)
                    </h3>
                    <div className="space-y-4 text-primary-700 leading-relaxed">
                      <p>① 회원이 서비스 이용계약을 해지하고자 하는 때에는 언제든지 회원정보관리에서 회사가 정한 절차에 따라 회원의 ID를 삭제하고 탈퇴할 수 있습니다.</p>
                      <p>② 회원이 제13조의 규정을 위반한 경우 회사는 일방적으로 본 계약을 해지할 수 있고, 이로 인하여 서비스 운영에 손해가 발생한 경우 이에 대한 민, 형사상 책임도 물을 수 있습니다.</p>
                      <p>③ 회원이 서비스를 이용하는 도중, 연속하여 일(1)년 동안 서비스를 이용하기 위해 회사의 서비스에 log-in한 기록이 없는 경우 회사는 회원의 회원자격을 상실시킬 수 있습니다.</p>
                      <p>④ 유료서비스 이용계약의 해지는 회원의 서비스 해지신청 및 회사의 승낙에 의해 성립합니다.</p>
                    </div>
                  </article>
                </section>

                {/* Chapter 4 */}
                <section id="chapter4" className="mb-16">
                  <h2 className="font-serif text-3xl font-bold text-primary-900 mb-8 pb-4 border-b-2 border-primary-200">
                    제4장 기타
                  </h2>

                  <article id="chapter4-0" className="mb-8">
                    <h3 className="font-serif text-xl font-bold text-primary-900 mb-4">
                      제 18 조 (청소년 보호)
                    </h3>
                    <p className="text-primary-700 leading-relaxed">
                      회사는 모든 연령대가 자유롭게 이용할 수 있는 공간으로써 유해 정보로부터 청소년을 보호하고 청소년의 안전한 인터넷 사용을 돕기 위해 정보통신망법에서 정한 청소년보호정책을 별도로 시행하고 있으며, 구체적인 내용은 서비스 초기 화면 등에서 확인할 수 있습니다.
                    </p>
                  </article>

                  <article id="chapter4-1" className="mb-8">
                    <h3 className="font-serif text-xl font-bold text-primary-900 mb-4">
                      제 19 조 (면책)
                    </h3>
                    <div className="space-y-4 text-primary-700 leading-relaxed">
                      <p>① 회사는 다음 각 호의 경우로 서비스를 제공할 수 없는 경우 이로 인하여 회원에게 발생한 손해에 대해서는 책임을 부담하지 않습니다.</p>
                      <ul className="list-disc list-inside ml-4 space-y-2">
                        <li>천재지변 또는 이에 준하는 불가항력의 상태가 있는 경우</li>
                        <li>서비스 제공을 위하여 회사와 서비스 제휴계약을 체결한 제3자의 고의적인 서비스 방해가 있는 경우</li>
                        <li>회원의 귀책사유로 서비스 이용에 장애가 있는 경우</li>
                        <li>제1호 내지 제3호를 제외한 기타 회사의 고의∙과실이 없는 사유로 인한 경우</li>
                      </ul>
                      <p>② 회사는 앨범에 기제된 내용, 회원이 작성하는 등의 방법으로 서비스에 게재된 정보, 자료, 사실의 신뢰도, 정확성 등에 대해서는 보증을 하지 않으며 이로 인해 발생한 회원의 손해에 대하여는 책임을 부담하지 아니합니다.</p>
                    </div>
                  </article>

                  <article id="chapter4-2" className="mb-8">
                    <h3 className="font-serif text-xl font-bold text-primary-900 mb-4">
                      제 20 조 (분쟁의 해결)
                    </h3>
                    <p className="text-primary-700 leading-relaxed">
                      본 약관은 대한민국법령에 의하여 규정되고 이행되며, 서비스 이용과 관련하여 회사와 회원간에 발생한 분쟁에 대해서는 민사소송법상의 주소지를 관할하는 법원을 합의관할로 합니다.
                    </p>
                  </article>

                  <article id="chapter4-3" className="mb-8">
                    <h3 className="font-serif text-xl font-bold text-primary-900 mb-4">
                      제 21 조 (규정의 준용)
                    </h3>
                    <p className="text-primary-700 leading-relaxed">
                      본 약관에 명시되지 않은 사항에 대해서는 관련법령에 의하고, 법에 명시되지 않은 부분에 대하여는 관습에 의합니다.
                    </p>
                  </article>
                </section>

                {/* Appendix */}
                <section className="mt-12 pt-8 border-t border-primary-200">
                  <h3 className="font-serif text-xl font-bold text-primary-900 mb-4">부칙</h3>
                  <p className="text-primary-700">본 약관은 2006년 7월 9일부터 적용됩니다.</p>
                </section>
              </div>
            </main>
          </div>
        </div>

        {/* Contact CTA Section */}
        <section className="py-16 px-4 bg-gradient-to-br from-cream via-ivory to-white">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-secondary via-secondary/90 to-primary-900 rounded-2xl p-12 text-white text-center relative overflow-hidden shadow-elevated">
              <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 right-0 w-64 h-64 bg-accent rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
              </div>

              <div className="relative z-10">
                <h3 className="font-serif text-3xl font-bold mb-4">
                  약관에 대한 문의사항이 있으신가요?
                </h3>

                <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
                  이용약관에 대해 궁금하신 점이 있으시면
                  <br />
                  언제든지 고객센터로 문의해주세요.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href="mailto:support@mozartia.de"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white text-secondary rounded-full font-medium hover:bg-cream transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
                  >
                    이메일 문의하기
                  </a>
                  <a
                    href="/faq"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white rounded-full font-medium hover:bg-white/20 transition-all duration-300 border border-white/20"
                  >
                    FAQ 바로가기
                  </a>
                </div>

                <div className="mt-8 pt-8 border-t border-white/20">
                  <p className="text-sm text-white/70">
                    평일 10:00 - 18:00 (주말 및 공휴일 휴무)
                    <br />
                    이메일: support@mozartia.de
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
