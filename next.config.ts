import type { NextConfig } from "next";

const posthogHost = process.env.NEXT_PUBLIC_POSTHOG_HOST;
const posthogApiHost = posthogHost ? new URL(posthogHost).hostname : null;
const posthogAssetsHost = posthogApiHost?.replace(
  ".i.posthog.com",
  "-assets.i.posthog.com"
);

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    agentFeedback: true,
  },
  cacheComponents: true,
  partialPrefetching: true,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
  async rewrites() {
    if (!posthogApiHost || !posthogAssetsHost) {
      return [];
    }

    return [
      {
        source: "/ingest/static/:path*",
        destination: `https://${posthogAssetsHost}/static/:path*`,
      },
      {
        source: "/ingest/array/:path*",
        destination: `https://${posthogAssetsHost}/array/:path*`,
      },
      {
        source: "/ingest/:path*",
        destination: `https://${posthogApiHost}/:path*`,
      },
    ];
  },
  skipTrailingSlashRedirect: true,
};

export default nextConfig;
