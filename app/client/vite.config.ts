import { reactRouter } from "@react-router/dev/vite";
import tailwindcss from "@tailwindcss/vite";
import { reactRouterDevTools } from "react-router-devtools";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    plugins: [tailwindcss(), reactRouterDevTools(), reactRouter()],
    resolve: {
      tsconfigPaths: true,
    },
    server: {
      port: Number(env.PORT ?? 3000),
    },
  };
});
