import React from "react";

export default function PrivacyPage() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Gentlemail 개인정보처리방침</h1>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">수집하는 개인정보 항목</h2>
        <p>- 사용자가 입력한 이메일 본문 텍스트</p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">개인정보의 수집 목적</h2>
        <p>
          - 이메일을 비즈니스 친화적인 형태로 변환하기 위한 목적으로만
          사용합니다.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          개인정보의 보관 및 이용 기간
        </h2>
        <p>
          - 서비스 제공 즉시 개인정보를 삭제하며 별도의 저장을 하지 않습니다.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">개인정보의 제3자 제공</h2>
        <p>
          - OpenAI의 AI 서비스를 이용하지만, 개인 식별 가능한 정보가 아닌 이메일
          콘텐츠 텍스트만 전달됩니다.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-xl font-semibold mb-2">
          개인정보 관리책임자 및 연락처
        </h2>
        <p>- 이메일: bgmin2e@gmail.com</p>
      </section>
    </div>
  );
}
