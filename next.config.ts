import type { NextConfig } from "next";

// Product photos, store logos and avatars are served from ASSET_URL: the RUS assets CDN in production,
// or local Supabase storage when developing against a local API.
const assets = new URL(process.env.ASSET_URL || "https://rus-assets.fra1.cdn.digitaloceanspaces.com");
const assetsAreLocal = ["localhost", "127.0.0.1"].includes(assets.hostname);

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "rus-assets.fra1.cdn.digitaloceanspaces.com", pathname: "/images/**" },
      {
        protocol: assets.protocol === "http:" ? "http" : "https",
        hostname: assets.hostname,
        port: assets.port,
        pathname: `${assets.pathname.replace(/\/$/, "")}/images/**`,
      },
    ],
    // Next refuses to optimise images from private addresses unless told to; only ever for local development
    dangerouslyAllowLocalIP: assetsAreLocal,
  },
  // Product photos are sent through server actions when sellers upload them
  experimental: {
    // Up to six 5 MB photos per product, plus the rest of the form
    serverActions: { bodySizeLimit: "32mb" },
  },
};

export default nextConfig;
