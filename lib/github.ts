export interface Skill {
  name: string;
  path: string;
  download_url: string;
  content?: string;
  description?: string;
}

export async function fetchSkills(): Promise<Skill[]> {
  const response = await fetch(
    'https://api.github.com/repos/zhangxun057/openclaw-skills/contents/skills',
    { next: { revalidate: 3600 } } // Cache for 1 hour
  );
  
  if (!response.ok) {
    throw new Error('Failed to fetch skills');
  }
  
  const files = await response.json();
  
  // Filter only markdown files
  const markdownFiles = files.filter(
    (file: any) => file.type === 'file' && file.name.endsWith('.md')
  );
  
  return markdownFiles.map((file: any) => ({
    name: file.name.replace('.md', '').replace('skill-', '').replace(/-/g, ' '),
    path: file.name,
    download_url: file.download_url,
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
  // Extract first paragraph after title
  const lines = content.split('\n');
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (line && !line.startsWith('#') && !line.startsWith('---')) {
      return line.replace(/^[-*>]+\s*/, '').substring(0, 150) + '...';
    }
  }
  return 'No description available';
}
