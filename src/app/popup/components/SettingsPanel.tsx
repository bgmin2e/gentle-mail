import React, { useState } from "react";
import { Settings } from "lucide-react";

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Slider } from "@/components/ui/slider";
import IconButton from "@/components/ui/icon-button";
import { EmailSettings } from "../hooks/useEmailSettings";

interface SettingsPanelProps {
  settings: EmailSettings;
  onSettingsChange: (settings: Partial<EmailSettings>) => void;
}

const SettingsPanel: React.FC<SettingsPanelProps> = ({
  settings,
  onSettingsChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Popover open={isOpen}>
        <PopoverTrigger asChild>
          <IconButton
            icon={<Settings size={16} />}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Settings"
          />
        </PopoverTrigger>
        <PopoverContent
          align="end"
          sideOffset={5}
          className="w-60 p-4 bg-gray-100/80 backdrop-blur-[2px] shadow-sm rounded-md text-gray-900 border border-gray-100"
        >
          <div className="mb-4 flex flex-col gap-2">
            <label className="text-xs text-gray-900">호감도</label>
            <Slider
              value={[settings.favorabilityLevel]}
              onValueChange={(v) =>
                onSettingsChange({ favorabilityLevel: v[0] })
              }
              min={0}
              max={100}
              step={10}
              className="bg-gray-200 rounded-lg h-2"
            />
            <div className="flex justify-between text-[10px] text-gray-400">
              <span>낮음</span>
              <span>높음</span>
            </div>
          </div>

          <div className="mb-4 flex flex-col gap-2">
            <label className="text-xs text-gray-900">공손함</label>
            <Slider
              value={[settings.hierarchyLevel]}
              onValueChange={(v) => onSettingsChange({ hierarchyLevel: v[0] })}
              min={0}
              max={100}
              step={10}
              className="bg-gray-200 rounded-lg h-2"
            />
            <div className="flex justify-between text-[10px] text-gray-400">
              <span>낮음</span>
              <span>높음</span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs text-gray-900">목적</label>
            <div className="flex gap-2">
              <label className="flex items-center gap-1 text-xs">
                <input
                  type="radio"
                  name="purpose"
                  value="요청"
                  checked={settings.purpose === "REQUEST"}
                  onChange={() => onSettingsChange({ purpose: "REQUEST" })}
                />
                요청
              </label>
              <label className="flex items-center gap-1 text-xs">
                <input
                  type="radio"
                  name="purpose"
                  value="REPORT"
                  checked={settings.purpose === "REPORT"}
                  onChange={() => onSettingsChange({ purpose: "REPORT" })}
                />
                보고
              </label>
              <label className="flex items-center gap-1 text-xs">
                <input
                  type="radio"
                  name="purpose"
                  value="APPOLOGY"
                  checked={settings.purpose === "APPOLOGY"}
                  onChange={() => onSettingsChange({ purpose: "APPOLOGY" })}
                />
                사과
              </label>
              <label className="flex items-center gap-1 text-xs">
                <input
                  type="radio"
                  name="purpose"
                  value="OTHER"
                  checked={settings.purpose === "OTHER"}
                  onChange={() => onSettingsChange({ purpose: "OTHER" })}
                />
                기타
              </label>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SettingsPanel;
