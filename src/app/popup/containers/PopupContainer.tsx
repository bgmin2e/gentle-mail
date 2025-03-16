import React, { useEffect } from "react";
import { X } from "lucide-react";

import SettingsPanel from "../components/SettingsPanel";
import EmailInput from "../components/EmailInput";
import TransformedEmail from "../components/TransformedEmail";
import { useEmailTransformation } from "../hooks/useEmailTransformation";
import IconButton from "@/components/ui/icon-button";
import { useEmailSettings } from "../hooks/useEmailSettings";

function PopupContainer() {
  const {
    emailDraft,
    setEmailDraft,
    loading,
    transformedEmail,
    transformEmail,
  } = useEmailTransformation();
  const { settings, updateSettings } = useEmailSettings();

  const isButtonDisabled = !emailDraft.trim() || loading;

  // 텍스트 드래그 이벤트 처리
  // 드래그된 텍스트를 받아 원본 이메일 text area에 넣어줌
  useEffect(() => {
    const handleContextMenuTransform = (
      request: { action: string; text: string },
      sender: chrome.runtime.MessageSender,
      sendResponse: (response: { success: boolean }) => void
    ) => {
      if (request.action === "transformSelectedText" && request.text) {
        setEmailDraft(request.text);
        transformEmail(request.text);
        sendResponse({ success: true });
      }
    };

    chrome.runtime.onMessage.addListener(handleContextMenuTransform);

    return () => {
      chrome.runtime.onMessage.removeListener(handleContextMenuTransform);
    };
  }, [settings]); // settings 최신값이 반영되도록 보장

  useEffect(() => {
    console.log(transformedEmail, "transformedEmail");
  }, [transformedEmail]);

  return (
    <div className="w-ful max-w-lg mx-auto px-4 pb-4 pt-3 relative">
      {/* Header */}
      <div className="flex items-center justify-between pb-3">
        <h3 className="text-base font-semibold text-gray-700">📧 Gentlemail</h3>
        <div className="flex items-center gap-1">
          <SettingsPanel
            settings={settings}
            onSettingsChange={updateSettings}
          />
          <IconButton icon={<X size={16} />} onClick={window.close} />
        </div>
      </div>

      {/* Email Input */}
      <EmailInput
        emailDraft={emailDraft}
        setEmailDraft={setEmailDraft}
        onTransform={transformEmail}
        isButtonDisabled={isButtonDisabled}
        loading={loading}
      />

      {/* Transformed Email Output */}
      <TransformedEmail loading={loading} transformedEmail={transformedEmail} />

      {/* TODO: Add Usage Info */}
    </div>
  );
}

export default PopupContainer;
