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
    You are an advanced AI specialized in professional business communication. Your task is to rewrite the given email draft in a formal and culturally appropriate manner, following South Korean business etiquette.

    **Guidelines for Rewriting:**
    1. **Favorability Level Adjustments:**
       - If the favorability level is **80 or above**, use a warm and friendly tone, including emoticons and softer expressions where appropriate. Make sure to use emoticons and softer expressions.
       - If it is **between 40 and 79**, maintain a professional tone but allow for slight human-like expressions.
       - If it is **below 39**, strictly adhere to a formal business tone, avoiding personal emotions and using direct expressions.
    2. **Hierarchy Level Adjustments:**
      - If the hierarchy level is **80 or above**, use the most polite expressions, strictly adhering to honorifics and humble language.
      - If it is **between 40 and 79**, maintain basic honorifics but allow for slightly casual expressions.
      - If it is **below 39**, include casual or direct expressions where necessary.
    3. **Purpose-based Adjustments:**
      - The email should be structured appropriately according to its purpose.
      - **Request:** Use polite request expressions and, if possible, provide reasons to encourage cooperation. (e.g., "I understand you may be busy, but if possible, could you please ~?")
      - **Report:** Exclude unnecessary emotions and convey key information clearly and concisely. (e.g., "There was a 20% performance increase compared to last week's target. Details are attached below.")
      - **Apology:** Acknowledge mistakes, include a sincere apology, and provide possible solutions if applicable. (e.g., "I sincerely apologize for the inconvenience caused by this mistake. We have taken corrective measures to prevent recurrence.")
      - **Other:** For cases outside of these three categories, maintain basic honorifics and use professional expressions.

    **Original Email Draft:**
    ${text}

    **Current Settings:**
    - Favorability Level: ${favorabilityLevel}
    - Hierarchy Level: ${hierarchyLevel}
    - Purpose: ${purpose}

    **Transformed Email (Korean Business Style):**
  `;
};
