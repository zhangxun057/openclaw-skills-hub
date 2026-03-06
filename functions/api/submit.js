// Cloudflare Pages Function - API Route
export async function onRequestPost(context) {
  const { request, env } = context;
  
  const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { skillName, content, contributor, password } = await request.json();

    const expectedPassword = env.SUBMIT_PASSWORD || '181818';
    if (password !== expectedPassword) {
      return new Response(JSON.stringify({ 
        error: 'Password incorrect',
        message: 'Please contact Zhang Xun for the submit password'
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

    const filename = `skill-${skillName.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')}.md`;
    
    let skillContent = content;
    if (!content.includes('_Contributor:') && !content.includes('_贡献者:')) {
      skillContent += `\n\n---\n_Contributor: ${contributor}_\n_Date: ${new Date().toISOString().split('T')[0]}_`;
    }

    const issueBody = `## New Skill Submission\n\n**Skill Name:** ${skillName}\n**Contributor:** ${contributor}\n\n### Content\n\n\`\`\`markdown\n${skillContent}\n\`\`\`\n\n### Suggested Filename\n\`${filename}\``;

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
      message: 'Skill submitted successfully!',
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

export async function onRequestGet() {
  return new Response(JSON.stringify({
    status: 'API is running',
    endpoints: {
      submit: 'POST /api/submit',
      test: 'GET /api/submit (this message)'
    }
  }), {
    headers: { 'Content-Type': 'application/json' }
  });
}
