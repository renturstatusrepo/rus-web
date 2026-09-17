import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Product photos, store logos and avatars are served from the RUS assets CDN.
    remotePatterns: [{ protocol: "https", hostname: "rus-assets.fra1.cdn.digitaloceanspaces.com", pathname: "/images/**" }],
  },
};

export default nextConfig;
