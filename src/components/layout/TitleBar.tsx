import { useUIStore } from "@/stores/ui-store";
import {
  Moon,
  Sun,
  Minus,
  Square,
  X,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

export function TitleBar() {
  const { theme, toggleTheme, sidebarOpen, toggleSidebar } = useUIStore();

  const handleMinimize = async () => {
    try {
      const { getCurrentWindow } = await import("@tauri-apps/api/window");
      await getCurrentWindow().minimize();
    } catch {
      /* running in browser — no Tauri API */
    }
  };

  const handleMaximize = async () => {
    try {
      const { getCurrentWindow } = await import("@tauri-apps/api/window");
      await getCurrentWindow().toggleMaximize();
    } catch {
      /* browser fallback */
    }
  };

  const handleClose = async () => {
    try {
      const { getCurrentWindow } = await import("@tauri-apps/api/window");
      await getCurrentWindow().close();
    } catch {
      /* browser fallback */
    }
  };

  return (
    <header
      data-tauri-drag-region
      className="h-10 flex items-center justify-between px-3 glass select-none shrink-0 z-50"
    >
      {/* Left: sidebar toggle + app title */}
      <div className="flex items-center gap-2" data-tauri-drag-region>
        <button
          onClick={toggleSidebar}
          className="p-1.5 rounded-md hover:bg-white/10 transition-colors cursor-pointer"
        >
          {sidebarOpen ? (
            <PanelLeftClose size={16} />
          ) : (
            <PanelLeftOpen size={16} />
          )}
        </button>
        <span
          className="font-display text-lg text-aurora-cyan tracking-wide"
          data-tauri-drag-region
        >
          冬梦
        </span>
        <span
          className="text-xs text-muted-foreground hidden sm:inline"
          data-tauri-drag-region
        >
          DongMeng
        </span>
      </div>

      {/* Right: theme toggle + window controls */}
      <div className="flex items-center gap-0.5">
        <button
          onClick={toggleTheme}
          className="p-1.5 rounded-md hover:bg-white/10 transition-colors mr-2 cursor-pointer"
          title={theme === "dark" ? "切换到亮色主题" : "切换到暗色主题"}
        >
          {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
        </button>

        <button
          onClick={handleMinimize}
          className="p-1.5 rounded-md hover:bg-white/10 transition-colors cursor-pointer"
        >
          <Minus size={14} />
        </button>
        <button
          onClick={handleMaximize}
          className="p-1.5 rounded-md hover:bg-white/10 transition-colors cursor-pointer"
        >
          <Square size={12} />
        </button>
        <button
          onClick={handleClose}
          className="p-1.5 rounded-md hover:bg-red-500/80 transition-colors cursor-pointer"
        >
          <X size={14} />
        </button>
      </div>
    </header>
  );
}
