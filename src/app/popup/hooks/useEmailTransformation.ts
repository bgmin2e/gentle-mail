import { useState } from "react";
import { transformEmailAPI, createPrompt } from "../utils/emailUtils";
import { useEmailSettings } from "./useEmailSettings";

export const useEmailTransformation = () => {
  const { settings } = useEmailSettings();
  const [emailDraft, setEmailDraft] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [transformedEmail, setTransformedEmail] = useState<string>("");

  const transformEmail = async (text: string = emailDraft) => {
    if (!text.trim()) {
      return;
    }

    setLoading(true);
    setTransformedEmail("");

    try {
      const prompt = createPrompt(
        text,
        settings.favorabilityLevel,
        settings.hierarchyLevel,
        settings.purpose
      );

      await transformEmailAPI(prompt, (chunk) => {
        setTransformedEmail((prev) => prev + chunk);
      });
    } catch (error: unknown) {
      setTransformedEmail(
        "변환 중 오류가 발생했습니다: " +
          (error instanceof Error ? error.message : String(error))
      );
    } finally {
      setLoading(false);
    }
  };

  return {
    emailDraft,
    setEmailDraft,
    settings,
    loading,
    transformedEmail,
    transformEmail,
  };
};
