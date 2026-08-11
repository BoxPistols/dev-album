import { useState, useCallback } from "react";

const STORAGE_KEY = "chat-settings";

export type ChatProvider = "openai" | "gemini";

export interface ChatModelOption {
  id: string;
  label: string;
  provider: ChatProvider;
  requiresUserKey: boolean;
}

export const MODEL_OPTIONS: ChatModelOption[] = [
  {
    id: "gpt-5.6-luna",
    label: "GPT-5.6 Luna",
    provider: "openai",
    requiresUserKey: false,
  },
  {
    id: "gpt-5.4-mini",
    label: "GPT-5.4 Mini",
    provider: "openai",
    requiresUserKey: true,
  },
];

interface ChatSettings {
  modelId: string;
  userApiKey: string;
  inviteCode: string;
}

const DEFAULT_SETTINGS: ChatSettings = {
  modelId: "gpt-5.6-luna",
  userApiKey: "",
  inviteCode: "",
};

function loadSettings(): ChatSettings {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SETTINGS;
    return { ...DEFAULT_SETTINGS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_SETTINGS;
  }
}

function saveSettings(settings: ChatSettings) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(settings));
}

export function useChatSettings() {
  const [settings, setSettings] = useState<ChatSettings>(loadSettings);

  const selectedModel =
    MODEL_OPTIONS.find((m) => m.id === settings.modelId) || MODEL_OPTIONS[0];

  // ユーザーキーが必要なモデルでキー未設定なら利用不可
  const isModelAvailable =
    !selectedModel.requiresUserKey || settings.userApiKey.length > 0;

  const setModelId = useCallback((modelId: string) => {
    setSettings((prev) => {
      const next = { ...prev, modelId };
      saveSettings(next);
      return next;
    });
  }, []);

  const setUserApiKey = useCallback((userApiKey: string) => {
    setSettings((prev) => {
      const next = { ...prev, userApiKey };
      saveSettings(next);
      return next;
    });
  }, []);

  const setInviteCode = useCallback((inviteCode: string) => {
    setSettings((prev) => {
      const next = { ...prev, inviteCode };
      saveSettings(next);
      return next;
    });
  }, []);

  return {
    modelId: settings.modelId,
    userApiKey: settings.userApiKey,
    inviteCode: settings.inviteCode,
    selectedModel,
    isModelAvailable,
    setModelId,
    setUserApiKey,
    setInviteCode,
  };
}
