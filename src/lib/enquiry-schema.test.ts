import { describe, it, expect } from "vitest";
import { enquirySchema } from "./enquiry-schema";

const base = { full_name: "Ravi Kumar", phone: "9424804808", message: "Need a 33KV line quote" };

describe("enquiry rules", () => {
  it("requires name, phone and message", () => {
    expect(enquirySchema.safeParse({}).success).toBe(false);
    expect(enquirySchema.safeParse(base).success).toBe(true);
  });
  it("rejects phone numbers under 10 digits", () => {
    expect(enquirySchema.safeParse({ ...base, phone: "12345" }).success).toBe(false);
    expect(enquirySchema.safeParse({ ...base, phone: "+91 94248-04808" }).success).toBe(true);
  });
  it("rejects invalid email but allows empty", () => {
    expect(enquirySchema.safeParse({ ...base, email: "bad" }).success).toBe(false);
    expect(enquirySchema.safeParse({ ...base, email: "" }).success).toBe(true);
  });
  it("rejects a filled honeypot", () => {
    expect(enquirySchema.safeParse({ ...base, website: "spam" }).success).toBe(false);
  });
});
