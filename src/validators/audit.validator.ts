import { z } from "zod";

export const auditSchema = z.object({
  url: z.url({
    protocol: /^https?$/,
    hostname: z.regexes.domain,
  }),
});

export type AuditInput = z.infer<typeof auditSchema>;