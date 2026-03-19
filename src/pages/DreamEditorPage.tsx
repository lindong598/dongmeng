import { useState, useEffect, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDreamStore } from "@/stores/dream-store";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { PageTransition } from "@/components/layout/PageTransition";
import {
  ArrowLeft,
  Wand2,
  ImagePlus,
  Sparkles,
  Trash2,
  X,
  Check,
  Pencil,
  Save,
  CloudMoon,
} from "lucide-react";

// Debounced auto-save hook
function useAutoSave(dreamId: string | undefined, field: string, value: string, delay = 600) {
  const updateDream = useDreamStore((s) => s.updateDream);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!dreamId) return;
    clearTimeout(timer.current);
    setSaved(false);
    timer.current = setTimeout(() => {
      updateDream(dreamId, { [field]: value });
      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
    }, delay);
    return () => clearTimeout(timer.current);
  }, [value, dreamId, field, delay, updateDream]);

  return saved;
}

export function DreamEditorPage() {
  const { dreamId } = useParams();
  const navigate = useNavigate();
  const dream = useDreamStore((s) => s.dreams.find((d) => d.id === dreamId));
  const updateDream = useDreamStore((s) => s.updateDream);
  const deleteDream = useDreamStore((s) => s.deleteDream);
  const addScene = useDreamStore((s) => s.addScene);
  const updateScene = useDreamStore((s) => s.updateScene);
  const deleteScene = useDreamStore((s) => s.deleteScene);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [editingSceneId, setEditingSceneId] = useState<string | null>(null);
  const [editingSceneTitle, setEditingSceneTitle] = useState("");
  const [confirmDelete, setConfirmDelete] = useState(false);

  // Sync local state when dream changes (e.g. on first load)
  useEffect(() => {
    if (dream) {
      setTitle(dream.title);
      setDescription(dream.description);
    }
  }, [dream?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const titleSaved = useAutoSave(dreamId, "title", title);
  const descSaved = useAutoSave(dreamId, "description", description);

  const handleDelete = useCallback(() => {
    if (!dreamId) return;
    if (!confirmDelete) {
      setConfirmDelete(true);
      return;
    }
    deleteDream(dreamId);
    navigate("/");
  }, [dreamId, confirmDelete, deleteDream, navigate]);

  // Cancel delete confirmation after 3 seconds
  useEffect(() => {
    if (!confirmDelete) return;
    const t = setTimeout(() => setConfirmDelete(false), 3000);
    return () => clearTimeout(t);
  }, [confirmDelete]);

  const handleAddScene = () => {
    if (!dreamId) return;
    addScene(dreamId);
  };

  const startEditScene = (sceneId: string, currentTitle: string) => {
    setEditingSceneId(sceneId);
    setEditingSceneTitle(currentTitle);
  };

  const saveSceneEdit = () => {
    if (!dreamId || !editingSceneId) return;
    updateScene(dreamId, editingSceneId, { title: editingSceneTitle });
    setEditingSceneId(null);
  };

  const handleDeleteScene = (sceneId: string) => {
    if (!dreamId) return;
    deleteScene(dreamId, sceneId);
  };

  // 404: dream not found
  if (!dream) {
    return (
      <PageTransition>
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
          <CloudMoon size={64} className="text-aurora-purple/40 animate-float" />
          <h2 className="font-display text-xl text-muted-foreground">
            梦境不存在
          </h2>
          <p className="text-sm text-muted-foreground/70 font-serif">
            这个梦境可能已被删除，或从未存在过
          </p>
          <Button
            variant="outline"
            className="gap-2 font-serif cursor-pointer mt-2"
            onClick={() => navigate("/")}
          >
            <ArrowLeft size={14} />
            返回梦境列表
          </Button>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="space-y-6 max-w-4xl mx-auto">
        {/* Top bar: back + delete */}
        <div className="flex items-center justify-between">
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

          <div className="flex items-center gap-2">
            {/* Save indicator */}
            {(titleSaved || descSaved) && (
              <span className="text-xs text-aurora-green flex items-center gap-1">
                <Save size={12} /> 已保存
              </span>
            )}

            {/* Delete button */}
            <Button
              variant={confirmDelete ? "destructive" : "outline"}
              size="sm"
              className="gap-1 cursor-pointer"
              onClick={handleDelete}
            >
              <Trash2 size={14} />
              {confirmDelete ? "确认删除？" : "删除"}
            </Button>
          </div>
        </div>

        {/* Dream header */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{dream.emoji}</span>
            <Input
              className="font-display text-2xl bg-transparent border-none p-0 h-auto
                         focus-visible:ring-0 placeholder:text-muted-foreground/50"
              placeholder="输入梦境标题..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant="outline"
              className="text-aurora-cyan border-aurora-cyan/30 cursor-pointer"
              onClick={() =>
                updateDream(dreamId!, {
                  status: dream.status === "draft" ? "completed" : "draft",
                })
              }
            >
              {dream.status === "draft" ? "草稿" : "已完成"}
            </Badge>
            <span className="text-xs text-muted-foreground">
              创建于 {dream.createdAt}
              {dream.updatedAt !== dream.createdAt &&
                ` · 更新于 ${dream.updatedAt}`}
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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
              onClick={handleAddScene}
            >
              <ImagePlus size={14} /> 添加场景
            </Button>
          </div>

          {dream.scenes.length === 0 && (
            <div className="text-center py-8 text-muted-foreground/60 font-serif text-sm">
              还没有场景，点击「添加场景」开始构建你的梦境画面
            </div>
          )}

          <div className="flex gap-4 overflow-x-auto pb-3">
            {dream.scenes.map((scene, i) => (
              <Card
                key={scene.id}
                className="glass min-w-[220px] shrink-0 hover:glow-purple transition-shadow duration-300 group relative"
              >
                {/* Delete scene button */}
                <button
                  onClick={() => handleDeleteScene(scene.id)}
                  className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity
                             p-1 rounded-md hover:bg-destructive/20 text-muted-foreground hover:text-destructive cursor-pointer"
                  title="删除场景"
                >
                  <X size={14} />
                </button>

                <CardContent className="p-4">
                  <div className="h-32 rounded-lg bg-gradient-to-br from-aurora-blue/20 to-aurora-purple/20 flex items-center justify-center text-muted-foreground text-xs mb-3 border border-border/30">
                    <div className="text-center space-y-1">
                      <ImagePlus size={24} className="mx-auto opacity-40" />
                      <span className="opacity-60">等待生成</span>
                    </div>
                  </div>

                  {/* Editable scene title */}
                  {editingSceneId === scene.id ? (
                    <div className="flex items-center gap-1">
                      <Input
                        value={editingSceneTitle}
                        onChange={(e) => setEditingSceneTitle(e.target.value)}
                        className="h-7 text-sm p-1"
                        autoFocus
                        onKeyDown={(e) => {
                          if (e.key === "Enter") saveSceneEdit();
                          if (e.key === "Escape") setEditingSceneId(null);
                        }}
                      />
                      <button
                        onClick={saveSceneEdit}
                        className="text-aurora-green hover:text-aurora-cyan cursor-pointer"
                      >
                        <Check size={14} />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => startEditScene(scene.id, scene.title)}
                      className="font-serif text-sm flex items-center gap-1 group/edit cursor-pointer text-left"
                    >
                      {scene.title}
                      <Pencil
                        size={12}
                        className="opacity-0 group-hover/edit:opacity-60 transition-opacity"
                      />
                    </button>
                  )}

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
