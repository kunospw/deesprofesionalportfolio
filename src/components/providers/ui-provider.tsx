"use client";

import { createContext, useContext, useMemo, useState } from "react";

type UIState = {
  commandOpen: boolean;
  setCommandOpen: (open: boolean | ((open: boolean) => boolean)) => void;
  chatOpen: boolean;
  setChatOpen: (open: boolean | ((open: boolean) => boolean)) => void;
};

const UIContext = createContext<UIState | null>(null);

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [commandOpen, setCommandOpen] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  const value = useMemo(
    () => ({ commandOpen, setCommandOpen, chatOpen, setChatOpen }),
    [commandOpen, chatOpen],
  );

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
}

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used inside <UIProvider>");
  return ctx;
}
