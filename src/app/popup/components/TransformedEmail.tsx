import React, { useState } from "react";
import { Copy, Check } from "lucide-react";
import IconButton from "@/components/ui/icon-button";
import { LoadingDots } from "./LoadingDots";

interface TransformedEmailProps {
  loading: boolean;
  transformedEmail: string;
}

const TransformedEmail: React.FC<TransformedEmailProps> = ({
  loading,
  transformedEmail,
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);

      // 2초 후에 아이콘을 원래대로 되돌림
      setTimeout(() => {
        setIsCopied(false);
      }, 2000);
    } catch (err) {
      console.error("복사 중 오류가 발생했습니다:", err);
    }
  };

  if (!loading && !transformedEmail) return null;

  if (loading && !transformedEmail) {
    return (
      <div className="mt-4 border-gray-300 border rounded-md p-4 bg-gray-50">
        <LoadingDots isLoading={loading} />
      </div>
    );
  }

  return (
    <div className="mt-4 border border-gray-300 rounded-md p-4 bg-gray-50">
      <div className="flex items-center justify-between border-b border-gray-200 pb-2 mb-3">
        <h4 className="text-xs text-gray-600">변환된 내용</h4>
        {transformedEmail && (
          <div className="relative group">
            <IconButton
              icon={
                isCopied ? (
                  <Check size={16} className="text-[#d9db58]" />
                ) : (
                  <Copy size={16} />
                )
              }
              onClick={() => handleCopyToClipboard(transformedEmail)}
              aria-label="Copy to clipboard"
            />
          </div>
        )}
      </div>

      <p className="mt-2 text-gray-800 whitespace-pre-wrap">
        {transformedEmail}
      </p>
    </div>
  );
};

export default TransformedEmail;
