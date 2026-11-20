import { Module } from "@nestjs/common";
import { PinoModule } from "./pino/pino.module.js";
import { ZodPipelineModule } from "./zod-pipeline/zod-pipeline.module.js";

@Module({
  imports: [ZodPipelineModule, PinoModule],
})
export class LibModule {}
