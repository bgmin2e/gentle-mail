import React from "react";
import { Wand2 } from "lucide-react";

interface TransformButtonProps {
  isButtonDisabled: boolean;
  loading: boolean;
  onTransform: () => void;
}

const BUTTON_TEXT = "Transform";

const TransformButton: React.FC<TransformButtonProps> = ({
  isButtonDisabled,
  loading,
  onTransform,
}) => {
  return (
    <button
      className={`absolute bottom-3 right-3 py-2 px-4 rounded-lg text-white font-semibold transition flex items-center justify-center ${
        !isButtonDisabled
          ? "bg-[#d9db58] hover:bg-[#dfe060]"
          : "bg-[#d9db5880] cursor-not-allowed"
      }`}
      disabled={isButtonDisabled}
      onClick={onTransform}
    >
      {loading ? (
        <>
          <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2" />
          <span>{BUTTON_TEXT}</span>
        </>
      ) : (
        <>
          <Wand2 size={18} className="mr-1" /> <span>{BUTTON_TEXT}</span>
        </>
      )}
    </button>
  );
};

export default TransformButton;
