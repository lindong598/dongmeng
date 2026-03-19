import { create } from "zustand";
import { persist } from "zustand/middleware";

// ---- Types ----
export interface DreamScene {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
}

export interface Dream {
  id: string;
  title: string;
  emoji: string;
  description: string;
  scenes: DreamScene[];
  tags: string[];
  status: "draft" | "completed";
  createdAt: string;
  updatedAt: string;
}

interface DreamState {
  dreams: Dream[];
  // CRUD
  addDream: () => string;
  updateDream: (id: string, updates: Partial<Pick<Dream, "title" | "emoji" | "description" | "status">>) => void;
  deleteDream: (id: string) => void;
  getDream: (id: string) => Dream | undefined;
  // Scene management
  addScene: (dreamId: string, title?: string) => void;
  updateScene: (dreamId: string, sceneId: string, updates: Partial<Pick<DreamScene, "title" | "description" | "imageUrl">>) => void;
  deleteScene: (dreamId: string, sceneId: string) => void;
  // Tag management
  addTag: (dreamId: string, tag: string) => void;
  removeTag: (dreamId: string, tag: string) => void;
  getAllTags: () => string[];
}

// ---- Emoji pool ----
const dreamEmojis = ["🌊", "🐋", "🌲", "🕰️", "🌙", "🦋", "🌸", "🔮", "🌌", "⭐", "🏔️", "🌈", "🦄", "💫", "🍃", "🎭", "🗝️", "🪐", "🌺", "🐉"];

function randomEmoji() {
  return dreamEmojis[Math.floor(Math.random() * dreamEmojis.length)];
}

function generateId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

function now() {
  return new Date().toISOString().slice(0, 10);
}

// ---- Initial seed data ----
const seedDreams: Dream[] = [
  {
    id: "1",
    title: "星空下的海洋",
    emoji: "🌊",
    description:
      "我站在一片无边的海洋前，头顶是旋转的星空。海水呈现出深邃的靛蓝色，波浪轻轻拍打着我的脚踝。远处，一座水晶灯塔发出柔和的光芒，指引着某个未知的方向。海面上漂浮着无数发光的水母，像是坠落的星辰。",
    scenes: [
      { id: "s1", title: "海边黄昏" },
      { id: "s2", title: "水晶灯塔" },
      { id: "s3", title: "深海漩涡" },
    ],
    tags: ["海洋", "星空", "奇幻"],
    status: "draft",
    createdAt: "2026-03-15",
    updatedAt: "2026-03-15",
  },
  {
    id: "2",
    title: "飞翔的鲸鱼",
    emoji: "🐋",
    description:
      "巨大的蓝鲸从云层中穿出，身后拖着一道彩虹做成的尾迹。我骑在鲸鱼的背上，穿越一座座浮空的岛屿。",
    scenes: [
      { id: "s4", title: "云海鲸鱼" },
      { id: "s5", title: "浮空岛屿" },
      { id: "s6", title: "彩虹瀑布" },
      { id: "s7", title: "星空降落" },
      { id: "s8", title: "梦醒时分" },
    ],
    tags: ["飞行", "动物", "冒险"],
    status: "draft",
    createdAt: "2026-03-14",
    updatedAt: "2026-03-14",
  },
  {
    id: "3",
    title: "水晶森林",
    emoji: "🌲",
    description:
      "每棵树都由透明的水晶构成，阳光穿过时折射出万道彩虹。森林深处有一条银色的小溪，流淌着液态的月光。",
    scenes: [
      { id: "s9", title: "水晶入口" },
      { id: "s10", title: "月光溪流" },
    ],
    tags: ["森林", "奇幻", "自然"],
    status: "draft",
    createdAt: "2026-03-12",
    updatedAt: "2026-03-12",
  },
  {
    id: "4",
    title: "时间的迷宫",
    emoji: "🕰️",
    description:
      "走在不断变化的走廊中，每面墙上的时钟显示着不同的时间。有的指针倒转，有的飞速旋转。在迷宫的中心，我找到了一扇没有钥匙的门。",
    scenes: [
      { id: "s11", title: "入口大厅" },
      { id: "s12", title: "钟表走廊" },
      { id: "s13", title: "镜像房间" },
      { id: "s14", title: "无钥之门" },
    ],
    tags: ["时间", "迷宫", "悬疑"],
    status: "draft",
    createdAt: "2026-03-10",
    updatedAt: "2026-03-10",
  },
  {
    id: "5",
    title: "月光下的花园",
    emoji: "🌙",
    description:
      "月光如水般倾泻在花园中，每朵花都在轻轻哼唱着不同的旋律。蝴蝶的翅膀上写满了古老的文字。",
    scenes: [
      { id: "s15", title: "月光花径" },
      { id: "s16", title: "歌唱花朵" },
      { id: "s17", title: "文字蝴蝶" },
    ],
    tags: ["月光", "花园", "音乐"],
    status: "draft",
    createdAt: "2026-03-08",
    updatedAt: "2026-03-08",
  },
];

