import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://index-us.com",
  output: "static",
  trailingSlash: "always",
  integrations: [sitemap()],
  build: {
    format: "directory",
  },
});
