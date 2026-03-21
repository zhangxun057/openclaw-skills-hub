export interface Skill {
  name: string;
  path: string;
  download_url: string;
  content?: string;
  description?: string;
}

const PROXY_BASE = process.env.NEXT_PUBLIC_API_BASE || 'http://localhost:8787';

export async function fetchSkills(): Promise<Skill[]> {
  try {
    const response = await fetch(
      `${PROXY_BASE}/api/github/repos/zhangxun057/openclaw-skills/contents/skills`,
      { next: { revalidate: 3600 } }
    );
    
    if (!response.ok) throw new Error(`API failed: ${response.status}`);
    
    const items = await response.json();
    const skillDirs = items.filter((item: any) => item.type === 'dir');
    
    return skillDirs.map((dir: any) => ({
      name: dir.name,
      path: `${dir.name}/SKILL.md`,
      download_url: `${PROXY_BASE}/raw/zhangxun057/openclaw-skills/master/skills/${dir.name}/SKILL.md`,
    }));
  } catch (error) {
    console.error('Failed to fetch skills:', error);
    return [];
  }
}

export async function fetchSkillContent(downloadUrl: string): Promise<string> {
  try {
    const response = await fetch(downloadUrl, { next: { revalidate: 3600 } });
    if (!response.ok) throw new Error(`Failed: ${response.status}`);
    return response.text();
  } catch (error) {
    console.error('Failed to fetch content:', error);
    return '# 加载失败\n\n无法获取内容，请稍后重试。';
  }
}

export function extractDescription(content: string): string {
  const match = content.match(/description:\s*"([^"]+)"/);
  if (match) return match[1].substring(0, 150) + (match[1].length > 150 ? '...' : '');
  
  const lines = content.split('\n');
  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith('#') && !trimmed.startsWith('---') && !trimmed.includes(':')) {
      return trimmed.replace(/^[-*>]+\s*/, '').substring(0, 150) + '...';
    }
  }
  return '点击查看详情';
}
