import SkillCard from '@/components/SkillCard'
import SearchBox from '@/components/SearchBox'

export const revalidate = 3600

// 静态技能列表（从你的反馈中获取）
const SKILLS = [
  { name: 'agent-tools', desc: 'Run 150+ AI apps via inference.sh CLI - image generation, video, LLMs, search, Twitter automation.' },
  { name: 'ai-image-generation', desc: 'AI图像生成工具集成' },
  { name: 'ai-marketing-videos', desc: 'AI营销视频生成' },
  { name: 'ai-product-photography', desc: 'AI产品摄影' },
  { name: 'ai-video-generation', desc: 'AI视频生成工具' },
  { name: 'baoyu-post-to-wechat', desc: '宝玉发布到微信' },
  { name: 'browser-automation', desc: 'OpenClaw 浏览器自动化操作' },
  { name: 'capability-evolver', desc: 'A self-evolution engine for AI agents' },
  { name: 'cloudflare-deploy', desc: 'Cloudflare Pages 自动部署配置' },
  { name: 'conversation-save', desc: '对话存档技能' },
  { name: 'feishu', desc: '飞书集成工具' },
  { name: 'flux-image', desc: 'Flux 图像生成' },
  { name: 'gateway-restart', desc: 'OpenClaw Gateway 服务重启' },
  { name: 'jimeng-digital-human', desc: '即梦数字人' },
  { name: 'remotion-render', desc: 'Remotion 视频渲染' },
  { name: 'skill-creator', desc: 'Create or update AgentSkills' },
  { name: 'skill-swap', desc: '技能交换功能' },
  { name: 'task-monitor', desc: 'Real-time web dashboard for OpenClaw sessions' },
  { name: 'wechat-analyzer', desc: '微信好友自动化分析与档案生成工具' },
  { name: 'wechat-send-message', desc: '微信消息发送' },
  { name: 'weflow', desc: 'WeFlow 微信聊天记录工具集成' },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* 背景效果 */}
      <div className="fixed inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-red-500/5"></div>
      <div className="fixed inset-0" style={{
        backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)`,
        backgroundSize: '40px 40px'
      }}></div>
      
      <div className="relative">
        {/* Hero */}
        <div className="container mx-auto px-6 pt-24 pb-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-3 mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-600 rounded-2xl flex items-center justify-center text-3xl shadow-2xl shadow-orange-500/30">
                🦞
              </div>
              <h1 className="text-5xl font-black text-white">OpenClaw Skills</h1>
            </div>
            
            <p className="text-xl text-slate-400 mb-12">
              {SKILLS.length} 个强大技能，让 AI 助手无所不能
            </p>
            
            <a href="https://github.com/zhangxun057/openclaw-skills" 
               target="_blank"
               className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-xl font-semibold hover:shadow-lg hover:shadow-orange-500/50 transition-all">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              查看源码
            </a>
          </div>
        </div>

        {/* Search */}
        <div className="container mx-auto px-6 mb-12">
          <SearchBox />
        </div>

        {/* Skills */}
        <div className="container mx-auto px-6 pb-24">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SKILLS.map(skill => (
              <SkillCard key={skill.name} skill={skill} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
