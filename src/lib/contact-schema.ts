import { z } from "zod";
import { services } from "@/data/services";

export const industries = [
  "Startup",
  "Digital marketing agency",
  "Real estate",
  "E-commerce",
  "Recruitment",
  "Small or medium enterprise",
  "Other",
] as const;

export const serviceOptions = [
  ...services.map((s) => ({ value: s.slug, label: s.title })),
  { value: "not-sure", label: "Not sure yet" },
] as const;

export const budgets = [
  "Under $1,000",
  "$1,000 to $5,000",
  "$5,000 to $15,000",
  "$15,000 or more",
  "Not sure yet",
] as const;

const serviceValues = serviceOptions.map((s) => s.value) as [string, ...string[]];

export const contactSchema = z.object({
  fullName: z.string().trim().min(2, "Enter your full name.").max(100, "Keep the name under 100 characters."),
  email: z.string().trim().max(254).email("Enter a valid business email, like name@company.com."),
  company: z.string().trim().min(2, "Enter your company name.").max(120, "Keep the company name under 120 characters."),
  industry: z.enum(industries, { message: "Choose an industry." }),
  service: z.enum(serviceValues, { message: "Choose a service." }),
  budget: z.enum(budgets, { message: "Choose a budget range." }),
  description: z
    .string()
    .trim()
    .min(20, "Describe the project in at least 20 characters.")
    .max(3000, "Keep the description under 3,000 characters."),
  /** Honeypot: real visitors never see or fill this. */
  website: z.string().max(0).optional().default(""),
  /** Time the form was rendered (ms since epoch), used to reject instant bot submissions. */
  startedAt: z.number().int().optional(),
  turnstileToken: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type ContactFieldErrors = Partial<Record<keyof ContactInput, string>>;

export const serviceLabel = (value: string) => serviceOptions.find((s) => s.value === value)?.label ?? value;
