import { z } from "zod";

const optional = (max: number) =>
  z.string().trim().max(max, `Must be under ${max} characters`).optional().or(z.literal(""));

// Indian mobile/landline friendly: digits with optional +, spaces, dashes; 10–15 digits.
export const phoneSchema = z
  .string()
  .trim()
  .min(1, "Phone number is required")
  .refine((v) => /^\+?[\d\s-]+$/.test(v), "Use digits only (spaces, dashes and + allowed)")
  .refine((v) => {
    const d = v.replace(/\D/g, "");
    return d.length >= 10 && d.length <= 15;
  }, "Enter a valid phone number (at least 10 digits)");

export const enquirySchema = z.object({
  full_name: z.string().trim().min(2, "Please enter your full name").max(100),
  company_name: optional(150),
  phone: phoneSchema,
  email: z.string().trim().max(255).email("Enter a valid email address").optional().or(z.literal("")),
  service: optional(100),
  project_location: optional(200),
  voltage_requirement: optional(200),
  message: z.string().trim().min(5, "Please tell us a little about your project").max(2000),
  website: z.string().max(0).optional().or(z.literal("")), // honeypot
});

export type EnquiryInput = z.infer<typeof enquirySchema>;
