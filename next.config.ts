import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "travelmemories.s3.eu-north-1.amazonaws.com",
                pathname: "/photos/**",
            },
        ],
    },
};

export default nextConfig;
