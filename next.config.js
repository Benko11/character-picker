/** @type {import('next').NextConfig} */
const withPWA = require("next-pwa")({ dest: "public", swDest: "public/sw.js" });
const nextConfig = { experimental: { serverActions: true } };

module.exports = withPWA(nextConfig);
