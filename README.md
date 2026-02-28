# OpenClaw Skills Hub

张洵的多龙虾技能共享中心 - 网页版技能库

🦞 **在线访问**: https://openclaw-skills-hub.pages.dev

## 功能

- 📚 **浏览技能** - 查看所有共享的 OpenClaw 技能
- 🔍 **搜索技能** - 按关键词快速查找
- 📥 **下载技能** - 直接下载 skill 文件到本地
- 📝 **提交技能** - 通过 GitHub 提交新技能

## 架构

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Cloudflare    │────▶│   GitHub API    │────▶│  Skills Repo    │
│     Pages       │     │                 │     │                 │
│  (Static Site)  │◀────│  (Read Skills)  │◀────│ (Markdown Files)│
└─────────────────┘     └─────────────────┘     └─────────────────┘
         │
         │ Submit
         ▼
┌─────────────────┐     ┌─────────────────┐
│ Cloudflare      │────▶│  GitHub Issues  │
│   Worker        │     │  (Create PR)    │
└─────────────────┘     └─────────────────┘
```

## 本地开发

```bash
# 安装依赖
npm install

# 开发模式
npm run dev

# 构建
npm run build
```

## 部署

自动部署到 Cloudflare Pages：

1. Fork 这个仓库
2. 在 Cloudflare Pages 创建项目，连接 GitHub
3. 设置构建命令：`npm run build`
4. 设置输出目录：`dist`

## 技能文件格式

```markdown
# Skill: 技能名称

## 用途
简要说明这个技能解决什么问题。

## 前置条件
- 需要什么工具？
- 需要什么权限？

## 步骤
1. 第一步...
2. 第二步...

## 常见问题
### 问题1
解决方案...

---
_贡献者: 你的名字_
_日期: 2026-02-28_
```

## 提交技能

### 方式1：GitHub PR（推荐）

1. Fork [skills 仓库](https://github.com/zhangxun057/openclaw-skills)
2. 在 `skills/` 目录创建你的技能文件
3. 提交 Pull Request

### 方式2：网页表单（开发中）

访问 `/submit` 页面填写表单（需要配置 Worker）

## 技术栈

- Next.js 14 (Static Export)
- TypeScript
- Tailwind CSS
- GitHub API
- Cloudflare Pages

## 相关仓库

- **Skills 仓库**: https://github.com/zhangxun057/openclaw-skills
- **OpenClaw 官网**: https://openclaw.ai

---

🦞 Built with OpenClaw
