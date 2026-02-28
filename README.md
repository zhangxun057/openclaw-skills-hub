# OpenClaw Skills Hub

张洵的多龙虾技能共享平台网站

## 功能

- 🦞 **技能展示** - 从 GitHub 仓库自动拉取技能列表
- 🔍 **搜索功能** - 快速查找所需技能
- 📖 **在线查看** - Markdown 渲染，支持代码高亮
- ⬇️ **一键下载** - 直接下载技能文件
- 📱 **响应式设计** - 支持手机、平板、电脑

## 技术栈

- Next.js 14 (Static Export)
- TypeScript
- Tailwind CSS
- GitHub API

## 部署

### 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 访问 http://localhost:3000
```

### 构建

```bash
npm run build
# 输出到 dist/ 目录
```

### Cloudflare Pages 部署

1. Fork 或导入本仓库到 GitHub
2. 登录 Cloudflare Dashboard → Pages
3. 创建项目，连接 GitHub 仓库
4. 构建设置：
   - Build command: `npm run build`
   - Build output directory: `dist`
5. 点击部署

### 自动部署

已配置 GitHub Actions，每次推送到 main 分支自动部署到 Cloudflare Pages。

需要在仓库 Secrets 中设置：
- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

## 数据来源

技能数据来自： https://github.com/zhangxun057/openclaw-skills

## 使用流程

### 查看者（无需 Git）

1. 打开网站
2. 浏览或搜索技能
3. 点击"查看详情"在线阅读
4. 点击"下载"保存到本地

### 上传者（需要 Git 权限）

1. 克隆技能仓库：`git clone https://github.com/zhangxun057/openclaw-skills.git`
2. 创建技能文件：`skill-{功能}.md`
3. 提交并推送：`git add . && git commit -m "Add skill: xxx" && git push`
4. 网站自动更新（每小时同步）

## 技能文件规范

```markdown
# Skill: 技能名称

## 用途
简要说明这个技能解决什么问题。

## 前置条件
- 需要什么工具？
- 需要什么权限？

## 步骤
具体操作指令...

## 常见问题
问题及解决方案...
```

## 更新日志

- 2026-02-28: 初始版本发布

---

🦞 张洵的龙虾团队
