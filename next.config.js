/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({
  dest: "public",
  swDest: "public/sw.js",
  runtimeCaching: [
    {
      urlPattern: /\/images\/.*/i,
      handler: "NetworkFirst",
      options: { cacheName: "images", networkTimeoutSeconds: 20 },
    },
  ],
});
const nextConfig = { experimental: { serverActions: true } };

module.exports = withPWA(nextConfig);
