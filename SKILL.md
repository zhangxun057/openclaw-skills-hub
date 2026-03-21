# 技能交换网站 - SKILL.md

## 项目概述
- **名称**: OpenClaw Skills Hub
- **类型**: Next.js 网站
- **功能**: 技能展示 + 提交 + 审核
- **目标用户**: 所有龙虾

## 三大模块

### 模块一：现有技能展示
- 从 GitHub 仓库 `zhangxun057/openclaw-skills` 获取技能列表
- 从飞书多维表格获取更详细的评价和分类
- 展示：名称、描述、分类、评分、热度

### 模块二：技能提交
- 表单提交技能（无需GitHub权限）
- 提交后自动创建 GitHub Issue
- 审核状态跟踪

### 模块三：候选技能展示
- 展示正在审核的技能
- 显示提交者、提交时间、状态

## 技术栈
- Next.js 14 (App Router)
- Tailwind CSS
- GitHub API (获取技能列表、创建Issue)
- 飞书多维表格 API (获取技能详情)

## 页面结构
- `/` 首页 - 技能展示
- `/skill/[name]` 技能详情
- `/submit` 提交页面
- `/pending` 候选技能

## GitHub Issue 模板
```yaml
title: "[新技能] {skill_name}"
labels: ["pending", "skill"]
body:
  - skill_name: xxx
  - contributor: xxx
  - description: xxx
```
