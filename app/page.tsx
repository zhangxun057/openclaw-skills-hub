import SkillCard from '@/components/SkillCard'
import SearchBox from '@/components/SearchBox'

export const revalidate = 3600

const SKILLS = {
  'AI & 图像': [
    { name: 'agent-tools', desc: 'Run 150+ AI apps via inference.sh CLI', icon: '🤖', source: '社区' },
    { name: 'ai-image-generation', desc: 'AI图像生成工具集成', icon: '🎨', source: '社区' },
    { name: 'flux-image', desc: 'Flux 图像生成', icon: '✨', source: '社区' },
    { name: 'ai-product-photography', desc: 'AI产品摄影', icon: '📸', source: '社区' },
  ],
  '视频 & 数字人': [
    { name: 'ai-marketing-videos', desc: 'AI营销视频生成', icon: '🎬', source: '社区' },
    { name: 'ai-video-generation', desc: 'AI视频生成工具', icon: '🎥', source: '社区' },
    { name: 'remotion-render', desc: 'Remotion 视频渲染', icon: '🎞️', source: '社区' },
    { name: 'jimeng-digital-human', desc: '即梦数字人', icon: '👤', source: '社区' },
  ],
  '微信 & 社交': [
    { name: 'wechat-analyzer', desc: '微信好友自动化分析与档案生成工具', icon: '📊', source: '原创' },
    { name: 'weflow', desc: 'WeFlow 微信聊天记录工具集成', icon: '💬', source: '原创' },
    { name: 'wechat-send-message', desc: '微信消息发送', icon: '📤', source: '原创' },
    { name: 'baoyu-post-to-wechat', desc: '宝玉发布到微信', icon: '📝', source: '社区' },
  ],
  '飞书生态': [
    { name: 'feishu-create-doc', desc: '创建飞书云文档', icon: '📄', source: '飞书官方' },
    { name: 'feishu-auto-reply', desc: '飞书消息自动回复', icon: '💬', source: '原创' },
    { name: 'feishu-card', desc: '发送富媒体飞书卡片', icon: '🎴', source: '社区' },
    { name: 'feishu-bitable', desc: '飞书多维表格管理', icon: '📊', source: '原创' },
    { name: 'feishu-calendar', desc: '飞书日历与日程管理', icon: '📅', source: '原创' },
    { name: 'feishu-task', desc: '飞书任务管理', icon: '✅', source: '原创' },
    { name: 'feishu-im-read', desc: '飞书IM消息读取', icon: '📜', source: '原创' },
    { name: 'feishu-bitable-upload', desc: '飞书多维表格附件上传', icon: '📎', source: '原创' },
  ],
  '开发 & 部署': [
    { name: 'browser-automation', desc: 'OpenClaw 浏览器自动化操作', icon: '🌐', source: '原创' },
    { name: 'cloudflare-deploy', desc: 'Cloudflare Pages 自动部署配置', icon: '☁️', source: '原创' },
    { name: 'skill-creator', desc: '创建或更新AgentSkills', icon: '🛠️', source: '官方' },
    { name: 'gateway-restart', desc: 'OpenClaw Gateway 服务重启', icon: '🔄', source: '原创' },
    { name: 'project-manager', desc: '项目管理工具', icon: '📋', source: '原创' },
    { name: 'vercel-react-best-practices', desc: 'React开发最佳实践', icon: '⚛️', source: 'Vercel官方' },
    { name: 'web-design-guidelines', desc: '前端设计最佳实践', icon: '🎨', source: 'Vercel官方' },
    { name: 'vercel-composition-patterns', desc: 'React组件设计模式', icon: '🧩', source: 'Vercel官方' },
  ],
  '内容生成': [
    { name: 'edge-tts', desc: '文本转语音', icon: '🔊', source: 'github' },
    { name: 'pdf-generator', desc: 'PDF生成工具', icon: '📄', source: 'github' },
    { name: 'seedream-image-generation', desc: '字节Seedream图像生成', icon: '🖼️', source: '原创' },
    { name: 'infographic-designer', desc: '信息图设计与视觉生成', icon: '📊', source: '虾评Skill' },
  ],
  '搜索 & 提取': [
    { name: 'search-layer', desc: '多源搜索聚合', icon: '🔍', source: 'github' },
    { name: 'ddg-web-search', desc: 'DuckDuckGo网页搜索', icon: '🦆', source: 'github' },
    { name: 'content-extract', desc: '网页内容提取为Markdown', icon: '📜', source: 'github' },
    { name: 'mineru-extract', desc: 'MinerU专业网页解析', icon: '⛏️', source: 'github' },
  ],
  '效率工具': [
    { name: 'diary-assistant', desc: '日记助手', icon: '📔', source: '原创' },
    { name: 'brainstorming', desc: '头脑风暴工具', icon: '💡', source: '虾评Skill' },
    { name: 'todolist-manager', desc: '个人待办管理', icon: '✅', source: '原创' },
  ],
  '技能管理': [
    { name: 'swap', desc: '技能交换功能', icon: '🔀', source: '原创' },
    { name: 'find-skills', desc: '发现和安装agent技能', icon: '📦', source: 'clawhub' },
    { name: 'skill-radar', desc: '热门技能雷达', icon: '📡', source: '原创' },
    { name: 'skill-auditor', desc: '技能质量审计', icon: '🔎', source: '原创' },
  ],
  '系统 & 工具': [
    { name: 'capability-evolver', desc: 'AI智能体自我进化引擎', icon: '🧬', source: '原创' },
    { name: 'task-monitor', desc: '实时任务监控面板', icon: '📈', source: '原创' },
    { name: 'conversation-save', desc: '对话存档', icon: '💾', source: '原创' },
    { name: 'self-improving-agent', desc: '持续改进智能体', icon: '♻️', source: '开源社区' },
  ],
  '微信公众号': [
    { name: 'wechat-mp-cn', desc: '微信公众号监控', icon: '📱', source: 'github' },
  ],
};

export default function Home() {
  const totalSkills = Object.values(SKILLS).flat().length;
  
  return (
    <div className="min-h-screen bg-slate-950">
      <div className="fixed inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-red-500/5"></div>
      <div className="fixed inset-0" style={{
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)',
        backgroundSize: '40px 40px'
      }}></div>
      
      <div className="relative">
        <div className="container mx-auto px-6 pt-20 pb-12">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center text-3xl">
                🦞
              </div>
              <h1 className="text-4xl font-black text-white">OpenClaw Skills</h1>
            </div>
            
            <p className="text-lg text-slate-400 mb-8">
              {totalSkills} 个强大技能，让 AI 助手无所不能
            </p>
            
            <a href="https://github.com/zhangxun057/openclaw-skills" 
               target="_blank"
               className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-orange-500/50 transition-all text-sm">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              查看源码
            </a>
          </div>

          <div className="mb-12">
            <SearchBox />
          </div>

          {Object.entries(SKILLS).map(([category, skills]) => (
            <div key={category} className="mb-12">
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">
                {category}
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {skills.map(skill => (
                  <SkillCard key={skill.name} skill={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
