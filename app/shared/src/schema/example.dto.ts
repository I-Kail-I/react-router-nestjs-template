import { z, zodStrict } from "@/lib/zod/strict.js";

export const exampleSchema = zodStrict({
  id: z.string(),
  name: z.string(),
  password: z.string(),
  email: z.email().lowercase(),
});

export type ExampleType = z.infer<typeof exampleSchema>;
