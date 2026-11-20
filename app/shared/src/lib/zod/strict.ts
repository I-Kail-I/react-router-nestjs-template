import { z, type ZodRawShape } from "zod";

export function zodStrict<T extends ZodRawShape>(shape: T) {
  return z.strictObject(shape);
}

export { z }