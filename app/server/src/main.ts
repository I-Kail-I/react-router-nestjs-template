import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { Logger } from "nestjs-pino";
import { AppModule } from "./app.module.js";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  app.setGlobalPrefix("api");

  const configService = app.get(ConfigService);

  app.enableShutdownHooks();

  app.useLogger(app.get(Logger));

  await app.listen(configService.get<number>("PORT", 8000));
}

await bootstrap();
