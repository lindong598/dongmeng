import { useUIStore } from "@/stores/ui-store";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for Phase 1
const mockDreams = [
  { id: "1", title: "星空下的海洋", date: "2026-03-15", emoji: "🌊" },
  { id: "2", title: "飞翔的鲸鱼", date: "2026-03-14", emoji: "🐋" },
  { id: "3", title: "水晶森林", date: "2026-03-12", emoji: "🌲" },
  { id: "4", title: "时间的迷宫", date: "2026-03-10", emoji: "🕰️" },
  { id: "5", title: "月光下的花园", date: "2026-03-08", emoji: "🌙" },
];

export function Sidebar() {
  const { sidebarOpen, sidebarWidth } = useUIStore();
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside
      className={cn(
        "h-full glass-heavy flex flex-col transition-all duration-300 ease-in-out shrink-0 z-40",
        !sidebarOpen && "opacity-0 pointer-events-none"
      )}
      style={{ width: sidebarOpen ? sidebarWidth : 0, overflow: "hidden" }}
    >
      {/* New dream button */}
      <div className="p-3 border-b border-sidebar-border">
        <Button
          variant="outline"
          className="w-full gap-2 font-serif cursor-pointer"
        >
          <Sparkles size={14} />
          记录新梦境
        </Button>
      </div>

      {/* Dream list */}
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {mockDreams.map((dream) => {
            const isActive = location.pathname === `/dream/${dream.id}`;
            return (
              <button
                key={dream.id}
                onClick={() => navigate(`/dream/${dream.id}`)}
                className={cn(
                  "w-full text-left p-3 rounded-lg transition-all duration-200 cursor-pointer",
                  isActive
                    ? "bg-sidebar-accent text-sidebar-accent-foreground glow-cyan"
                    : "hover:bg-sidebar-accent/40"
                )}
              >
                <div className="flex items-center gap-2">
                  <span className="text-lg">{dream.emoji}</span>
                  <div className="min-w-0">
                    <p className="font-serif text-sm truncate">{dream.title}</p>
                    <p className="text-xs text-muted-foreground">
                      {dream.date}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      </ScrollArea>

      {/* Bottom: dream count */}
      <div className="p-3 border-t border-sidebar-border text-xs text-muted-foreground text-center">
        {mockDreams.length} 个梦境
      </div>
    </aside>
  );
}
