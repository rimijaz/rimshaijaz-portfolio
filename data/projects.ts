export type ProjectImageSlot = {
  path: string
  label: string
  alt: string
}

export type Project = {
  name: string
  description: string
  stack: string[]
  demo: string | null
  github: string | null
  featured: boolean
  url?: string | null
  slug: string
  imageLabel: string
  imageSlots: ProjectImageSlot[]
  caseStudy: {
    overview: string
    contribution: string[]
    implementation: string[]
    outcome?: string
  }
}

const projectImages = (slug: string, name: string, files: string[]): ProjectImageSlot[] => files.map((file) => {
  const label = file.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ')
  return { path: `/images/projects/${slug}/${file}`, label: `${name} ${label}`, alt: `${name} ${label} screenshot` }
})

// Keep this array in portfolio priority order. The homepage and detail pages consume it.
export const projects: Project[] = [
  {
    name: 'AsklyForm',
    description: 'MERN stack form builder with drag-and-drop editing, live preview, MongoDB storage, and JWT/bcrypt authentication.',
    stack: ['React.js', 'Node.js', 'MongoDB', 'Material UI'],
    demo: null,
    github: null,
    featured: true,
    url: 'https://asklyform.vercel.app',
    slug: 'asklyform',
    imageLabel: 'AsklyForm screenshot',
    imageSlots: projectImages('asklyform', 'AsklyForm', ['overview.png', 'templates.png', 'form-editor.png', 'login.png']),
    caseStudy: {
      overview: 'AsklyForm is a MERN stack form builder created as a final year project, with form creation, drag-and-drop editing, and live preview.',
      contribution: ['Built the form creation, drag-and-drop editing, and live preview experiences.', 'Developed the Node.js and Express.js backend with MongoDB storage.', 'Implemented JWT and bcrypt authentication.'],
      implementation: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'Material UI', 'JWT', 'bcrypt'],
    },
  },
  {
    name: 'ROI',
    description: 'Multi-company SaaS business management platform covering CRM, customers, suppliers, appointments, invoicing, subscriptions, roles, permissions, and communication workflows.',
    stack: ['React.js', 'JavaScript', 'Redux', 'REST APIs', 'Stripe'],
    demo: null,
    github: null,
    featured: true,
    url: 'https://roilevelup.com',
    slug: 'roi',
    imageLabel: 'ROI product screenshot',
    imageSlots: projectImages('roi', 'ROI', ['overview.png']),
    caseStudy: {
      overview: 'ROI is a multi-company SaaS business management platform covering CRM, customers, suppliers, appointments, invoicing, subscriptions, roles, permissions, and communication workflows.',
      contribution: ['Built frontend product experiences across business management workflows.', 'Integrated REST APIs and Redux-based application state.', 'Implemented Stripe payments and external services including DHL and Trello.', 'Contributed to communication channels with multimedia and video support.'],
      implementation: ['React.js', 'JavaScript', 'Redux', 'REST APIs', 'Stripe', 'DHL', 'Trello'],
    },
  },
  {
    name: 'The Pathfinder Hub',
    description: 'Career development platform with profiles, resume management, forms, career workflows, Stripe payments, and REST API integration.',
    stack: ['React.js', 'JavaScript', 'Stripe', 'REST APIs'],
    demo: null,
    github: null,
    featured: true,
    url: 'https://app.thepathfinderhub.com',
    slug: 'the-pathfinder-hub',
    imageLabel: 'The Pathfinder Hub screenshot',
    imageSlots: projectImages('the-pathfinder-hub', 'The Pathfinder Hub', ['dashboard.png']),
    caseStudy: {
      overview: 'The Pathfinder Hub is a career development platform with profiles, resume management, forms, and career workflows.',
      contribution: ['Built user profiles, resume management, and career workflows.', 'Integrated Stripe payments and REST APIs.'],
      implementation: ['React.js', 'JavaScript', 'Stripe', 'REST APIs'],
    },
  },
  {
    name: 'Social Rocket AI',
    description: 'AI-powered social media platform for content, scheduling, analytics, and business workflows, with a technical SEO foundation built for discoverability.',
    stack: ['Next.js', 'React.js', 'JavaScript', 'Tailwind CSS'],
    demo: null,
    github: null,
    featured: false,
    url: 'https://socialrocketai.com',
    slug: 'social-rocket-ai',
    imageLabel: 'Social Rocket AI screenshot',
    imageSlots: projectImages('social-rocket-ai', 'Social Rocket AI', ['overview.png', 'integrations.png']),
    caseStudy: {
      overview: 'Social Rocket AI is an AI-powered social media platform for content, scheduling, analytics, and business workflows.',
      contribution: ['Built responsive interfaces across social content and scheduling workflows.', 'Implemented analytics and business-facing product experiences.', 'Handled technical SEO including metadata, Open Graph, canonical URLs, structured data, sitemap, and robots.txt.'],
      implementation: ['Next.js', 'React.js', 'JavaScript', 'Tailwind CSS'],
      outcome: 'The CV records Lighthouse scores of 98 mobile and 99 desktop performance, with 100 in accessibility, best practices, and SEO.',
    },
  },
  {
    name: 'TrackPilot AI',
    description: 'Workforce productivity SaaS for time tracking, productivity monitoring, project management, and team performance.',
    stack: ['Next.js', 'React.js', 'TypeScript', 'Tailwind CSS'],
    demo: null,
    github: null,
    featured: false,
    url: 'https://trackpilotai.com',
    slug: 'trackpilot-ai',
    imageLabel: 'TrackPilot AI screenshot',
    imageSlots: projectImages('trackpilot-ai', 'TrackPilot AI', ['overview.png', 'how-it-works.png']),
    caseStudy: {
      overview: 'TrackPilot AI is a workforce productivity SaaS product for time tracking, productivity monitoring, project management, and team performance.',
      contribution: ['Built responsive interfaces for productivity and project workflows.', 'Improved reusable page architecture and product animations.', 'Contributed to SEO-friendly page structure and performance work.'],
      implementation: ['Next.js', 'React.js', 'TypeScript', 'Tailwind CSS'],
      outcome: 'The CV records Lighthouse scores of 94 mobile and 96 desktop performance, with 100 in SEO and best practices and 96 in accessibility.',
    },
  },
  {
    name: 'Team Suite AI',
    description: 'Team management platform for daily status reporting, project management, task ownership, and manager visibility.',
    stack: ['Next.js', 'React.js', 'Tailwind CSS'],
    demo: null,
    github: null,
    featured: false,
    slug: 'team-suite-ai',
    imageLabel: 'Team Suite AI screenshot',
    imageSlots: projectImages('teamsuite-ai', 'Team Suite AI', ['overview.png', 'workflow.png']),
    caseStudy: {
      overview: 'Team Suite AI is a team management product for daily status reporting and project management.',
      contribution: ['Also shipped as part of the portfolio of products built with Next.js, React.js, and Tailwind CSS.'],
      implementation: ['Next.js', 'React.js', 'Tailwind CSS'],
    },
  },
  {
    name: 'FlowLedgerPro',
    description: 'Accounting and ERP product for business accounts, sales pipelines, inventory health, invoices, and payment workflows.',
    stack: ['Next.js', 'React.js', 'Tailwind CSS'],
    demo: null,
    github: null,
    featured: false,
    slug: 'flow-ledgerpro',
    imageLabel: 'FlowLedgerPro screenshot',
    imageSlots: projectImages('flow-ledgerpro', 'FlowLedgerPro', ['overview.png', 'sales-workflow.png']),
    caseStudy: {
      overview: 'FlowLedgerPro is an accounting and ERP product included among the products shipped in the CV.',
      contribution: ['Also shipped as part of the portfolio of products built with Next.js, React.js, and Tailwind CSS.'],
      implementation: ['Next.js', 'React.js', 'Tailwind CSS'],
    },
  },
  {
    name: 'ProAdvisorDrivers',
    description: 'AI-assisted interactive application enhanced with game-like form workflows and ongoing production improvements.',
    stack: ['React.js', 'TypeScript', 'AI / API integration'],
    demo: null,
    github: null,
    featured: false,
    slug: 'proadvisordrivers',
    imageLabel: 'ProAdvisorDrivers screenshot',
    imageSlots: projectImages('proadvisordrivers', 'ProAdvisorDrivers', ['overview.png']),
    caseStudy: {
      overview: 'ProAdvisorDrivers is an AI-assisted interactive web application with a more engaging, game-like form experience.',
      contribution: ['Maintained and enhanced the production application.', 'Resolved issues and delivered product requirements.', 'Built AI-assisted form workflows for an interactive user journey.'],
      implementation: ['React.js', 'TypeScript', 'AI / API integration'],
    },
  },
]

export const featuredProjects = projects.filter((project) => project.featured)
export const otherProjects = projects.filter((project) => !project.featured)
