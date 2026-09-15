import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export so the app can be hosted as plain files on GitHub Pages
  // (see .github/workflows/deploy-pages.yml).
  output: "export",
  trailingSlash: true,
  // GitHub Pages serves a project site from /<repo-name>/; the workflow
  // supplies the right value via actions/configure-pages.
  basePath: process.env.NEXT_BASE_PATH ?? "",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
