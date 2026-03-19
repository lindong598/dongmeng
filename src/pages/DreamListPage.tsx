import { useNavigate } from "react-router-dom";
import { useDreamStore } from "@/stores/dream-store";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PageTransition } from "@/components/layout/PageTransition";
import { Sparkles, CloudMoon } from "lucide-react";

export function DreamListPage() {
  const navigate = useNavigate();
  const dreams = useDreamStore((s) => s.dreams);
  const addDream = useDreamStore((s) => s.addDream);

  const handleNewDream = () => {
    const id = addDream();
    navigate(`/dream/${id}`);
  };

  return (
    <PageTransition>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-3xl text-aurora-cyan tracking-wide">
              梦境档案
            </h1>
            <p className="text-sm text-muted-foreground mt-1 font-serif">
              记录并重构你的梦境世界
            </p>
          </div>
          <Button
            variant="outline"
            className="gap-2 font-serif cursor-pointer"
            onClick={handleNewDream}
          >
            <Sparkles size={14} />
            记录新梦境
          </Button>
        </div>

        {/* Empty state */}
        {dreams.length === 0 && (
          <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
            <CloudMoon size={64} className="text-aurora-purple/40 animate-float" />
            <h2 className="font-display text-xl text-muted-foreground">
              还没有梦境记录
            </h2>
            <p className="text-sm text-muted-foreground/70 font-serif max-w-sm">
              点击「记录新梦境」开始捕捉你的第一个梦境吧
            </p>
            <Button
              variant="outline"
              className="gap-2 font-serif cursor-pointer mt-2"
              onClick={handleNewDream}
            >
              <Sparkles size={14} />
              开始记录
            </Button>
          </div>
        )}

        {/* Dream grid */}
        {dreams.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dreams.map((dream) => (
              <Card
                key={dream.id}
                className="glass cursor-pointer hover:scale-[1.02] transition-transform duration-200 hover:glow-cyan"
                onClick={() => navigate(`/dream/${dream.id}`)}
              >
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">{dream.emoji}</span>
                    <div>
                      <CardTitle className="font-display text-lg tracking-wide">
                        {dream.title || "未命名梦境"}
                      </CardTitle>
                      <CardDescription className="text-xs">
                        {dream.createdAt}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="font-serif text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                    {dream.description || "还没有内容..."}
                  </p>
                  <div className="mt-3 flex items-center gap-2 flex-wrap">
                    <span className="text-xs text-aurora-purple font-medium">
                      {dream.scenes.length} 个场景
                    </span>
                    <span className="text-xs text-muted-foreground">·</span>
                    <span className="text-xs text-aurora-green">
                      {dream.status === "draft" ? "草稿" : "已完成"}
                    </span>
                    {(dream.tags ?? []).length > 0 && (
                      <>
                        <span className="text-xs text-muted-foreground">·</span>
                        {(dream.tags ?? []).slice(0, 3).map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-[10px] px-1.5 py-0"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </PageTransition>
  );
}
