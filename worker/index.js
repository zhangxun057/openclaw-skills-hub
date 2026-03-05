export default {
  async fetch(request) {
    const url = new URL(request.url);
    
    // 代理 GitHub API
    if (url.pathname.startsWith('/api/github/')) {
      const githubPath = url.pathname.replace('/api/github/', '');
      const githubUrl = `https://api.github.com/${githubPath}`;
      
      const response = await fetch(githubUrl, {
        headers: {
          'User-Agent': 'Cloudflare-Worker',
          'Accept': 'application/vnd.github.v3+json',
        },
      });
      
      const data = await response.json();
      
      return new Response(JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, max-age=3600',
        },
      });
    }
    
    // 代理 raw.githubusercontent.com
    if (url.pathname.startsWith('/raw/')) {
      const rawPath = url.pathname.replace('/raw/', '');
      const rawUrl = `https://raw.githubusercontent.com/${rawPath}`;
      
      const response = await fetch(rawUrl);
      const text = await response.text();
      
      return new Response(text, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'Access-Control-Allow-Origin': '*',
          'Cache-Control': 'public, max-age=3600',
        },
      });
    }
    
    return new Response('Not Found', { status: 404 });
  },
};
