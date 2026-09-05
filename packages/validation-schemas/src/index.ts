import { z } from "zod";

/**
 * Shared validation schemas. Only the system-health contract exists in this
 * foundation prompt; business schemas (student, exam, fee, ...) are added
 * alongside their owning backend module and API version.
 */

export const healthStatusSchema = z.enum(["UP", "DOWN", "DEGRADED"]);

export const systemHealthResponseSchema = z.object({
  status: healthStatusSchema,
  version: z.string(),
  timestampUtc: z.string().datetime(),
});

export type SystemHealthResponse = z.infer<typeof systemHealthResponseSchema>;

/** RFC 7807 Problem Details — every backend error response conforms to this shape. */
export const problemDetailsSchema = z.object({
  type: z.string(),
  title: z.string(),
  status: z.number().int(),
  detail: z.string().optional(),
  instance: z.string().optional(),
  correlationId: z.string().optional(),
});

export type ProblemDetails = z.infer<typeof problemDetailsSchema>;
