import { useParams, useNavigate } from "react-router-dom";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { PageTransition } from "@/components/layout/PageTransition";
import { ArrowLeft, Wand2, ImagePlus, Sparkles } from "lucide-react";

// Mock dream data keyed by id
const mockDreamData: Record<
  string,
  { title: string; emoji: string; description: string; scenes: string[] }
> = {
  "1": {
    title: "星空下的海洋",
    emoji: "🌊",
    description:
      "我站在一片无边的海洋前，头顶是旋转的星空。海水呈现出深邃的靛蓝色，波浪轻轻拍打着我的脚踝。远处，一座水晶灯塔发出柔和的光芒，指引着某个未知的方向。海面上漂浮着无数发光的水母，像是坠落的星辰。",
    scenes: ["海边黄昏", "水晶灯塔", "深海漩涡"],
  },
  "2": {
    title: "飞翔的鲸鱼",
    emoji: "🐋",
    description:
      "巨大的蓝鲸从云层中穿出，身后拖着一道彩虹做成的尾迹。我骑在鲸鱼的背上，穿越一座座浮空的岛屿。",
    scenes: ["云海鲸鱼", "浮空岛屿", "彩虹瀑布", "星空降落", "梦醒时分"],
  },
  "3": {
    title: "水晶森林",
    emoji: "🌲",
    description:
      "每棵树都由透明的水晶构成，阳光穿过时折射出万道彩虹。森林深处有一条银色的小溪，流淌着液态的月光。",
    scenes: ["水晶入口", "月光溪流"],
  },
  "4": {
    title: "时间的迷宫",
    emoji: "🕰️",
    description:
      "走在不断变化的走廊中，每面墙上的时钟显示着不同的时间。有的指针倒转，有的飞速旋转。在迷宫的中心，我找到了一扇没有钥匙的门。",
    scenes: ["入口大厅", "钟表走廊", "镜像房间", "无钥之门"],
  },
  "5": {
    title: "月光下的花园",
    emoji: "🌙",
    description:
      "月光如水般倾泻在花园中，每朵花都在轻轻哼唱着不同的旋律。蝴蝶的翅膀上写满了古老的文字。",
    scenes: ["月光花径", "歌唱花朵", "文字蝴蝶"],
  },
};

export function DreamEditorPage() {
  const { dreamId } = useParams();
  const navigate = useNavigate();

  const dream = dreamId ? mockDreamData[dreamId] : null;
  const title = dream?.title ?? "未知梦境";
  const description = dream?.description ?? "";
  const scenes = dream?.scenes ?? [];

  return (
    <PageTransition>
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Back button */}
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer group"
        >
          <ArrowLeft
            size={14}
            className="group-hover:-translate-x-0.5 transition-transform"
          />
          返回梦境列表
        </button>

        {/* Dream header */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{dream?.emoji ?? "💭"}</span>
            <Input
              className="font-display text-2xl bg-transparent border-none p-0 h-auto
                         focus-visible:ring-0 placeholder:text-muted-foreground/50"
              placeholder="输入梦境标题..."
              defaultValue={title}
            />
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-aurora-cyan border-aurora-cyan/30">
              草稿
            </Badge>
            <span className="text-xs text-muted-foreground">
              梦境 #{dreamId} · 创建于 2026-03-15
            </span>
          </div>
        </div>

        <Separator className="opacity-30" />

        {/* Dream narrative */}
        <div className="space-y-3">
          <h2 className="font-display text-lg text-aurora-cyan flex items-center gap-2">
            <Sparkles size={16} />
            梦境叙述
          </h2>
          <Textarea
            className="min-h-[200px] font-serif text-base leading-relaxed glass
                       resize-none focus-visible:ring-aurora-cyan/50 p-4"
            placeholder="闭上眼睛，回忆你的梦境..."
            defaultValue={description}
          />
        </div>

        <Separator className="opacity-30" />

        {/* Scene timeline */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg text-aurora-purple flex items-center gap-2">
              <ImagePlus size={16} />
              场景时间线
            </h2>
            <Button
              variant="outline"
              size="sm"
              className="gap-1 cursor-pointer"
            >
              <ImagePlus size={14} /> 添加场景
            </Button>
          </div>

          <div className="flex gap-4 overflow-x-auto pb-3">
            {scenes.map((scene, i) => (
              <Card key={i} className="glass min-w-[220px] shrink-0 hover:glow-purple transition-shadow duration-300">
                <CardContent className="p-4">
                  <div className="h-32 rounded-lg bg-gradient-to-br from-aurora-blue/20 to-aurora-purple/20 flex items-center justify-center text-muted-foreground text-xs mb-3 border border-border/30">
                    <div className="text-center space-y-1">
                      <ImagePlus size={24} className="mx-auto opacity-40" />
                      <span className="opacity-60">等待生成</span>
                    </div>
                  </div>
                  <p className="font-serif text-sm">{scene}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    场景 {i + 1}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Separator className="opacity-30" />

        {/* AI generation placeholder */}
        <Card className="glass border-aurora-cyan/30 glow-cyan">
          <CardHeader>
            <CardTitle className="font-display text-lg flex items-center gap-2">
              <Wand2 size={18} className="text-aurora-cyan" />
              AI 图像生成
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground font-serif leading-relaxed">
              AI 图像生成功能将在后续版本中开放。届时，你可以将梦境叙述自动分解为场景，
              并生成草图 → 迭代微调 → 定稿精图。支持 OpenAI GPT Image、Stability
              AI、本地 ComfyUI 等多种生成引擎。
            </p>
            <Button disabled className="mt-4 gap-2 cursor-not-allowed">
              <Wand2 size={14} /> 生成梦境图像（即将推出）
            </Button>
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  );
}
