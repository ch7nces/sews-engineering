import { createServerFn } from "@tanstack/react-start";
import { enquirySchema } from "./enquiry-schema";

export const submitEnquiry = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => enquirySchema.parse(data))
  .handler(async ({ data }) => {
    // Honeypot filled → pretend success, store nothing.
    if (data.website) return { ok: true };
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const blank = (v?: string) => (v && v.length ? v : null);
    const { error } = await supabaseAdmin.from("enquiries").insert({
      full_name: data.full_name,
      company_name: blank(data.company_name),
      phone: data.phone,
      email: blank(data.email),
      service: blank(data.service),
      project_location: blank(data.project_location),
      voltage_requirement: blank(data.voltage_requirement),
      message: data.message,
    });
    if (error) {
      console.error("Enquiry insert failed", error);
      throw new Error("We couldn't save your enquiry. Please call or WhatsApp us instead.");
    }
    return { ok: true };
  });
