import { useState, useCallback, useRef, useEffect } from "react";
import { useUIStore } from "@/stores/ui-store";
import { useDreamStore } from "@/stores/dream-store";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useNavigate, useLocation } from "react-router-dom";
import { Sparkles, Search, BarChart3, Tag, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const { sidebarOpen, sidebarWidth, setSidebarWidth } = useUIStore();
  const dreams = useDreamStore((s) => s.dreams);
  const addDream = useDreamStore((s) => s.addDream);
  const getAllTags = useDreamStore((s) => s.getAllTags);
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [showTags, setShowTags] = useState(false);

  // ---- Drag resize logic ----
  const isResizing = useRef(false);
  const startX = useRef(0);
  const startWidth = useRef(0);

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      isResizing.current = true;
      startX.current = e.clientX;
      startWidth.current = sidebarWidth;
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
    },
    [sidebarWidth]
  );

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!isResizing.current) return;
      const delta = e.clientX - startX.current;
      const newWidth = Math.min(Math.max(startWidth.current + delta, 200), 500);
      setSidebarWidth(newWidth);
    };
    const onMouseUp = () => {
      if (!isResizing.current) return;
      isResizing.current = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [setSidebarWidth]);

  // ---- Filtering ----
  const filtered = dreams.filter((d) => {
    if (activeTag && !(d.tags ?? []).includes(activeTag)) return false;
    if (!search.trim()) return true;
    return (
      d.title.includes(search) ||
      d.description.includes(search) ||
      d.emoji.includes(search) ||
      (d.tags ?? []).some((t) => t.includes(search))
    );
  });

  const handleNewDream = () => {
    const id = addDream();
    navigate(`/dream/${id}`);
  };

  const allTags = getAllTags();

  return (
    <>
      <aside
        className={cn(
          "h-full glass-heavy flex flex-col transition-all duration-300 ease-in-out shrink-0 z-40 relative",
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

          {/* Tag filter toggle + Stats link */}
          <div className="flex items-center gap-1">
            <Button
              variant={showTags ? "secondary" : "ghost"}
              size="sm"
              className="h-7 text-xs gap-1 cursor-pointer flex-1"
              onClick={() => setShowTags(!showTags)}
            >
              <Tag size={12} />
              标签 {activeTag && `· ${activeTag}`}
            </Button>
            {activeTag && (
              <button
                className="text-muted-foreground hover:text-foreground cursor-pointer p-1"
                onClick={() => setActiveTag(null)}
              >
                <X size={12} />
              </button>
            )}
            <Button
              variant={location.pathname === "/stats" ? "secondary" : "ghost"}
              size="sm"
              className="h-7 text-xs gap-1 cursor-pointer"
              onClick={() => navigate("/stats")}
            >
              <BarChart3 size={12} />
              统计
            </Button>
          </div>

          {/* Tag cloud */}
          {showTags && allTags.length > 0 && (
            <div className="flex flex-wrap gap-1 pt-1">
              {allTags.map((tag) => (
                <Badge
                  key={tag}
                  variant={activeTag === tag ? "default" : "outline"}
                  className="text-[10px] cursor-pointer hover:bg-primary/20 transition-colors"
                  onClick={() =>
                    setActiveTag(activeTag === tag ? null : tag)
                  }
                >
                  {tag}
                </Badge>
              ))}
            </div>
          )}
        </div>

        {/* Dream list */}
        <ScrollArea className="flex-1">
          <div className="p-2 space-y-1">
            {filtered.length === 0 && (
              <p className="text-xs text-muted-foreground text-center py-6 font-serif">
                {search || activeTag
                  ? "没有找到匹配的梦境"
                  : "还没有梦境记录"}
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
                    <div className="min-w-0 flex-1">
                      <p className="font-serif text-sm truncate">
                        {dream.title || "未命名梦境"}
                      </p>
                      <div className="flex items-center gap-1">
                        <span className="text-xs text-muted-foreground">
                          {dream.createdAt}
                        </span>
                        {(dream.tags ?? []).length > 0 && (
                          <span className="text-[10px] text-aurora-purple">
                            · {(dream.tags ?? []).slice(0, 2).join(", ")}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </ScrollArea>

        {/* Bottom: dream count */}
        <div className="p-3 border-t border-sidebar-border text-xs text-muted-foreground text-center">
          {filtered.length === dreams.length
            ? `${dreams.length} 个梦境`
            : `${filtered.length} / ${dreams.length} 个梦境`}
        </div>

        {/* Resize handle */}
        {sidebarOpen && (
          <div
            onMouseDown={onMouseDown}
            className="absolute top-0 right-0 w-1 h-full cursor-col-resize hover:bg-aurora-cyan/30 active:bg-aurora-cyan/50 transition-colors z-50"
          />
        )}
      </aside>
    </>
  );
}
