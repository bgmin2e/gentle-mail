export const transformEmailAPI = async (
  prompt: string,
  onChunk?: (chunk: string) => void
): Promise<string> => {
  const API_URL =
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000/api/transform"
      : "https://gentlemail.vercel.app/api/transform";

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      prompt: prompt,
    }),
  });

  if (!response.body) throw new Error("응답 본문이 없습니다.");

  const reader = response.body.getReader();
  const decoder = new TextDecoder("utf-8");

  let accumulatedText = "";

  while (true) {
    const { value, done } = await reader.read();
    if (done) break;

    const chunk = decoder.decode(value, { stream: true }).trim();

    // 개별 청크를 JSON 파싱
    const lines = chunk.split("\n");
    for (const line of lines) {
      if (line.startsWith("data: ")) {
        const data = line.replace("data: ", "").trim();

        // [DONE] 처리를 추가하여 JSON 파싱 오류 방지
        if (data === "[DONE]") {
          break;
        }

        try {
          const json = JSON.parse(data);
          const content = json.choices?.[0]?.delta?.content || "";
          const finishReason = json.choices?.[0]?.finish_reason;

          if (finishReason === "stop") break;

          if (content) {
            accumulatedText += content;
            if (onChunk) {
              onChunk(content);
            }
          }
        } catch (error) {
          console.error("JSON 파싱 오류:", error);
        }
      }
    }
  }

  return accumulatedText.replace(/^```(?:plaintext)?\n|\n```$/g, "");
};

export const createPrompt = (
  text: string,
  favorabilityLevel: number,
  hierarchyLevel: number,
  purpose: string
): string => {
  return `
    You are an advanced AI specialized in professional business communication. Your task is to rewrite the given email draft in a formal and culturally appropriate manner, strictly following South Korean business etiquette.

    **Guidelines for Rewriting:**
    1. **Favorability Level (친밀도) Adjustments:**
       - 친밀도(${favorabilityLevel}) 값이 **80 이상**이면, 문장을 보다 따뜻하고 친근한 톤으로 작성하고, 이모티콘과 부드러운 표현을 포함할 수 있습니다.
       - **40~79 사이**의 경우, 업무적이지만 약간의 인간적인 표현을 허용합니다.
       - **39 이하**이면, 엄격하게 격식을 유지하며 딱딱한 비즈니스 톤을 사용합니다. 개인적 감정을 배제하고 직설적인 표현을 사용합니다.
    2. **Hierarchy Level (공손함) Adjustments:**
      - 공손함(${hierarchyLevel}) 값이 **80 이상**이면, 가장 정중한 표현을 사용하며, 존댓말을 철저히 준수하고 겸양어와 경어를 적극 활용합니다.
      - **40~79 사이**이면, 기본적인 존댓말을 유지하지만 일부 캐주얼한 표현이 포함될 수 있습니다.
      - **39 이하**이면, 캐주얼한 반말 혹은 직접적인 표현을 포함할 수 있습니다.
    3. **Purpose-based Adjustments:**
      - ${purpose}에 맞게 적절한 문장 구조를 사용해야 합니다.
      - **요청(Request)**: 정중한 부탁의 표현을 사용하고, 가능한 이유와 함께 협조를 요청합니다. (예: "바쁘시겠지만, 혹시 가능하시다면 ~ 해주실 수 있을까요?")
      - **보고(Report)**: 불필요한 감정을 배제하고 핵심 정보만 명확하고 간결하게 전달합니다. (예: "지난주 목표 대비 20% 성과 증가가 있었습니다. 세부 사항은 아래 첨부합니다.")
      - **사과(Apology)**: 실수를 인정하고 진심 어린 사과를 포함하며, 가능하면 해결책을 제시합니다. (예: "이번 실수로 불편을 끼쳐드려 대단히 죄송합니다. 다시는 발생하지 않도록 개선 조치를 마련하겠습니다.")
      - **기타Other**: 위 세 가지 외의 경우, 기본적인 존댓말을 유지하며 업무적인 표현을 사용합니다.

    **Original Email Draft:**
    ${text}

    **Transformed Email (Korean Business Style):**
  `;
};
