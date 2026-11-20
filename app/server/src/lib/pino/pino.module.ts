import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { isProd } from "@shared/utils/env.js";
import { LoggerModule } from "nestjs-pino";

@Module({
  imports: [
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: (configService: ConfigService) => {
        const isProduction = isProd(configService.get<string>("NODE_ENV"));

        return {
          pinoHttp: {
            level: isProduction ? "info" : "debug",

            transport: !isProduction
              ? {
                  target: "pino-pretty",
                  options: {
                    colorize: true,
                    singleLine: true,
                    translateTime: "SYS:standard",
                  },
                }
              : undefined,

            autoLogging: true,
          },
        };
      },
    }),
  ],
})
export class PinoModule {}
