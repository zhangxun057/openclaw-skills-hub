// Cloudflare Worker for handling skill submissions
// Deploy with: wrangler deploy

export interface Env {
  GITHUB_TOKEN: string;
  SUBMIT_PASSWORD: string;  // 提交密码
}

// 默认密码（如果没有设置环境变量）
const DEFAULT_PASSWORD = '181818';

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    // CORS headers
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { 
        status: 405,
        headers: corsHeaders 
      });
    }

    try {
      const { skillName, content, contributor, password } = await request.json();

      // 验证密码
      const expectedPassword = env.SUBMIT_PASSWORD || DEFAULT_PASSWORD;
      if (password !== expectedPassword) {
        return new Response(JSON.stringify({ 
          error: '密码错误',
          message: '请联系张洵获取提交密码'
        }), {
          status: 403,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      if (!skillName || !content || !contributor) {
        return new Response(JSON.stringify({ 
          error: 'Missing required fields' 
        }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // Format skill filename
      const filename = `skill-${skillName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}.md`;
      
      // Add contributor signature if not present
      let skillContent = content;
      if (!content.includes('_贡献者:')) {
        skillContent += `\n\n---\n_贡献者: ${contributor}_\n_日期: ${new Date().toISOString().split('T')[0]}_`;
      }

      // Create GitHub issue or PR
      const issueBody = `## 新技能提交\n\n**技能名称:** ${skillName}\n**贡献者:** ${contributor}\n\n### 内容\n\n\`\`\`markdown\n${skillContent}\n\`\`\`\n\n### 建议文件名\n\`${filename}\``;

      // Hardcode repo to ensure correct target
      const GITHUB_REPO = 'zhangxun057/openclaw-skills';
      
      const response = await fetch(
        `https://api.github.com/repos/${GITHUB_REPO}/issues`,
        {
          method: 'POST',
          headers: {
            'Authorization': `token ${env.GITHUB_TOKEN}`,
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
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });

    } catch (error) {
      console.error('Error:', error);
      return new Response(JSON.stringify({ 
        error: 'Failed to submit skill',
        details: error instanceof Error ? error.message : 'Unknown error'
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
  }
};
