export type ProjectStatus = "Concept demo" | "Prototype in design";

export interface Project {
  slug: string;
  title: string;
  status: ProjectStatus;
  problem: string;
  summary: string;
  stack: string[];
  /** Ordered stages shown as the architecture diagram. */
  architecture: string[];
}

/**
 * Every entry here is an internal concept demo. None is client work.
 * Move an item into a real case-study list only once it has actually shipped for a client.
 */
export const projects: Project[] = [
  {
    slug: "ai-lead-management-system",
    title: "AI Lead Management System",
    status: "Concept demo",
    problem: "Leads from several sources are entered late, scored inconsistently, and followed up unevenly.",
    summary:
      "Collects inquiries, scores them against editable criteria, creates a CRM-style record, and drafts a follow-up for review.",
    stack: ["Next.js", "TypeScript", "Supabase", "LLM API"],
    architecture: ["Lead form", "Qualification step", "Supabase table", "Owner notification", "Draft follow-up"],
  },
  {
    slug: "intelligent-whatsapp-assistant",
    title: "Intelligent WhatsApp Assistant",
    status: "Concept demo",
    problem: "Customers ask repeated questions outside office hours and wait for an answer.",
    summary:
      "Answers questions from a supplied knowledge base, collects case details, and flags conversations for a human.",
    stack: ["WhatsApp Business Platform", "Next.js API routes", "Supabase", "LLM API"],
    architecture: ["Incoming message", "Intent check", "Knowledge lookup", "Reply or hand-off", "Conversation log"],
  },
  {
    slug: "automated-recruitment-workflow",
    title: "Automated Recruitment Workflow",
    status: "Prototype in design",
    problem: "Recruiters read every application by hand and chase candidates for availability.",
    summary:
      "Extracts structured details from CVs, compares them with a role brief, and prepares a shortlist for a recruiter to decide.",
    stack: ["Python or TypeScript", "Document parsing", "Supabase", "LLM API"],
    architecture: ["CV upload", "Detail extraction", "Role match", "Recruiter review", "Candidate message draft"],
  },
  {
    slug: "ai-business-research-assistant",
    title: "AI Business Research Assistant",
    status: "Prototype in design",
    problem: "Preparing for a meeting or a market review means hours of searching and note-taking.",
    summary:
      "Gathers public information on a company or topic, lists its sources, and produces a short brief with citations.",
    stack: ["Next.js", "TypeScript", "Web search API", "LLM API"],
    architecture: ["Research question", "Source search", "Source reading", "Brief with citations", "Review"],
  },
];
