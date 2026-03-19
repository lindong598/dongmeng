import { create } from "zustand";

interface UIState {
  // Sidebar
  sidebarOpen: boolean;
  sidebarWidth: number;
  toggleSidebar: () => void;
  setSidebarWidth: (width: number) => void;

  // Theme
  theme: "dark" | "light";
  toggleTheme: () => void;

  // Active dream context
  activeDreamId: string | null;
  setActiveDreamId: (id: string | null) => void;
}

export const useUIStore = create<UIState>((set) => ({
  // Sidebar
  sidebarOpen: true,
  sidebarWidth: 280,
  toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
  setSidebarWidth: (w) => set({ sidebarWidth: w }),

  // Theme - dark by default (Dreamscape)
  theme: "dark",
  toggleTheme: () =>
    set((s) => {
      const next = s.theme === "dark" ? "light" : "dark";
      document.documentElement.classList.toggle("dark", next === "dark");
      document.documentElement.classList.toggle("light", next === "light");
      return { theme: next };
    }),

  // Active dream
  activeDreamId: null,
  setActiveDreamId: (id) => set({ activeDreamId: id }),
}));
