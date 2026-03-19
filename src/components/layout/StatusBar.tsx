import { useUIStore } from "@/stores/ui-store";

export function StatusBar() {
  const { theme } = useUIStore();

  return (
    <footer className="h-7 flex items-center justify-between px-3 text-xs text-muted-foreground glass border-t border-border shrink-0 z-50">
      <span className="font-serif">冬梦 v0.1.0</span>
      <div className="flex items-center gap-3">
        <span>主题: {theme === "dark" ? "深夜" : "白昼"}</span>
        <span className="flex items-center gap-1">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-aurora-green animate-shimmer" />
          已就绪
        </span>
      </div>
    </footer>
  );
}
