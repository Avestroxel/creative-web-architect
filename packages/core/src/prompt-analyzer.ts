/**
 * Prompt Analyzer for Creative Web Architect Knowledge Ingestion.
 * Handles security sanitization, section chunking, semantic extraction,
 * and translation into structured engineering techniques.
 */

import {
  KnowledgeCategory,
  LearnedTechnique,
  PromptSection,
  SourceReference
} from './knowledge-types.js';

/** Security patterns to detect in external reference prompts */
const INJECTION_PATTERNS = [
  /ignore\s+(all\s+)?(previous|prior)\s+instructions/i,
  /system\s+prompt\s+override/i,
  /bypass\s+(safety|content)\s+filters/i,
  /rm\s+-rf\s+[/~]/i,
  /delete\s+all\s+(files|data)/i,
  /curl\s+-[sS]?\s+.*(webhook|pastebin|ngrok|eval)/i,
  /eval\s*\(/i,
  /child_process/i,
  /process\.exit/i,
  /export\s+(AWS_|OPENAI_|ANTHROPIC_|GEMINI_)/i
];

/** Category keyword mapping for automated classification */
const CATEGORY_KEYWORDS: Record<KnowledgeCategory, string[]> = {
  'scroll-animations': [
    'scroll', 'parallax', 'scrub', 'pinned', 'storytelling',
    'timeline', 'clip-path', 'mask reveal', 'horizontal scroll', 'horizontal'
  ],
  'button-interactions': [
    'button', 'btn', 'magnetic', 'press feedback', 'split-label',
    'morphing state', 'directional hover', 'tactile click', 'ripple', 'click'
  ],
  'micro-interactions': [
    'toggle', 'switch', 'segmented control', 'slider', 'accordion',
    'tabs', 'checkbox', 'radio button', 'tactile feedback', 'spring thumb'
  ],
  'hover-effects': [
    'hover', 'cursor', '3d tilt', 'perspective movement',
    'directional reveal', 'image preview', 'magnetism', 'sheen'
  ],
  'page-transitions': [
    'page transition', 'route transition', 'shared element',
    'page wipe', 'staggered nav', 'floating header', 'navigation reveal'
  ],
  'liquid-glass': [
    'liquid glass', 'glassmorphism', 'specular highlight', 'frosted blur',
    'refraction', 'optical depth', 'translucent surface', 'chromatic', 'glass'
  ],
  'typography': [
    'typography', 'kinetic type', 'font scale', 'tracking', 'editorial serif',
    'kerning', 'letter stagger', 'text reveal', 'font', 'serif', 'sans', 'type',
    'headline', 'clamp', 'letter-spacing'
  ],
  'three-dimensional-web': [
    'three.js', 'webgl', '3d scene', 'camera orbit', 'gltf',
    'mesh', 'canvas 3d', 'shader', 'geometry', 'orthographic'
  ],
  'performance-engineering': [
    '60 fps', 'requestanimationframe', 'layout thrashing', 'gpu acceleration',
    'will-change', 'intersectionobserver', 'frame budget', 'render loop'
  ],
  'accessibility': [
    'accessibility', 'wcag', 'prefers-reduced-motion', 'screen reader',
    'aria', 'keyboard focus', 'contrast ratio', 'touch target'
  ],
  'color-systems': [
    'color palette', 'monochrome', 'obsidian', 'charcoal',
    'neutral contrast', 'saturation', 'pigment', 'dark mode', 'palette'
  ],
  'visual-composition': [
    'composition', 'bento layout', 'asymmetric grid', 'editorial layout',
    'whitespace', 'split-screen', 'hierarchical balance', 'proportions', 'grid'
  ],
  'art-direction': [
    'art direction', 'brand archetype', 'design philosophy',
    'moodboard', 'visual tone', 'luxury restraint', 'aesthetic'
  ],
  'creative-storytelling': [
    'narrative', 'chapter progression', 'cinematic rhythm',
    'pacing', 'visual journey', 'dramatic tension', 'reveal sequence'
  ],
  'ui-components': [
    'modal', 'drawer', 'tooltip', 'dock', 'hud', 'data card',
    'floating panel', 'spec sheet', 'catalog grid'
  ]
};

/** Skill mapping for target skills */
const CATEGORY_TO_SKILL_MAP: Record<KnowledgeCategory, string> = {
  'scroll-animations': 'advanced-scroll-animation',
  'button-interactions': 'premium-button-interactions',
  'micro-interactions': 'toggle-and-switch-motion',
  'hover-effects': 'hover-interaction-design',
  'page-transitions': 'page-transitions',
  'liquid-glass': 'refined-liquid-glass',
  'typography': 'typography',
  'three-dimensional-web': 'three-dimensional-web',
  'performance-engineering': 'animation-performance',
  'accessibility': 'motion-accessibility',
  'color-systems': 'no-excessive-glow-policy',
  'visual-composition': 'layout-composition',
  'art-direction': 'premium-visual-direction',
  'creative-storytelling': 'cinematic-motion',
  'ui-components': 'design-system'
};

/**
 * Scan raw prompt text for potential security risks or prompt injections.
 */
export function sanitizePromptContent(rawContent: string): {
  isSafe: boolean;
  sanitized: string;
  securityWarnings: string[];
} {
  const securityWarnings: string[] = [];
  let isSafe = true;

  for (const pattern of INJECTION_PATTERNS) {
    if (pattern.test(rawContent)) {
      securityWarnings.push(`Flagged suspicious pattern matching ${pattern.toString()}`);
      isSafe = false;
    }
  }

  // Strip potential script injection tags in code blocks if dangerous
  const sanitized = rawContent
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '<!-- script-sanitized -->');

  return { isSafe, sanitized, securityWarnings };
}

