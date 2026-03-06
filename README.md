# OpenClaw Skills Hub

张洵的多龙虾技能共享平台

## 🌐 网站地址

**固定域名**：https://claw-skills.pages.dev

## 📋 功能

- 21个技能展示（5个分类）
- 精美深色UI设计
- 搜索功能
- 无需GitHub账号的技能提交表单
- 自动创建Issue审核

## 🏗️ 技术架构

- **前端**：纯HTML + 内联CSS + JavaScript（静态数据）
- **部署**：Cloudflare Pages
- **提交API**：Cloudflare Workers (`/api/submit`)
- **构建**：直接复制 `public/index.html` 到 `dist/`

## 🚀 部署

推送到 `master` 分支后，GitHub Actions 自动部署到 Cloudflare Pages。

```bash
git push origin master
```

## 📝 本地开发

直接打开 `public/index.html` 即可预览（提交功能需要部署后才能使用）。

## 🔑 环境变量

在 Cloudflare Pages 项目设置中配置：

- `GITHUB_TOKEN`：用于创建Issue
- `SUBMIT_PASSWORD`：提交密码（默认：181818）

## 📂 项目结构

```
.
├── public/
│   └── index.html          # 主页面（包含所有样式和逻辑）
├── functions/
│   └── api/
│       └── submit.js       # 提交API（Cloudflare Worker）
├── .github/
│   └── workflows/
│       └── deploy.yml      # GitHub Actions 部署配置
└── package.json            # 构建脚本
```

## 🛠️ 避坑经验

1. **不要用 Next.js**：简单静态站点用纯HTML更可靠
2. **Cloudflare Pages 项目名**：`claw-skills`（简短域名）
3. **构建命令**：`npm run build`（复制HTML到dist）
4. **部署目录**：`./dist`

---

_最后更新：2026-03-06_
