import { useState, useEffect } from "react";

export interface EmailSettings {
  favorabilityLevel: number;
  hierarchyLevel: number;
  purpose: "REQUEST" | "REPORT" | "APPOLOGY" | "OTHER";
}

const DEFAULT_SETTINGS: EmailSettings = {
  favorabilityLevel: 50,
  hierarchyLevel: 50,
  purpose: "OTHER",
};

export const SETTINGS_STORAGE_KEY = "email_transformation_settings";

export const useEmailSettings = () => {
  const [settings, setSettings] = useState<EmailSettings>(DEFAULT_SETTINGS);

  useEffect(() => {
    const savedSettings = localStorage.getItem(SETTINGS_STORAGE_KEY);
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (error) {
        console.error("Failed to parse saved settings:", error);
        localStorage.removeItem(SETTINGS_STORAGE_KEY);
      }
    }
  }, []);

  const updateSettings = (newSettings: Partial<EmailSettings>) => {
    setSettings((prev) => {
      const updated = { ...prev, ...newSettings };
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  };

  return {
    settings,
    updateSettings,
  };
};
