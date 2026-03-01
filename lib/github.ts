export interface Skill {
  name: string;
  path: string;
  download_url: string;
  content?: string;
  description?: string;
}

export async function fetchSkills(): Promise<Skill[]> {
  // 获取 skills 目录下的所有子目录（每个技能一个文件夹）
  const response = await fetch(
    'https://api.github.com/repos/zhangxun057/openclaw-skills/contents/skills',
    { next: { revalidate: 3600 } } // Cache for 1 hour
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch skills');
  }
  
  const items = await response.json();
  
  // Filter only directories (each skill is now a folder)
  const skillDirs = items.filter((item: any) => item.type === 'dir');
  
  // Map each directory to a skill
  return skillDirs.map((dir: any) => ({
    name: dir.name.replace(/-/g, ' '),
    path: `${dir.name}/SKILL.md`,
    download_url: `https://raw.githubusercontent.com/zhangxun057/openclaw-skills/master/skills/${dir.name}/SKILL.md`,
  }));
}

export async function fetchSkillContent(downloadUrl: string): Promise<string> {
  const response = await fetch(downloadUrl, { next: { revalidate: 3600 } });
  
  if (!response.ok) {
    throw new Error('Failed to fetch skill content');
  }
  
  return response.text();
}

export function extractDescription(content: string): string {
  // Try to extract description from YAML frontmatter first
  const frontmatterMatch = content.match(/description:\s*"([^"]+)"/);
  if (frontmatterMatch) {
    return frontmatterMatch[1].substring(0, 150) + (frontmatterMatch[1].length > 150 ? '...' : '');
  }
  
  // Fallback: Extract first paragraph after title
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line && !line.startsWith('#') && !line.startsWith('---') && !line.startsWith('name:') && !line.startsWith('description:')) {
      return line.replace(/^[-*>]+\s*/, '').substring(0, 150) + '...';
    }
  }
  return '点击查看详情';
}
