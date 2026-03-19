import { useMemo } from "react";
import { useDreamStore } from "@/stores/dream-store";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { PageTransition } from "@/components/layout/PageTransition";
import {
  BarChart3,
  Moon,
  Tag,
  Calendar,
  Film,
  TrendingUp,
} from "lucide-react";

export function StatsPage() {
  const dreams = useDreamStore((s) => s.dreams);

  const stats = useMemo(() => {
    const totalDreams = dreams.length;
    const totalScenes = dreams.reduce((sum, d) => sum + d.scenes.length, 0);
    const completedDreams = dreams.filter((d) => d.status === "completed").length;
    const draftDreams = totalDreams - completedDreams;
    const avgScenes = totalDreams > 0 ? (totalScenes / totalDreams).toFixed(1) : "0";
    const totalChars = dreams.reduce((sum, d) => sum + d.description.length, 0);

    // Tag frequency
    const tagCount: Record<string, number> = {};
    dreams.forEach((d) => d.tags.forEach((t) => {
      tagCount[t] = (tagCount[t] || 0) + 1;
    }));
    const topTags = Object.entries(tagCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 12);

    // Keyword extraction (simple Chinese word frequency from descriptions, 2-4 char segments)
    const wordCount: Record<string, number> = {};
    const stopWords = new Set(["的", "了", "在", "是", "我", "有", "和", "就", "不", "人", "都", "一", "一个", "上", "也", "很", "到", "说", "要", "去", "你", "会", "着", "没有", "看", "好", "自己", "这", "他", "她", "它"]);
    dreams.forEach((d) => {
      // Extract 2-4 char Chinese segments
      const text = d.title + d.description;
      for (let len = 2; len <= 4; len++) {
        for (let i = 0; i <= text.length - len; i++) {
          const word = text.slice(i, i + len);
          if (/^[\u4e00-\u9fff]+$/.test(word) && !stopWords.has(word)) {
            wordCount[word] = (wordCount[word] || 0) + 1;
          }
        }
      }
    });
    const keywords = Object.entries(wordCount)
      .filter(([, count]) => count >= 2)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20);

    // Emoji frequency
    const emojiCount: Record<string, number> = {};
    dreams.forEach((d) => {
      emojiCount[d.emoji] = (emojiCount[d.emoji] || 0) + 1;
    });
    const topEmojis = Object.entries(emojiCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 8);

    // Monthly distribution
    const monthCount: Record<string, number> = {};
    dreams.forEach((d) => {
      const month = d.createdAt.slice(0, 7); // YYYY-MM
      monthCount[month] = (monthCount[month] || 0) + 1;
    });
    const months = Object.entries(monthCount).sort((a, b) => a[0].localeCompare(b[0]));

    return {
      totalDreams,
      totalScenes,
      completedDreams,
      draftDreams,
      avgScenes,
      totalChars,
      topTags,
      keywords,
      topEmojis,
      months,
    };
  }, [dreams]);

  return (
    <PageTransition>
      <div className="space-y-6 max-w-5xl mx-auto">
        {/* Header */}
        <div>
          <h1 className="font-display text-3xl text-aurora-cyan tracking-wide flex items-center gap-3">
            <BarChart3 size={28} />
            统计面板
          </h1>
          <p className="text-sm text-muted-foreground mt-1 font-serif">
            你的梦境世界一览
          </p>
        </div>

        {/* Overview cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {[
            { label: "梦境总数", value: stats.totalDreams, icon: Moon, color: "text-aurora-cyan" },
            { label: "场景总数", value: stats.totalScenes, icon: Film, color: "text-aurora-purple" },
            { label: "已完成", value: stats.completedDreams, icon: TrendingUp, color: "text-aurora-green" },
            { label: "草稿", value: stats.draftDreams, icon: Calendar, color: "text-aurora-pink" },
            { label: "平均场景", value: stats.avgScenes, icon: BarChart3, color: "text-aurora-blue" },
            { label: "总字数", value: stats.totalChars, icon: Tag, color: "text-aurora-cyan" },
          ].map((item) => (
            <Card key={item.label} className="glass">
              <CardContent className="p-4 text-center">
                <item.icon size={20} className={`mx-auto mb-2 ${item.color}`} />
                <p className="font-display text-2xl">{item.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{item.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Keyword cloud */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="font-display text-lg flex items-center gap-2 text-aurora-purple">
                <Tag size={16} />
                关键词云
              </CardTitle>
            </CardHeader>
            <CardContent>
              {stats.keywords.length === 0 ? (
                <p className="text-sm text-muted-foreground font-serif text-center py-4">
                  记录更多梦境后这里将显示高频关键词
                </p>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {stats.keywords.map(([word, count], i) => {
                    const sizes = ["text-2xl", "text-xl", "text-lg", "text-base", "text-sm"];
                    const sizeClass = sizes[Math.min(Math.floor(i / 4), sizes.length - 1)];
                    const opacities = ["opacity-100", "opacity-90", "opacity-75", "opacity-60", "opacity-50"];
                    const opacityClass = opacities[Math.min(Math.floor(i / 4), opacities.length - 1)];
                    return (
                      <span
                        key={word}
                        className={`font-serif ${sizeClass} ${opacityClass} text-aurora-cyan hover:text-aurora-purple transition-colors cursor-default`}
                        title={`出现 ${count} 次`}
                      >
                        {word}
                      </span>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Tag distribution */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="font-display text-lg flex items-center gap-2 text-aurora-green">
                <Tag size={16} />
                标签分布
              </CardTitle>
            </CardHeader>
            <CardContent>
              {stats.topTags.length === 0 ? (
                <p className="text-sm text-muted-foreground font-serif text-center py-4">
                  给梦境添加标签后这里将显示标签统计
                </p>
              ) : (
                <div className="space-y-2">
                  {stats.topTags.map(([tag, count]) => {
                    const maxCount = stats.topTags[0][1];
                    const pct = Math.max((count / maxCount) * 100, 8);
                    return (
                      <div key={tag} className="flex items-center gap-2">
                        <span className="text-sm font-serif w-16 text-right shrink-0 truncate">
                          {tag}
                        </span>
                        <div className="flex-1 h-5 bg-muted/30 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-aurora-green/60 to-aurora-cyan/60 transition-all duration-500"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground w-6">
                          {count}
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Monthly timeline */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="font-display text-lg flex items-center gap-2 text-aurora-blue">
                <Calendar size={16} />
                月度记录
              </CardTitle>
            </CardHeader>
            <CardContent>
              {stats.months.length === 0 ? (
                <p className="text-sm text-muted-foreground font-serif text-center py-4">
                  暂无数据
                </p>
              ) : (
                <div className="flex items-end gap-3 h-32">
                  {stats.months.map(([month, count]) => {
                    const maxCount = Math.max(...stats.months.map(([, c]) => c));
                    const h = Math.max((count / maxCount) * 100, 10);
                    return (
                      <div key={month} className="flex-1 flex flex-col items-center gap-1">
                        <span className="text-xs text-muted-foreground">{count}</span>
                        <div
                          className="w-full rounded-t-md bg-gradient-to-t from-aurora-blue/40 to-aurora-purple/60 transition-all duration-500"
                          style={{ height: `${h}%` }}
                        />
                        <span className="text-[10px] text-muted-foreground">
                          {month.slice(5)}月
                        </span>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Emoji ranking */}
          <Card className="glass">
            <CardHeader>
              <CardTitle className="font-display text-lg flex items-center gap-2 text-aurora-pink">
                <Moon size={16} />
                梦境符号
              </CardTitle>
            </CardHeader>
            <CardContent>
              {stats.topEmojis.length === 0 ? (
                <p className="text-sm text-muted-foreground font-serif text-center py-4">
                  暂无数据
                </p>
              ) : (
                <div className="grid grid-cols-4 gap-3">
                  {stats.topEmojis.map(([emoji, count]) => (
                    <div
                      key={emoji}
                      className="flex flex-col items-center p-3 rounded-lg bg-muted/20 hover:bg-muted/40 transition-colors"
                    >
                      <span className="text-3xl">{emoji}</span>
                      <span className="text-xs text-muted-foreground mt-1">
                        {count} 次
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTransition>
  );
}
