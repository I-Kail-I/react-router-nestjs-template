import { builtinModules } from "node:module";
import nodeExternals from "webpack-node-externals";

export default (config) => ({
  ...config,
  externals: [
    nodeExternals({
      allowlist: [
        /^(?!@nestjs(?:\/|$)|reflect-metadata(?:\/|$)|rxjs(?:\/|$)|pino(?:\/|$)|pino-http(?:\/|$)|sonic-boom(?:\/|$)|thread-stream(?:\/|$)|pino-std-serializers(?:\/|$)).+/,
      ],
      importType: "module",
    }),
    ({ request }, callback) => {
      const bareRequest = request?.replace(/^node:/, "");
      if (bareRequest && builtinModules.includes(bareRequest)) {
        callback(null, `module ${request}`);
      } else {
        callback();
      }
    },
  ],
});
