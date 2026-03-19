import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { PageTransition } from "@/components/layout/PageTransition";

const mockDreams = [
  {
    id: "1",
    title: "星空下的海洋",
    date: "2026-03-15",
    emoji: "🌊",
    description: "我站在一片无边的海洋前，头顶是旋转的星空，海水散发着微弱的荧光...",
    scenes: 3,
  },
  {
    id: "2",
    title: "飞翔的鲸鱼",
    date: "2026-03-14",
    emoji: "🐋",
    description: "巨大的蓝鲸从云层中穿出，身后拖着一道彩虹做成的尾迹...",
    scenes: 5,
  },
  {
    id: "3",
    title: "水晶森林",
    date: "2026-03-12",
    emoji: "🌲",
    description: "每棵树都由透明的水晶构成，阳光穿过时折射出万道彩虹...",
    scenes: 2,
  },
  {
    id: "4",
    title: "时间的迷宫",
    date: "2026-03-10",
    emoji: "🕰️",
    description: "走在不断变化的走廊中，每面墙上的时钟显示着不同的时间...",
    scenes: 4,
  },
];

export function DreamListPage() {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="font-display text-3xl text-aurora-cyan tracking-wide">
            梦境档案
          </h1>
          <p className="text-sm text-muted-foreground mt-1 font-serif">
            记录并重构你的梦境世界
          </p>
        </div>

        {/* Dream grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockDreams.map((dream) => (
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
                      {dream.title}
                    </CardTitle>
                    <CardDescription className="text-xs">
                      {dream.date}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="font-serif text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                  {dream.description}
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <span className="text-xs text-aurora-purple font-medium">
                    {dream.scenes} 个场景
                  </span>
                  <span className="text-xs text-muted-foreground">·</span>
                  <span className="text-xs text-aurora-green">草稿</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </PageTransition>
  );
}
