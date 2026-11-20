import { Module } from "@nestjs/common";
import { AppController } from "./app.controller.js";
import { AppService } from "./app.service.js";
import { AppConfigModule } from "./config/config.module.js";
import { LibModule } from "./lib/lib-module.module.js";

@Module({
  imports: [LibModule, AppConfigModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
