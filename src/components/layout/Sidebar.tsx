import { useState } from "react";
import { useUIStore } from "@/stores/ui-store";
import { useDreamStore } from "@/stores/dream-store";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate, useLocation } from "react-router-dom";
import { Sparkles, Search } from "lucide-react";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const { sidebarOpen, sidebarWidth } = useUIStore();
  const dreams = useDreamStore((s) => s.dreams);
  const addDream = useDreamStore((s) => s.addDream);
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState("");

  const filtered = search.trim()
    ? dreams.filter(
        (d) =>
          d.title.includes(search) ||
          d.description.includes(search) ||
          d.emoji.includes(search)
      )
    : dreams;

  const handleNewDream = () => {
    const id = addDream();
    navigate(`/dream/${id}`);
  };

  return (
    <aside
      className={cn(
        "h-full glass-heavy flex flex-col transition-all duration-300 ease-in-out shrink-0 z-40",
        !sidebarOpen && "opacity-0 pointer-events-none"
      )}
      style={{ width: sidebarOpen ? sidebarWidth : 0, overflow: "hidden" }}
    >
      {/* New dream button */}
      <div className="p-3 border-b border-sidebar-border space-y-2">
        <Button
          variant="outline"
          className="w-full gap-2 font-serif cursor-pointer"
          onClick={handleNewDream}
        >
          <Sparkles size={14} />
          记录新梦境
        </Button>

        {/* Search */}
        <div className="relative">
          <Search
            size={14}
            className="absolute left-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            placeholder="搜索梦境..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8 h-8 text-xs bg-transparent"
          />
        </div>
      </div>

      {/* Dream list */}
      <ScrollArea className="flex-1">
        <div className="p-2 space-y-1">
          {filtered.length === 0 && (
            <p className="text-xs text-muted-foreground text-center py-6 font-serif">
              {search ? "没有找到匹配的梦境" : "还没有梦境记录"}
            </p>
          )}
          {filtered.map((dream) => {
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
                    <p className="font-serif text-sm truncate">
                      {dream.title || "未命名梦境"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {dream.createdAt}
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
        {dreams.length} 个梦境
      </div>
    </aside>
  );
}
