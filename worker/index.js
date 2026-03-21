// Cloudflare Worker for skills hub
// Handles both skill submission and GitHub API proxy

const DEFAULT_PASSWORD = '181818';
const GITHUB_REPO = 'zhangxun057/openclaw-skills';

export default {
  async fetch(request, env) {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    const url = new URL(request.url);
    const path = url.pathname;

    // Handle skill submission
    if (path === '/api/submit' || path === '/submit') {
      return handleSubmit(request, env, corsHeaders);
    }

    // Handle GitHub API proxy
    if (path.startsWith('/api/github/')) {
      return handleGitHubProxy(request, env, corsHeaders);
    }

    // Handle raw file proxy
    if (path.startsWith('/raw/')) {
      return handleRawProxy(request, env, corsHeaders);
    }

    return new Response('Not Found', { status: 404, headers: corsHeaders });
  }
};

async function handleSubmit(request, env, corsHeaders) {
  if (request.method !== 'POST') {
    return new Response('Method not allowed', { status: 405, headers: corsHeaders });
  }

  try {
    const { skillName, content, contributor, password } = await request.json();

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

    const githubToken = env.GITHUB_TOKEN;
    if (!githubToken) {
      return new Response(JSON.stringify({ 
        error: 'Server configuration error',
        message: 'GitHub token not configured'
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const filename = `skill-${skillName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}.md`;
    
    let skillContent = content;
    if (!content.includes('_贡献者:')) {
      skillContent += `\n\n---\n_贡献者: ${contributor}_\n_日期: ${new Date().toISOString().split('T')[0]}_`;
    }

    const issueBody = `## 新技能提交\n\n**技能名称:** ${skillName}\n**贡献者:** ${contributor}\n\n### 内容\n\n\`\`\`markdown\n${skillContent}\n\`\`\`\n\n### 建议文件名\n\`${filename}\``;

    const response = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO}/issues`,
      {
        method: 'POST',
        headers: {
          'Authorization': `token ${githubToken}`,
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
      details: error.message || 'Unknown error'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

async function handleGitHubProxy(request, env, corsHeaders) {
  const url = new URL(request.url);
  const githubPath = url.pathname.replace('/api/github/', '');
  const proxyUrl = `https://api.github.com/${githubPath}${url.search}`;

  try {
    const githubToken = env.GITHUB_TOKEN;
    
    const response = await fetch(proxyUrl, {
      headers: {
        'Authorization': `token ${githubToken}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'OpenClaw-Skills-Hub'
      }
    });

    const data = await response.text();
    
    return new Response(data, {
      status: response.status,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('GitHub proxy error:', error);
    return new Response(JSON.stringify({ error: 'Proxy failed' }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}

async function handleRawProxy(request, env, corsHeaders) {
  const url = new URL(request.url);
  const rawPath = url.pathname.replace('/raw/', 'https://raw.githubusercontent.com/');
  
  try {
    const response = await fetch(rawPath);
    const data = await response.text();
    
    return new Response(data, {
      status: response.status,
      headers: {
        ...corsHeaders,
        'Content-Type': 'text/plain'
      }
    });
  } catch (error) {
    console.error('Raw proxy error:', error);
    return new Response('Failed to fetch', {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'text/plain' }
    });
  }
}
