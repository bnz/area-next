import type { NextConfig } from "next"

const nextConfig: NextConfig = {
	output: 'export', // standalone // 👈 включаем static export
	trailingSlash: true, // 👈 важно для корректных путей
	images: {
		unoptimized: true,
	},
}

export default nextConfig