export const useDreamStore = create<DreamState>()(
  persist(
    (set, get) => ({
      dreams: seedDreams,

      addDream: () => {
        const id = generateId();
        const newDream: Dream = {
          id,
          title: "",
          emoji: randomEmoji(),
          description: "",
          scenes: [],
          tags: [],
          status: "draft",
          createdAt: now(),
          updatedAt: now(),
        };
        set((s) => ({ dreams: [newDream, ...s.dreams] }));
        return id;
      },

      updateDream: (id, updates) =>
        set((s) => ({
          dreams: s.dreams.map((d) =>
            d.id === id ? { ...d, ...updates, updatedAt: now() } : d
          ),
        })),

      deleteDream: (id) =>
        set((s) => ({ dreams: s.dreams.filter((d) => d.id !== id) })),

      getDream: (id) => get().dreams.find((d) => d.id === id),

      addScene: (dreamId, title) => {
        const sceneId = generateId();
        set((s) => ({
          dreams: s.dreams.map((d) =>
            d.id === dreamId
              ? {
                  ...d,
                  updatedAt: now(),
                  scenes: [
                    ...d.scenes,
                    { id: sceneId, title: title ?? `场景 ${d.scenes.length + 1}` },
                  ],
                }
              : d
          ),
        }));
      },

      updateScene: (dreamId, sceneId, updates) =>
        set((s) => ({
          dreams: s.dreams.map((d) =>
            d.id === dreamId
              ? {
                  ...d,
                  updatedAt: now(),
                  scenes: d.scenes.map((sc) =>
                    sc.id === sceneId ? { ...sc, ...updates } : sc
                  ),
                }
              : d
          ),
        })),

      deleteScene: (dreamId, sceneId) =>
        set((s) => ({
          dreams: s.dreams.map((d) =>
            d.id === dreamId
              ? {
                  ...d,
                  updatedAt: now(),
                  scenes: d.scenes.filter((sc) => sc.id !== sceneId),
                }
              : d
          ),
        })),

      addTag: (dreamId, tag) =>
        set((s) => ({
          dreams: s.dreams.map((d) =>
            d.id === dreamId && !d.tags.includes(tag)
              ? { ...d, updatedAt: now(), tags: [...d.tags, tag] }
              : d
          ),
        })),

      removeTag: (dreamId, tag) =>
        set((s) => ({
          dreams: s.dreams.map((d) =>
            d.id === dreamId
              ? { ...d, updatedAt: now(), tags: d.tags.filter((t) => t !== tag) }
              : d
          ),
        })),

      getAllTags: () => {
        const tags = new Set<string>();
        get().dreams.forEach((d) => d.tags.forEach((t) => tags.add(t)));
        return Array.from(tags).sort();
      },
    }),
    {
      name: "dongmeng-dreams",
    }
  )
);
