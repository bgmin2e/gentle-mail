import React from "react";
import TransformButton from "./TransformButton";

interface OriginalEmailInputProps {
  emailDraft: string;
  setEmailDraft: (value: string) => void;
  onTransform: (text: string) => void;
  isButtonDisabled: boolean;
  loading: boolean;
}

const OriginalEmailInput: React.FC<OriginalEmailInputProps> = ({
  emailDraft,
  setEmailDraft,
  onTransform,
  isButtonDisabled,
  loading,
}) => {
  return (
    <div className="relative border border-gray-300 rounded-lg">
      <textarea
        className="w-full h-40 mb-12 p-3"
        placeholder="원본 이메일을 입력해주세요."
        value={emailDraft}
        onChange={(e) => setEmailDraft(e.target.value)}
      />

      <TransformButton
        isButtonDisabled={isButtonDisabled}
        loading={loading}
        onTransform={() => onTransform(emailDraft)}
      />
    </div>
  );
};

export default OriginalEmailInput;