/**
 * Chunk a long prompt into logical sections based on markdown headers.
 * Does not discard content; groups paragraphs under their nearest header.
 */
export function chunkPromptIntoSections(content: string): PromptSection[] {
  const lines = content.split(/\r?\n/);
  const sections: PromptSection[] = [];
  let currentTitle = 'Overview & Philosophy';
  let currentBuffer: string[] = [];

  for (const line of lines) {
    const headerMatch = line.match(/^(?:#{1,4}|(?:\d+\.)|PART\s+[0-9IVX]+)\s+(.+)$/i);
    if (headerMatch) {
      if (currentBuffer.length > 0 && currentBuffer.join('').trim().length > 0) {
        sections.push({
          title: currentTitle,
          content: currentBuffer.join('\n').trim(),
          inferredCategory: inferCategoryFromText(currentTitle + ' ' + currentBuffer.join('\n'))
        });
        currentBuffer = [];
      }
      currentTitle = headerMatch[1].replace(/[:#]/g, '').trim();
    } else {
      currentBuffer.push(line);
    }
  }

  if (currentBuffer.length > 0 && currentBuffer.join('').trim().length > 0) {
    sections.push({
      title: currentTitle,
      content: currentBuffer.join('\n').trim(),
      inferredCategory: inferCategoryFromText(currentTitle + ' ' + currentBuffer.join('\n'))
    });
  }

  return sections;
}

/**
 * Inactive or automated classification of text into a KnowledgeCategory.
 */
export function inferCategoryFromText(text: string): KnowledgeCategory {
  const lower = text.toLowerCase();
  let bestCategory: KnowledgeCategory = 'art-direction';
  let highestScore = 0;

  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS) as [KnowledgeCategory, string[]][]) {
    let score = 0;
    for (const kw of keywords) {
      if (lower.includes(kw)) {
        score++;
      }
    }
    if (score > highestScore) {
      highestScore = score;
      bestCategory = category;
    }
  }

  return bestCategory;
}

/**
 * Extract technology names mentioned in text.
 */
function extractTechnologies(text: string): string[] {
  const techKeywords = [
    'CSS Grid', 'Flexbox', 'Three.js', 'React', 'TypeScript',
    'GSAP', 'ScrollTrigger', 'WebGL', 'GLSL', 'Canvas API',
    'Web Audio API', 'ResizeObserver', 'IntersectionObserver',
    'backdrop-filter', 'clip-path', 'Vanilla JS', 'SVG'
  ];
  return techKeywords.filter((tech) =>
    new RegExp(`\\b${tech.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'i').test(text)
  );
}

/**
 * Helper to build a clean kebab-case ID.
 */
function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

/**
 * Extract an actionable LearnedTechnique from a single prompt section.
 */
export function extractTechniqueFromSection(
  section: PromptSection,
  source: SourceReference
): LearnedTechnique | null {
  // If the section is trivial or too short, skip
  if (section.content.trim().length < 40) {
    return null;
  }

  const category = section.inferredCategory || inferCategoryFromText(section.title + ' ' + section.content);
  const id = slugify(section.title.slice(0, 48));
  const technologies = extractTechnologies(section.content);
  if (technologies.length === 0) {
    technologies.push('CSS3', 'Modern DOM');
  }

  // Extract tags from keywords found
  const tags: string[] = [category];
  const lowerContent = section.content.toLowerCase();
  for (const [cat, keywords] of Object.entries(CATEGORY_KEYWORDS) as [KnowledgeCategory, string[]][]) {
    for (const kw of keywords) {
      if (lowerContent.includes(kw) && !tags.includes(kw)) {
        tags.push(kw);
        if (tags.length >= 6) break;
      }
    }
    if (tags.length >= 6) break;
  }

  // Check if neon / glow is mentioned
  const mentionsNeon = /neon|glow|cyberpunk|bloom/i.test(section.content);
  const isExempt = mentionsNeon && /cyberpunk|neon\s+aesthetic|futuristic\s+cyber/i.test(section.content);

  // Extract key sentences for structured fields
  const sentences = section.content.split(/[.!?]\s+/).map((s) => s.trim()).filter(Boolean);
  const description = sentences.slice(0, 2).join('. ') + '.';
  const implementationApproach = sentences.slice(2, 6).join('. ') || description;

  const targetSkill = CATEGORY_TO_SKILL_MAP[category] || 'design-system';

  return {
    id,
    name: section.title,
    description,
    category,
    tags,
    designPhilosophy: sentences[0] || 'Refined architectural elegance with physical restraint.',
    appropriateUseCases: [
      'High-end editorial showcases',
      'Luxury brand digital experiences',
      'Responsive interaction-rich web applications'
    ],
    implementationApproach,
    relevantTechnologies: technologies,
    performanceConsiderations: 'Utilize translate3d, will-change sparingly, and clamp animation timelines under 600ms.',
    accessibilityRequirements: 'Provide prefers-reduced-motion override and ensure WCAG 2.1 AA keyboard focus visibility.',
    sourceReference: source,
    validationStatus: 'imported',
    targetSkill,
    isExemptFromNoGlow: isExempt
  };
}

/**
 * Complete analysis of a prompt file or raw prompt string.
 */
export function analyzePrompt(
  rawContent: string,
  source: SourceReference
): {
  isSafe: boolean;
  securityWarnings: string[];
  sections: PromptSection[];
  techniques: LearnedTechnique[];
} {
  const { isSafe, sanitized, securityWarnings } = sanitizePromptContent(rawContent);
  const sections = chunkPromptIntoSections(sanitized);
  const techniques: LearnedTechnique[] = [];

  for (const sec of sections) {
    const tech = extractTechniqueFromSection(sec, source);
    if (tech) {
      techniques.push(tech);
    }
  }

  return {
    isSafe,
    securityWarnings,
    sections,
    techniques
  };
}
