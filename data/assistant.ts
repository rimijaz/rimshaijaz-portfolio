import { education } from './education'
import { experience } from './experience'
import { projects } from './projects'
import { socialLinks } from './socials'
import { skills } from './skills'

export type AssistantLink = { label: string; href: string; external?: boolean }

export type AssistantResponse = {
  intro: string
  bullets?: string[]
  tags?: string[]
  links?: AssistantLink[]
  followUps?: string[]
  contextProjectSlug?: string
}

export type AssistantContext = { lastProjectSlug?: string; turn?: number }

const pick = <T,>(items: T[], turn = 0) => items[turn % items.length]

export const assistantWelcome: AssistantResponse = {
  intro: 'Hey! Looking for something specific? I can help you find the projects, skills, and experience most relevant to what you need.',
  followUps: [
    'I’m looking to hire a developer',
    'I want to explore her best projects',
    'I’m interested in her technical skills',
    'I want to know about her experience',
  ],
}

export const assistantQuickReplies = assistantWelcome.followUps ?? []

const normalize = (value: string) => value.toLowerCase().replace(/[^a-z0-9+#.]+/g, ' ').trim()
const hasAny = (query: string, values: string[]) => values.some((value) => {
  const target = normalize(value)
  return target.includes(' ') ? query.includes(target) : query.split(/\s+/).includes(target)
})

const skillTags = skills
  .filter((skill) => ['Frontend', 'State Management', 'Backend & APIs', 'Integrations', 'Quality & Delivery'].includes(skill.category))
  .map((skill) => skill.name)

const projectResponse = (project: (typeof projects)[number], turn = 0, extra?: string): AssistantResponse => ({
  intro: extra ?? pick([
    `${project.name} is ${project.caseStudy.overview.charAt(0).toLowerCase()}${project.caseStudy.overview.slice(1)}`,
    `Sure — ${project.caseStudy.overview}`,
  ], turn),
  bullets: project.caseStudy.contribution,
  tags: project.caseStudy.implementation,
  links: project.url ? [{ label: 'Visit live project', href: project.url, external: true }] : undefined,
  followUps: ['Show me her projects.', 'What technologies did she use for this project?'],
  contextProjectSlug: project.slug,
})

const projectTopics = projects.map((project) => ({
  matchers: [project.name, project.slug],
  response: (turn: number) => projectResponse(project, turn),
}))

const projectLinks = (selectedProjects = projects) => selectedProjects.filter((project) => project.url).map((project) => ({ label: `Visit ${project.name}`, href: project.url as string, external: true }))
const featuredProjectLinks = projectLinks(projects.slice(0, 3))
const reactProjects = projects.filter((project) => project.caseStudy.implementation.some((technology) => technology.toLowerCase().includes('react')))
const saasProjects = projects.filter((project) => ['roi', 'trackpilot-ai', 'flow-ledgerpro'].includes(project.slug))

const hiringResponse: AssistantResponse = {
  intro: 'Great! Rimsha is a Senior Software Engineer focused on modern web applications, responsive interfaces, and product-focused frontend development. Her work spans React, Next.js, TypeScript, JavaScript, state management, REST APIs, and integrations.',
  bullets: [
    'Relevant background: production SaaS, ERP, productivity, and AI-related web applications.',
    'A strong starting point: AsklyForm for full-stack product work, ROI for multi-company SaaS workflows, and The Pathfinder Hub for career-platform features.',
  ],
  links: [
    { label: 'View resume', href: '/resume.pdf' },
    ...featuredProjectLinks,
    { label: 'Read experience', href: '/#experience' },
    { label: 'Contact Rimsha', href: '/#contact' },
  ],
  followUps: ['Show me her technical skills.', 'Tell me about her experience.'],
}

const featuredProjectsResponse: AssistantResponse = {
  intro: 'Here’s a focused starting set, kept in portfolio priority order. Each one shows a different kind of product work:',
  bullets: [
    'AsklyForm — a MERN form builder with drag-and-drop editing, live preview, MongoDB storage, and authentication.',
    'ROI — a multi-company SaaS platform covering CRM, invoicing, subscriptions, permissions, and communication workflows.',
    'The Pathfinder Hub — a career development platform with profiles, resume management, forms, workflows, and Stripe payments.',
  ],
  links: [...featuredProjectLinks, { label: 'See projects on homepage', href: '/#projects' }],
  followUps: ['Show me a project using React.', 'Which project is relevant to SaaS applications?'],
}

const skillsResponse: AssistantResponse = {
  intro: 'Rimsha’s skills are strongest around building and shipping responsive web products. Here’s the verified toolkit grouped by the kind of work it supports:',
  bullets: [
    'Frontend: React.js, Next.js, JavaScript, TypeScript, HTML5, CSS3, Tailwind CSS, Material UI, and Framer Motion.',
    'State and APIs: Redux Toolkit, RTK Query, React Router, REST APIs, and Node.js/Express.js.',
    'Integrations and delivery: MongoDB, JWT/OAuth, Stripe, DHL/Trello integrations, technical SEO, accessibility, and performance.',
    'AI-assisted workflow: AI / LLM API integrations plus Claude, Cursor, GitHub Copilot, OpenAI Codex, and ChatGPT for development workflows.',
  ],
  links: [
    { label: 'View skills section', href: '/#skills' },
    { label: 'Explore React projects', href: '/#projects' },
  ],
  followUps: ['Show me a project using React.', 'Does she have experience with AI integrations?'],
}

const experienceResponse: AssistantResponse = {
  intro: 'Rimsha is a Senior Software Engineer at AppliconSoft, where she has progressed through React-focused and software engineering roles while shipping production web applications.',
  bullets: experience.map((job) => `${job.role} at ${job.company} — ${job.range}`),
  links: [
    { label: 'Read experience', href: '/#experience' },
    { label: 'View resume', href: '/resume.pdf' },
    { label: 'Contact Rimsha', href: '/#contact' },
  ],
  followUps: ['What technologies does she use?', 'Show me her projects.'],
}

const fallbackResponses: AssistantResponse[] = [
  { intro: 'I’m happy to help where I can. Here, I can tell you about Rimsha’s professional background, skills, and projects. What would you like to explore?', followUps: ['Show me her projects.', 'What technologies does Rimsha use?', 'How can I contact Rimsha?'] },
  { intro: 'I’d be glad to help. I can offer guidance on portfolio planning and also walk you through Rimsha’s experience, technical work, or education.', followUps: ['Help me plan a portfolio.', 'Tell me about her experience.', 'View her resume.'] },
  { intro: 'That’s a little outside what I can do here, but I can still help you shape a portfolio, review a project presentation, or explore Rimsha’s work.', followUps: ['Help me create a portfolio.', 'Show me her projects.', 'How can I contact Rimsha?'] },
]

export function getAssistantResponse(input: string, context: AssistantContext = {}): AssistantResponse {
  const query = normalize(input)
  const turn = context.turn ?? 0

  if (hasAny(query, ['good morning', 'good afternoon', 'good evening'])) {
    return { intro: `${pick(['Good morning', 'Good afternoon', 'Good evening'], turn)}! What would you like to know about Rimsha’s professional work?`, followUps: assistantQuickReplies.slice(0, 4) }
  }
  if (hasAny(query, ['thank you', 'thanks', 'thx'])) return { intro: pick(['You’re welcome! Let me know if you’d like to explore anything else.', 'Of course — happy to help.'], turn), followUps: ['Show me her projects.', 'View her resume.'] }
  if (hasAny(query, ['bye', 'goodbye', 'see you'])) return { intro: pick(['It was nice chatting with you! Feel free to come back if you’d like to learn more about Rimsha’s work.', 'Take care! I’m here whenever you want to explore Rimsha’s portfolio.'], turn) }
  if (hasAny(query, ['hi', 'hello', 'hey', 'how are you'])) return { intro: pick(['Hey! Welcome to Rimsha’s portfolio. What would you like to know about her work?', 'Hello! Feel free to ask me about Rimsha’s skills, experience, or projects.', 'I’m doing well, thanks for asking! How can I help you explore Rimsha’s portfolio?'], turn), followUps: assistantQuickReplies.slice(0, 4) }

  if (hasAny(query, ['looking to hire', 'hire a developer', 'hire rimsha', 'recruiter', 'potential client', 'evaluating her', 'need a developer'])) return hiringResponse
  if (hasAny(query, ['explore her best projects', 'best projects', 'featured projects', 'explore projects', 'show me her projects', 'which project should i look at first'])) return featuredProjectsResponse
  if (hasAny(query, ['interested in her technical skills', 'technical skills', 'show me her skills', 'what skills does she have'])) return skillsResponse
  if (hasAny(query, ['want to know about her experience', 'tell me about her experience', 'her experience', 'professional experience'])) return experienceResponse

  if (hasAny(query, ['create my portfolio', 'build my portfolio', 'make a portfolio', 'create a portfolio', 'build a portfolio', 'portfolio website', 'personal website', 'help me plan a portfolio', 'help me create a portfolio', 'help me create my portfolio', 'help me build my portfolio'])) {
    return {
      intro: 'Absolutely. A strong portfolio usually works best when it tells a focused story rather than trying to include everything at once.',
      bullets: ['Start with the role you want and a short, specific introduction.', 'Choose three to five projects that show different kinds of work.', 'For each project, explain your contribution, the stack, and what someone can actually see.', 'Make the resume, contact details, and strongest project easy to find.'],
      followUps: ['Are you starting from scratch or improving an existing site?', 'What kind of roles are you targeting?'],
    }
  }
  if (hasAny(query, ['improve my resume', 'resume feedback', 'cv feedback', 'write a cover letter', 'interview prep'])) {
    return { intro: 'I can help you think through the structure and wording. For a resume, I’d start by making the target role clear, putting the strongest evidence near the top, and turning responsibilities into concise contribution-focused bullets.', followUps: ['Help me improve my resume.', 'Tell me about Rimsha’s resume.', 'How can I contact Rimsha?'] }
  }

  const lastProject = context.lastProjectSlug ? projects.find((project) => project.slug === context.lastProjectSlug) : undefined
  if (lastProject && hasAny(query, ['which technologies', 'what technologies', 'tech stack', 'what did she use', 'frontend', 'built with', 'used'])) {
    return projectResponse(lastProject, turn, `${lastProject.name} uses ${lastProject.caseStudy.implementation.join(', ')}. Her contribution included ${lastProject.caseStudy.contribution[0].toLowerCase()}`)
  }
  if (lastProject && hasAny(query, ['demo', 'live site', 'live project', 'see it', 'visit it', 'link'])) {
    return lastProject.url
      ? { intro: `Yes — you can visit ${lastProject.name} here:`, links: [{ label: 'Open live project', href: lastProject.url, external: true }], followUps: ['What technologies did she use for this project?', 'Show me her projects.'], contextProjectSlug: lastProject.slug }
      : { intro: `${lastProject.name} does not have a public project link listed, but I can still walk you through its verified contribution and technologies.`, followUps: ['What technologies did she use for this project?'], contextProjectSlug: lastProject.slug }
  }
  if (lastProject && hasAny(query, ['tell me more', 'more about it', 'more about this', 'what about this project', 'features'])) return projectResponse(lastProject, turn)
  if (hasAny(query, ['which one', 'what project', 'that one', 'this project']) && !lastProject) return { intro: 'Which project would you like to explore? AsklyForm, ROI, The Pathfinder Hub, or one of the other case studies?', followUps: projects.slice(0, 4).map((project) => `Tell me about ${project.name}.`) }

  if (hasAny(query, ['project using react', 'projects using react', 'react project', 'react projects', 'show me a project using react'])) return { intro: 'These projects use React in their verified implementation details:', links: projectLinks(reactProjects), followUps: ['Tell me about AsklyForm.', 'What other technologies does Rimsha use?'] }
  if (hasAny(query, ['relevant to saas', 'saas applications', 'saas project', 'which project for saas'])) return { intro: 'For SaaS-oriented work, I’d start with these case studies:', bullets: saasProjects.map((project) => `${project.name} — ${project.caseStudy.overview}`), links: projectLinks(saasProjects), followUps: ['Tell me about ROI.', 'Show me her other projects.'] }

  if (hasAny(query, ['resume', 'cv', 'curriculum vitae', 'download resume', 'view resume'])) return { intro: 'Absolutely — you can open Rimsha’s current resume here:', links: [{ label: 'View Resume PDF', href: '/resume.pdf' }, { label: 'Read experience', href: '/#experience' }], followUps: ['Tell me about her experience.', 'What technologies does Rimsha use?'] }
  if (hasAny(query, ['contact', 'email', 'linkedin', 'github', 'reach rimsha', 'get in touch'])) return { intro: 'You can reach Rimsha through these professional links:', links: [{ label: socialLinks.email, href: `mailto:${socialLinks.email}` }, { label: 'LinkedIn', href: socialLinks.linkedin, external: true }, { label: 'GitHub', href: socialLinks.github, external: true }, { label: 'Contact section', href: '/#contact' }], followUps: ['Tell me about her experience.', 'Show me her projects.'] }

  const matchedProject = projectTopics.find(({ matchers }) => hasAny(query, matchers))
  if (matchedProject) return matchedProject.response(turn)

  if (hasAny(query, ['project', 'projects', 'portfolio', 'work', 'built', 'products', 'case study', 'case studies'])) return { intro: 'Rimsha’s project collection includes SaaS, productivity, AI, and business applications. Her featured work starts with AsklyForm, ROI, and The Pathfinder Hub:', links: projectLinks(), followUps: ['Tell me about AsklyForm.', 'Which technologies did she use?'] }
  if (hasAny(query, ['education', 'degree', 'university', 'study', 'academic', 'computer science'])) return { intro: 'Rimsha studied Computer Science at Virtual University of Pakistan:', bullets: education.map((item) => `${item.degree} — ${item.range}`), followUps: ['Tell me about her experience.', 'View her resume.'] }
  if (hasAny(query, ['experience', 'work history', 'employment', 'career', 'worked', 'appliconsoft', 'role'])) return { intro: 'Rimsha is a Senior Software Engineer with 2.5+ years of experience shipping production web applications at AppliconSoft.', bullets: experience.map((job) => `${job.role} at ${job.company} — ${job.range}`), followUps: ['What technologies does Rimsha use?', 'Tell me about her frontend experience.'] }
  if (hasAny(query, ['ai', 'artificial intelligence', 'llm', 'claude', 'cursor', 'copilot', 'codex', 'chatgpt', 'machine learning'])) return { intro: 'Rimsha has worked on AI-related products and uses AI-assisted development workflows with review and validation kept in the loop.', bullets: ['AI-powered product interfaces and workflow experiences', 'AI / LLM API integrations where supported by the product', 'Claude, Cursor, GitHub Copilot, OpenAI Codex, and ChatGPT for coding, debugging, and refactoring'], followUps: ['Tell me about Social Rocket AI.', 'What technologies does Rimsha use?'] }
  if (hasAny(query, ['frontend', 'front end', 'responsive design', 'ui', 'user interface', 'react', 'next js', 'nextjs'])) return { ...skillsResponse, intro: 'Rimsha’s frontend work is centered on responsive interfaces, reusable components, and modern web application architecture.', tags: skillTags }
  if (hasAny(query, ['skills', 'technologies', 'tech stack', 'tools', 'what does she use', 'programming languages', 'frameworks'])) return skillsResponse

  if (hasAny(query, ['capital of france'])) return { intro: 'That’s Paris! If you’re exploring Rimsha’s portfolio, I can also tell you about her technical skills, experience, or projects.', followUps: ['Show me her projects.', 'What technologies does Rimsha use?'] }
  if (hasAny(query, ['joke'])) return { intro: 'Why do programmers prefer dark mode? Because light attracts bugs. If you’d like, I can also show you some of Rimsha’s projects.', followUps: ['Show me her projects.', 'Tell me about her experience.'] }

  if (hasAny(query, ['help me', 'can you help', 'need help', 'how do i'])) return { intro: 'Sure — tell me a little more about what you’re trying to do, and I’ll offer a practical starting point. I can help with portfolio planning, project presentation, or exploring Rimsha’s work.', followUps: ['Help me create a portfolio.', 'Show me her projects.', 'Tell me about her experience.'] }

  return pick(fallbackResponses, turn)
}
