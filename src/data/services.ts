import { Bot, Workflow, MessagesSquare, Contact, Blocks, ChartColumn, type LucideIcon } from "lucide-react";

export interface Service {
  slug: string;
  title: string;
  short: string;
  icon: LucideIcon;
  seoTitle: string;
  seoDescription: string;
  problem: string;
  solution: string;
  workflow: { title: string; detail: string }[];
  features: string[];
  benefits: string[];
}

export const services: Service[] = [
  {
    slug: "ai-agent-development",
    title: "AI Agent Development",
    short: "Build intelligent agents that can understand tasks, interact with tools, and execute defined workflows.",
    icon: Bot,
    seoTitle: "AI Agent Development",
    seoDescription:
      "Custom AI agents that understand a task, use your tools, and carry out defined workflows with clear limits and human review.",
    problem:
      "Teams spend hours on tasks that follow a pattern but still need judgement: triaging requests, gathering information from several tools, drafting a first response. Fixed scripts break on anything unexpected, and doing it by hand does not scale.",
    solution:
      "We build AI agents that read a request, decide which tools to use, and complete the task inside boundaries you define. Each agent has a narrow job, a list of tools it may call, and a point where it hands over to a person.",
    workflow: [
      { title: "Receive the task", detail: "The agent takes a request from email, chat, a form, or another system." },
      { title: "Plan the steps", detail: "It works out what information and actions the task needs." },
      { title: "Use approved tools", detail: "It calls only the APIs, databases, and apps you have allowed." },
      { title: "Check and hand over", detail: "It validates the result, then completes the task or asks a person to review." },
    ],
    features: [
      "Task-specific agents with a narrow, testable scope",
      "Tool and API access limited to an explicit allow-list",
      "Human approval steps for sensitive actions",
      "Logs of every decision and tool call",
      "Fallback behaviour when the agent is unsure",
    ],
    benefits: [
      "Less time spent on routine, pattern-based work",
      "More consistent handling of repeat requests",
      "Staff stay in control of decisions that matter",
    ],
  },
  {
    slug: "business-process-automation",
    title: "Business Process Automation",
    short: "Automate repetitive operational processes and connect different business applications.",
    icon: Workflow,
    seoTitle: "Business Process Automation",
    seoDescription:
      "Automate repetitive operations and connect the apps your business already uses, with reliable workflows that are monitored and documented.",
    problem:
      "Information is copied between spreadsheets, inboxes, and tools by hand. Approvals stall in chat threads, reports are rebuilt every week, and small mistakes slip in because the process lives in someone's head.",
    solution:
      "We map the process as it runs today, remove the steps that do not need a person, and connect your applications so data moves on its own. AI is added only where the work needs reading, classifying, or writing.",
    workflow: [
      { title: "Map the current process", detail: "We document each step, owner, tool, and exception." },
      { title: "Choose what to automate", detail: "We pick the steps where automation helps and leave the rest with people." },
      { title: "Connect the systems", detail: "Triggers, data transfers, and approvals are built and tested end to end." },
      { title: "Monitor and adjust", detail: "Failures raise alerts, and the workflow is tuned as the business changes." },
    ],
    features: [
      "Workflows that connect your existing apps through their APIs",
      "Approval and escalation steps",
      "Error handling with alerts and retries",
      "Clear documentation of how each workflow runs",
      "AI steps for reading documents, classifying, and drafting",
    ],
    benefits: [
      "Fewer manual copy-and-paste tasks",
      "Fewer errors from repeated data entry",
      "A process that is written down instead of remembered",
    ],
  },
  {
    slug: "whatsapp-customer-support-automation",
    title: "WhatsApp & Customer Support Automation",
    short: "Build AI-powered customer interaction and support workflows.",
    icon: MessagesSquare,
    seoTitle: "WhatsApp & Customer Support Automation",
    seoDescription:
      "AI-assisted WhatsApp and customer support workflows that answer common questions, collect details, and hand complex cases to your team.",
    problem:
      "Customers message at all hours with the same questions. Replies are slow outside working hours, context is lost between messages, and support staff spend their day on answers that already exist in your documents.",
    solution:
      "We build an assistant that answers common questions from your own approved content, collects the details your team needs, and passes the conversation to a person when it should. It is designed around the WhatsApp Business Platform and your support process.",
    workflow: [
      { title: "Customer sends a message", detail: "The assistant reads the message and works out the intent." },
      { title: "Answer from approved content", detail: "It replies using your documents, not guesses." },
      { title: "Collect missing details", detail: "It asks for order numbers, dates, or other details the case needs." },
      { title: "Hand over when needed", detail: "Complex or sensitive cases go to your team with the conversation attached." },
    ],
    features: [
      "Answers grounded in your own FAQs and documents",
      "Hand-off to a human with full conversation context",
      "Conversation records stored for review",
      "Opt-in and message-template handling that follows WhatsApp Business rules",
      "Support for multiple languages where the model supports them",
    ],
    benefits: [
      "Faster first responses on common questions",
      "Support staff focus on cases that need judgement",
      "Consistent answers drawn from approved material",
    ],
  },
  {
    slug: "crm-lead-management-automation",
    title: "CRM & Lead Management Automation",
    short: "Automate lead capture, qualification, organization, and follow-ups.",
    icon: Contact,
    seoTitle: "CRM & Lead Management Automation",
    seoDescription:
      "Automate lead capture, qualification, CRM updates, and follow-up reminders so no inquiry is lost and your team talks to the right people first.",
    problem:
      "Leads arrive from forms, ads, email, and messages. They are entered late or not at all, nobody is sure who owns them, and follow-ups depend on someone remembering.",
    solution:
      "We route every lead into one place, enrich and score it using the criteria you define, assign an owner, and schedule follow-ups. The system drafts messages for your team to review rather than sending unchecked text.",
    workflow: [
      { title: "Capture", detail: "Leads from forms, email, and messaging are collected in one place." },
      { title: "Qualify", detail: "The system reads each inquiry and scores it against your criteria." },
      { title: "Organise", detail: "The record is created or updated in your CRM and assigned to an owner." },
      { title: "Follow up", detail: "Reminders and draft replies go to the owner at the right time." },
    ],
    features: [
      "Lead capture from web forms and inboxes",
      "Qualification rules you can read and change",
      "Duplicate detection",
      "Follow-up reminders and drafted replies",
      "Integration with the CRM you already use, scoped during discovery",
    ],
    benefits: [
      "Fewer leads lost between tools",
      "Clear ownership and next steps for each lead",
      "Sales time goes to qualified conversations",
    ],
  },
  {
    slug: "custom-ai-solutions",
    title: "Custom AI Solutions",
    short: "Develop customized AI systems for specific business challenges.",
    icon: Blocks,
    seoTitle: "Custom AI Solutions",
    seoDescription:
      "Custom-built AI systems for problems that off-the-shelf tools do not fit, from document processing to internal assistants.",
    problem:
      "Some problems do not fit a ready-made product: unusual documents, internal knowledge spread over many places, or a process unique to your business.",
    solution:
      "We scope the problem, test whether AI is the right tool, and build a purpose-made system. We start with a small working version so you can judge it on your real data before committing further.",
    workflow: [
      { title: "Define the problem", detail: "We agree what success looks like and how it will be measured." },
      { title: "Prototype on real data", detail: "A small version is tested against examples from your business." },
      { title: "Build and integrate", detail: "The system is developed, connected to your tools, and tested." },
      { title: "Hand over", detail: "You receive the code, documentation, and guidance for running it." },
    ],
    features: [
      "Internal knowledge assistants over your documents",
      "Document reading and data extraction",
      "Classification and routing models",
      "Web interfaces and APIs for your team",
      "Clear documentation and handover",
    ],
    benefits: [
      "A system shaped around your process",
      "Evidence from a prototype before larger investment",
      "Ownership of what is built",
    ],
  },
  {
    slug: "ai-powered-data-intelligence",
    title: "AI-Powered Data Intelligence",
    short: "Turn business data into useful insights and actionable reports.",
    icon: ChartColumn,
    seoTitle: "AI-Powered Data Intelligence",
    seoDescription:
      "Connect your business data, ask questions in plain language, and receive clear reports and insights without manual spreadsheet work.",
    problem:
      "Data sits in spreadsheets, a CRM, an accounting tool, and exports. Reports are rebuilt by hand, numbers disagree, and decisions wait for someone to find time to pull them together.",
    solution:
      "We bring the data you choose into one pipeline, clean it, and produce regular reports and a way to ask questions in plain language. Every figure can be traced back to its source.",
    workflow: [
      { title: "Connect sources", detail: "Spreadsheets, databases, and apps are connected with read access." },
      { title: "Clean and combine", detail: "Data is standardised and checked for gaps and conflicts." },
      { title: "Analyse", detail: "Scheduled reports and plain-language questions run over the prepared data." },
      { title: "Deliver", detail: "Insights arrive as dashboards, summaries, or messages to the right people." },
    ],
    features: [
      "Scheduled summaries and reports",
      "Plain-language questions over your data",
      "Figures that link back to the source records",
      "Alerts when a number moves outside a range you set",
      "Read-only access to source systems by default",
    ],
    benefits: [
      "Less time assembling reports",
      "One shared view of the numbers",
      "Decisions based on current data",
    ],
  },
];

export const getService = (slug: string) => services.find((s) => s.slug === slug);
