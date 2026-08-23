# What Typefaces

一个用于浏览、检索与预览本机字体的 Web 应用，重点是“查看你电脑里有哪些字体”。

## 目标
- 快速列出本机可用字体并按家族分组
- 提供检索与预览体验，帮助挑选合适字体

## 功能概览
- 本地字体列表浏览（基于浏览器 Local Font Access API）
- 关键词搜索（按字体家族名过滤）
- 自定义预览文本
- 无限滚动加载（分批加载字体卡片）
- 字体卡片展示（样式数量、自动配色）
- 预留：收藏/下载按钮（当前仅 UI）
- 预留：语言选择下拉（当前仅静态列表）
- 预留：筛选与分类 UI（目前注释）

## 页面与路由
- `/`：首页引导入口
- `/font`：字体列表页（搜索 + 预览 + 列表）
- `/font/[name]`：详情页目录已存在但尚未实现（当前为空目录）

## 数据来源与关键实现
- **字体来源**：`window.queryLocalFonts`（浏览器本地字体访问 API）
- **分组与检索**：`src/lib/fonts.ts` 中的 `groupFontsByFamily`、`searchFont`
- **列表加载**：`src/components/font-list.tsx`
  - 首屏加载 34 个字体卡片
  - 向下滚动触发追加加载
- **字体卡片**：`src/components/font-card.tsx`
  - 根据字体名称生成卡片颜色
  - 根据输入的预览文本动态展示
- **字体解析能力**（用于未来详情页）
  - `src/lib/parse font.ts` 使用 `opentype.js` 解析字体表与字形
  - `src/components/glyphs.tsx` 用于字形网格与指标展示
  - `src/components/about.tsx` 用于字体版权/作者/许可证等信息
  - `src/components/type test.tsx` 用于字重、大小、颜色与对齐测试

## 浏览器与权限要求
- 必须支持 **Local Font Access API**（`queryLocalFonts`）
- 浏览器会弹出权限提示；拒绝后字体列表为空
- 不支持该 API 的浏览器会输出错误并返回空列表
- 推荐使用 Chromium 内核浏览器（如 Chrome/Edge）

## 开发
### 环境要求
- Node.js 24.x（与 Vercel 部署环境保持一致）
- 包管理器任选其一：pnpm / npm / yarn / bun（推荐 pnpm）

### 本地启动
```bash
pnpm install
pnpm dev
```

### 其他包管理器
```bash
npm install
npm run dev
```

```bash
yarn
yarn dev
```

```bash
bun install
bun dev
```

### 常用脚本
```bash
pnpm build
pnpm start
pnpm lint
```

### Vercel 部署
- Node.js 版本选择 `24.x`
- 构建命令与安装命令已在 `vercel.json` 固定（`pnpm install` / `pnpm build`）
- 如遇 “无法下载依赖”，优先在 Vercel 环境变量里显式设置 `NPM_CONFIG_REGISTRY=https://registry.npmjs.org/`（必要时加 `PNPM_CONFIG_REGISTRY`）

## 目录结构
- `src/app`：App Router 路由与页面
- `src/app/font`：字体列表页
- `src/app/font/[name]`：预留的字体详情页目录（当前空）
- `src/components`：业务与 UI 组件
- `src/components/ui`：shadcn/ui 组件
- `src/lib`：字体获取与解析工具
- `public`：静态资源

## 技术栈
- Next.js 14（App Router）
- React 18 + TypeScript
- Tailwind CSS
- Radix UI + shadcn/ui
- opentype.js / fonteditor-core / fontkit（字体解析相关）
- sonner（通知）

## 已知限制
- 仅能读取本机字体；无后端或云端字体源
- `queryLocalFonts` 受浏览器权限与支持度限制
- 字体详情页、收藏/下载逻辑尚未实现
