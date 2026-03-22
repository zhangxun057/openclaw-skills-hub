// Cloudflare Worker for handling skill submissions

const DEFAULT_PASSWORD = '181818';
const GITHUB_TOKEN = ''; // 从环境变量获取
const GITHUB_REPO = 'zhangxun057/openclaw-skills';

export default {
  async fetch(request, env) {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405, headers: corsHeaders });
    }

    try {
      const contentType = request.headers.get('content-type') || '';
      
      if (contentType.includes('multipart/form-data')) {
        return await handleMultipart(request, corsHeaders);
      } else {
        return await handleJson(request, corsHeaders);
      }
    } catch (error) {
      return new Response(JSON.stringify({ 
        error: 'Server error',
        details: error.message
      }), { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
    }
  }
};

async function handleJson(request, corsHeaders) {
  const { skillName, content, contributor, password, category, source, icon, repoUrl } = await request.json();
  return await processSubmission({ skillName, content, contributor, password, category, source, icon, repoUrl }, corsHeaders);
}

async function handleMultipart(request, corsHeaders) {
  const formData = await request.formData();
  const password = formData.get('password');
  
  const expectedPassword = DEFAULT_PASSWORD;
  if (password !== expectedPassword) {
    return new Response(JSON.stringify({ 
      error: '密码错误',
      message: '请联系张洵获取提交密码'
    }), { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }

  const skillName = formData.get('skillName');
  const description = formData.get('description');
  const category = formData.get('category');
  const source = formData.get('source');
  const author = formData.get('author');
  const icon = formData.get('icon');
  const repoUrl = formData.get('repoUrl');
  const skillFile = formData.get('skillFile');

  let content = description || '';
  let fileInfo = '';
  
  if (skillFile && skillFile.name) {
    const fileContent = await skillFile.text();
    fileInfo = `\n\n---\n📎 上传文件: ${skillFile.name}\n文件大小: ${skillFile.size} bytes`;
    if (fileContent) {
      fileInfo += `\n\n文件内容预览:\n\`\`\`\n${fileContent.substring(0, 2000)}\n\`\`\``;
    }
  }

  return await processSubmission({
    skillName: skillName?.toString(),
    content: content + fileInfo,
    contributor: author?.toString() || '匿名',
    category: category?.toString(),
    source: source?.toString() || '社区',
    icon: icon?.toString() || '🔧',
    repoUrl: repoUrl?.toString()
  }, corsHeaders);
}

async function processSubmission(data, corsHeaders) {
  const { skillName, content, contributor, category, source, icon, repoUrl } = data;
  
  if (!skillName || !content) {
    return new Response(JSON.stringify({ 
      error: 'Missing required fields',
      message: '技能名称和描述不能为空'
    }), { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
  }

  const filename = `skill-${skillName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}.md`;
  
  let skillContent = content;
  skillContent += `\n\n---\n_贡献者: ${contributor}_\n_日期: ${new Date().toISOString().split('T')[0]}_`;
  if (category) skillContent += `\n_分类: ${category}_`;
  if (source) skillContent += `\n_来源: ${source}_`;
  if (icon) skillContent += `\n_图标: ${icon}_`;
  if (repoUrl) skillContent += `\n_仓库: ${repoUrl}_`;

  const issueBody = `## 新技能提交

**技能名称:** ${skillName}
**贡献者:** ${contributor}
**分类:** ${category || '未分类'}
**来源:** ${source || '社区'}

### 描述

${content}

${repoUrl ? `### GitHub仓库\n${repoUrl}` : ''}

### 建议文件名
\`${filename}\``;

  const response = await fetch(
    `https://api.github.com/repos/${GITHUB_REPO}/issues`,
    {
      method: 'POST',
      headers: {
        'Authorization': `token ${GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        'User-Agent': 'OpenClaw-Skills-Hub'
      },
      body: JSON.stringify({
        title: `[Skill Submission] ${skillName}`,
        body: issueBody,
        labels: ['skill-submission', 'pending-review']
      })
    }
  );

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`GitHub API error: ${error}`);
  }

  const result = await response.json();

  return new Response(JSON.stringify({
    success: true,
    message: '技能提交成功！',
    issueUrl: result.html_url,
    issueNumber: result.number
  }), { headers: { ...corsHeaders, 'Content-Type': 'application/json' } });
}
