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
        try {
          const json = JSON.parse(line.replace("data: ", "").trim());
          const content = json.choices?.[0]?.delta?.content || "";
          const finishReason = json.choices?.[0]?.finish_reason;

          if (finishReason === "stop") break;

          if (content) {
            accumulatedText += content;
            // Call the callback with the new content if provided
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
    You are an advanced AI specialized in professional business communication. Your task is to rewrite the given email draft in a formal and culturally appropriate manner, adhering to South Korean business etiquette.

    **Settings:**
    - **Favorability Level (친밀도):** ${favorabilityLevel} / 100
    - **Hierarchy Level (공손함):** ${hierarchyLevel} / 100
    - **Purpose (목적):** ${purpose}

    **Rewrite Rules:**
    - 친밀도(${favorabilityLevel}) 값이 높을 경우, 문장에 이모티콘을 적절히 추가할 수 있습니다. 반면, 낮을 경우 더욱 공식적인 어조를 유지합니다.
    - 공손함(${hierarchyLevel}) 값이 낮으면 다소 캐주얼한 표현이나 농담을 포함할 수 있으며, 높으면 존댓말을 철저히 유지하고 더욱 정중한 표현을 사용해야 합니다.
    - 이메일의 목적이 '${purpose}'에 맞게 적절한 문장 구조를 사용해야 합니다.
      - **요청:** 부드러운 표현을 사용하여 협조를 구하는 문장을 작성합니다.
      - **보고:** 핵심 정보만 간결하게 전달합니다.
      - **사과:** 정중하고 진심 어린 사과를 표현하며, 필요하면 해결 방안을 제시합니다.

    **Original Email Draft:**
    ${text}

    **Transformed Email (Korean Business Style):**
  `;
};
