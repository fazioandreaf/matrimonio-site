import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: new URL(
					process.env.R2_PUBLIC_URL ||
						"https://pub-118c09941ed84b2aa0d3315468271eb9.r2.dev"
				).hostname,
				port: "",
				pathname: "/**",
			},
		],
	},
};

export default nextConfig;
