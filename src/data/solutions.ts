import { Rocket, Megaphone, House, ShoppingCart, UserSearch, Building2, type LucideIcon } from "lucide-react";

export interface Solution {
  id: string;
  title: string;
  icon: LucideIcon;
  intro: string;
  examples: { title: string; detail: string }[];
}

/**
 * Examples describe what Synvora AI can build for each industry.
 * They are proposals, not claims of existing integrations or deployments.
 */
export const solutions: Solution[] = [
  {
    id: "startups",
    title: "Startups",
    icon: Rocket,
    intro: "Small teams carry many roles. Automation gives them back the hours that repetitive admin takes.",
    examples: [
      { title: "Inbound triage", detail: "Sort inquiries, answer common ones, and route the rest to the right founder." },
      { title: "Onboarding workflows", detail: "Create accounts, send welcome sequences, and collect setup details automatically." },
      { title: "Weekly founder report", detail: "Pull metrics from your tools into one short summary." },
    ],
  },
  {
    id: "digital-marketing-agencies",
    title: "Digital Marketing Agencies",
    icon: Megaphone,
    intro: "Agencies repeat the same reporting and coordination work across many clients.",
    examples: [
      { title: "Client reporting", detail: "Assemble campaign data into draft reports for an account manager to review." },
      { title: "Content briefs", detail: "Research a topic and draft a structured brief for writers." },
      { title: "Lead routing", detail: "Capture leads from campaigns and send them to the right client or team." },
    ],
  },
  {
    id: "real-estate",
    title: "Real Estate Businesses",
    icon: House,
    intro: "Property inquiries arrive at all hours, and fast follow-up often decides who wins the client.",
    examples: [
      { title: "Enquiry assistant", detail: "Answer common property questions and collect buyer requirements." },
      { title: "Viewing scheduling", detail: "Offer available slots and confirm bookings with agents." },
      { title: "Follow-up reminders", detail: "Prompt agents to contact leads at the right time with a drafted message." },
    ],
  },
  {
    id: "e-commerce",
    title: "E-commerce",
    icon: ShoppingCart,
    intro: "Store owners handle repeated questions about orders, returns, and products.",
    examples: [
      { title: "Order support assistant", detail: "Answer order and policy questions from your approved content." },
      { title: "Catalogue enrichment", detail: "Draft product descriptions and tags for human review." },
      { title: "Return handling", detail: "Collect return details and prepare the case for your team." },
    ],
  },
  {
    id: "recruitment-agencies",
    title: "Recruitment Agencies",
    icon: UserSearch,
    intro: "Recruiters read hundreds of applications and chase candidates by hand.",
    examples: [
      { title: "CV screening support", detail: "Extract structured details from CVs and compare them with a role brief for recruiter review." },
      { title: "Candidate updates", detail: "Keep candidates informed with drafted status messages." },
      { title: "Interview coordination", detail: "Collect availability and propose interview times." },
    ],
  },
  {
    id: "small-and-medium-enterprises",
    title: "Small and Medium Enterprises",
    icon: Building2,
    intro: "Established businesses often run on spreadsheets, inboxes, and habit. Connecting them saves time without replacing everything.",
    examples: [
      { title: "Invoice and document intake", detail: "Read incoming documents and pass the data to your records for approval." },
      { title: "Internal knowledge assistant", detail: "Let staff ask questions about policies and procedures." },
      { title: "Operations dashboard", detail: "Combine data from several tools into one regular summary." },
    ],
  },
];
