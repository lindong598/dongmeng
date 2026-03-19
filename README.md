# 冬梦 DongMeng 🌙

> 一款沉浸式梦境日记桌面应用 —— 记录、重构、可视化你的梦境世界

![Tauri](https://img.shields.io/badge/Tauri-v2-blue?logo=tauri)
![React](https://img.shields.io/badge/React-19-61dafb?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6?logo=typescript)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-v4-06b6d4?logo=tailwindcss)

## 简介

**冬梦**是一款基于 Tauri v2 + React 19 构建的跨平台桌面应用，专为梦境记录爱好者打造。拥有极光渐变背景、磨砂玻璃质感的 UI 设计，让你在如梦似幻的界面中捕捉每一个梦境片段。

### 核心特性

- 🌊 **梦境记录** — 创建、编辑、删除梦境，支持标题 + 详细叙述
- 💾 **自动保存** — 编辑内容防抖自动保存到本地，数据不丢失
- 🎬 **场景时间线** — 将梦境拆分为多个场景，支持添加 / 重命名 / 删除
- 🏷️ **标签分类** — 为梦境添加标签，按标签过滤筛选
- 📊 **统计面板** — 关键词云、标签分布、月度时间线、梦境符号统计
- 📤 **Markdown 导出** — 一键导出梦境为 Markdown 文件
- 🔍 **即时搜索** — 侧边栏实时搜索过滤（支持标题、内容、标签、emoji）
- 🌗 **深色/浅色主题** — 一键切换「深夜」与「白昼」两套极光主题
- 🪟 **自定义窗口** — 无原生边框，全自定义标题栏 + 窗口控制
- ↔️ **可调侧边栏** — 拖拽右边缘调整宽度（200-500px）
- ✨ **流畅动画** — Motion (Framer Motion) 驱动的页面切换 + 侧边栏动画
- 📦 **本地持久化** — 数据自动保存到 localStorage，重启不丢失

## 技术栈

| 层级 | 技术 |
|------|------|
| 桌面运行时 | [Tauri v2](https://v2.tauri.app) |
| 前端框架 | React 19 + TypeScript 5.9 |
| 构建工具 | Vite 6 |
| 样式方案 | Tailwind CSS v4 + 自定义极光主题 |
| UI 组件 | [shadcn](https://ui.shadcn.com) (base-nova 风格, 基于 Base UI) |
| 状态管理 | Zustand v5 (含 persist 中间件) |
| 路由 | React Router v7 |
| 动画 | Motion v12 (Framer Motion) |
| 图标 | Lucide React |
| 字体 | Inter / Lora / Cormorant Garamond |

## 快速开始

### 前置要求

- [Node.js](https://nodejs.org/) >= 18
- [Rust](https://www.rust-lang.org/tools/install) (Tauri 运行时需要)
- 系统依赖参考 [Tauri 前置要求](https://v2.tauri.app/start/prerequisites/)

### 安装与运行

```bash
# 1. 克隆仓库
git clone https://github.com/lindong598/dongmeng.git
cd dongmeng

# 2. 安装依赖
npm install

# 3. 启动开发模式（前端 + Tauri 桌面窗口）
npm run tauri dev
```

### 仅运行前端（浏览器预览）

如果不需要 Tauri 桌面功能，可以单独运行前端：

```bash
npm run dev
```

然后访问 http://localhost:1420

> 注意：浏览器模式下窗口控制按钮（最小化/最大化/关闭）不会生效，其余功能正常。

### 构建生产版本

```bash
# 仅构建前端
npm run build

# 构建桌面安装包（.msi / .dmg / .deb 等）
npm run tauri build
```

## 使用指南

### 📝 记录新梦境

1. 点击侧边栏顶部的 **「记录新梦境」** 按钮，或在梦境列表页右上角点击
2. 系统会自动创建一条新梦境并跳转到编辑页
3. 新梦境会被随机分配一个 emoji 表情

### ✏️ 编辑梦境

1. 点击标题区域输入梦境标题
2. 在「梦境叙述」文本框中书写你的梦境故事
3. 所有编辑会在 **停止输入 0.6 秒后自动保存**，右上角会出现「已保存」提示
4. 点击「草稿」标签可以切换为「已完成」状态

### 🏷️ 管理标签

1. 在编辑页标题下方，点击 **「+ 添加标签」**
2. 输入标签名称，按 **Enter** 确认
3. **删除标签**：鼠标悬停在标签上，点击 ✕
4. 侧边栏点击 **「标签」** 按钮展开标签云，点击任意标签按标签筛选梦境

### 🎬 管理场景

场景是梦境的组成片段，用于将一个完整的梦境拆分为多个画面：

1. 点击 **「添加场景」** 按钮创建新场景
2. **重命名**：点击场景标题，进入编辑模式，按 Enter 保存，按 Esc 取消
3. **删除**：鼠标悬停在场景卡片上，点击右上角的 ✕ 按钮

### 🔍 搜索梦境

在侧边栏的搜索框中输入关键词，即可实时过滤梦境列表。支持按标题、内容、标签、emoji 搜索。

### 📤 导出梦境

1. 在梦境编辑页，点击右上角的 **「导出」** 按钮
2. 自动下载为 `.md` 格式的 Markdown 文件
3. 导出内容包含：标题、日期、状态、标签、叙述内容、场景列表

### 📊 统计面板

1. 在侧边栏底部点击 **「统计」** 按钮，进入统计面板页面
2. 查看六大核心指标：梦境总数、场景总数、已完成数、草稿数、平均场景数、总字数
3. **关键词云**：从梦境叙述中自动提取高频中文词汇
4. **标签分布**：柱状图展示各标签出现频率
5. **月度记录**：柱状图展示每月梦境记录数量
6. **梦境符号**：统计最常使用的 emoji 表情

### 🗑️ 删除梦境

1. 在梦境编辑页，点击右上角的 **「删除」** 按钮
2. 按钮变红显示 **「确认删除？」**，3 秒内再次点击确认删除
3. 超过 3 秒未确认会自动取消

### 🌗 切换主题

点击标题栏右侧的 ☀️/🌙 图标，在「深夜」（深色）和「白昼」（浅色）主题间切换。

### ↔️ 调整侧边栏

- **收起/展开**：点击标题栏左侧的面板图标
- **拖拽调宽**：将鼠标移到侧边栏右边缘，出现拖拽指示后拖动调整宽度（200-500px）

## 项目结构

```
dongmeng/
├── src/
│   ├── components/
│   │   ├── layout/          # 布局组件
│   │   │   ├── AppLayout    # 根布局（标题栏 + 侧边栏 + 内容 + 状态栏）
│   │   │   ├── TitleBar     # 自定义窗口标题栏
│   │   │   ├── Sidebar      # 侧边栏（搜索 + 标签过滤 + 梦境列表 + 拖拽调宽）
│   │   │   ├── StatusBar    # 底部状态栏
│   │   │   └── PageTransition # 页面切换动画
│   │   └── ui/              # shadcn UI 组件
│   ├── pages/
│   │   ├── DreamListPage    # 梦境列表页（首页）
│   │   ├── DreamEditorPage  # 梦境编辑页（标签 + 导出）
│   │   ├── StatsPage        # 统计面板页
│   │   └── NotFoundPage     # 404 页面
│   ├── stores/
│   │   ├── ui-store.ts      # UI 状态（主题、侧边栏）
│   │   └── dream-store.ts   # 梦境数据（CRUD + 标签 + 持久化）
│   ├── lib/utils.ts          # 工具函数
│   ├── index.css             # 全局样式 + 极光主题
│   ├── router.tsx            # 路由配置
│   └── main.tsx              # 入口文件
├── src-tauri/                # Tauri 后端（Rust）
├── package.json
└── vite.config.ts
```

## 路线图

- [x] 梦境 CRUD（创建 / 编辑 / 删除）
- [x] 场景时间线管理
- [x] 自动保存 + 本地持久化
- [x] 搜索过滤
- [x] 深色/浅色双主题
- [x] 自定义窗口 + 流畅动画
- [x] 侧边栏可拖拽调整宽度
- [x] 梦境标签与分类系统
- [x] 统计面板（关键词云、标签分布、月度时间线、梦境符号）
- [x] 梦境导出（Markdown）
- [ ] AI 图像生成（GPT Image / Stability AI / ComfyUI）
- [ ] 梦境导出为 PDF / 图片
- [ ] 数据迁移至 SQLite（Tauri 原生存储）
- [ ] 场景拖拽排序
- [ ] 梦境导入（从 Markdown 文件导入）

## 许可证

MIT License

---

*冬梦 — 在极光下捕捉你的每一个梦境* ✨
