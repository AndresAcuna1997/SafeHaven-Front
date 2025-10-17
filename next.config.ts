import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = withSentryConfig(nextConfig, {
  org: "andres-acuna",
  project: "javascript-nextjs",
  // Pass the auth token
  authToken: process.env.SENTRY_AUTH_TOKEN,
  // Upload a larger set of source maps for prettier stack traces (increases build time)
  widenClientFileUpload: true,
  reactComponentAnnotation: {
    enabled: true,
  },
});

export default nextConfig;
